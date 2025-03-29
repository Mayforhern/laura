// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

interface IERC721 {
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);

    function balanceOf(address owner) external view returns (uint256 balance);
    function ownerOf(uint256 tokenId) external view returns (address owner);
    function safeTransferFrom(address from, address to, uint256 tokenId, bytes calldata data) external;
    function safeTransferFrom(address from, address to, uint256 tokenId) external;
    function transferFrom(address from, address to, uint256 tokenId) external;
    function approve(address to, uint256 tokenId) external;
    function setApprovalForAll(address operator, bool approved) external;
    function getApproved(uint256 tokenId) external view returns (address operator);
    function isApprovedForAll(address owner, address operator) external view returns (bool);
}

interface IERC721Receiver {
    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external returns (bytes4);
}

contract TherapyConsent is IERC721 {
    string public name = "TherapySessionNFT";
    string public symbol = "THERAPY";
    
    address public owner;
    uint256 private _tokenIdCounter;
    
    // NFT state variables
    mapping(uint256 => address) private _owners;
    mapping(address => uint256) private _balances;
    mapping(uint256 => address) private _tokenApprovals;
    mapping(address => mapping(address => bool)) private _operatorApprovals;
    mapping(uint256 => string) private _tokenURIs;
    mapping(address => uint256[]) private _ownedTokens;
    
    // Therapy specific structs
    struct Consent {
        bool aiInterventions;
        bool emergencyContact;
        bool dataSharing;
        uint256 lastUpdated;
    }
    
    struct AuditLog {
        string interventionType;
        uint256 timestamp;
        string outcome;
    }

    struct TherapySession {
        uint256 sessionId;
        uint256 timestamp;
        string summary;
        string[] topics;
        uint256 duration;
        uint8 moodScore;
        string[] achievements;
        bool completed;
    }
    
    // Mappings for therapy data
    mapping(address => Consent) public userConsent;
    mapping(address => AuditLog[]) public userAuditLogs;
    mapping(uint256 => TherapySession) public sessions;
    mapping(address => uint256[]) public userSessions;
    mapping(string => uint256) public uuidToNumericId;
    mapping(uint256 => string) public numericToUuid;
    
    // Events
    event ConsentUpdated(address indexed user, string consentType, bool value);
    event InterventionLogged(address indexed user, string interventionType, string outcome);
    event SessionNFTMinted(address indexed user, uint256 indexed tokenId, uint256 sessionId, string uuid);
    event TherapySessionCreated(uint256 indexed sessionId, string uuid, address indexed user);
    event TherapySessionCompleted(uint256 indexed sessionId, string uuid, address indexed user);
    
    constructor() {
        owner = msg.sender;
    }
    
    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
    
    modifier onlyAuthorized(address user) {
        require(msg.sender == user, "Unauthorized");
        _;
    }

    // ERC721 Implementation
    function balanceOf(address owner) public view override returns (uint256) {
        require(owner != address(0), "Zero address");
        return _balances[owner];
    }

    function ownerOf(uint256 tokenId) public view override returns (address) {
        address owner = _owners[tokenId];
        require(owner != address(0), "Token doesn't exist");
        return owner;
    }

    function approve(address to, uint256 tokenId) public override {
        address owner = ownerOf(tokenId);
        require(msg.sender == owner || isApprovedForAll(owner, msg.sender), "Not authorized");
        _tokenApprovals[tokenId] = to;
        emit Approval(owner, to, tokenId);
    }

    function getApproved(uint256 tokenId) public view override returns (address) {
        require(_exists(tokenId), "Token doesn't exist");
        return _tokenApprovals[tokenId];
    }

    function setApprovalForAll(address operator, bool approved) public override {
        require(operator != msg.sender, "Self approval");
        _operatorApprovals[msg.sender][operator] = approved;
        emit ApprovalForAll(msg.sender, operator, approved);
    }

    function isApprovedForAll(address owner, address operator) public view override returns (bool) {
        return _operatorApprovals[owner][operator];
    }

    function transferFrom(address from, address to, uint256 tokenId) public override {
        require(_isApprovedOrOwner(msg.sender, tokenId), "Not approved");
        _transfer(from, to, tokenId);
    }

    function safeTransferFrom(address from, address to, uint256 tokenId) public override {
        safeTransferFrom(from, to, tokenId, "");
    }

    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory data) public override {
        require(_isApprovedOrOwner(msg.sender, tokenId), "Not approved");
        _safeTransfer(from, to, tokenId, data);
    }

    function _safeTransfer(address from, address to, uint256 tokenId, bytes memory data) internal {
        _transfer(from, to, tokenId);
        require(_checkOnERC721Received(from, to, tokenId, data), "Transfer rejected");
    }

    function _exists(uint256 tokenId) internal view returns (bool) {
        return _owners[tokenId] != address(0);
    }

    function _isApprovedOrOwner(address spender, uint256 tokenId) internal view returns (bool) {
        address owner = ownerOf(tokenId);
        return (spender == owner || getApproved(tokenId) == spender || isApprovedForAll(owner, spender));
    }

    function _transfer(address from, address to, uint256 tokenId) internal {
        require(ownerOf(tokenId) == from, "Not owner");
        require(to != address(0), "Zero address");

        _beforeTokenTransfer(from, to, tokenId);

        _balances[from] -= 1;
        _balances[to] += 1;
        _owners[tokenId] = to;

        emit Transfer(from, to, tokenId);
    }

    function _mint(address to, uint256 tokenId) internal {
        require(to != address(0), "Zero address");
        require(!_exists(tokenId), "Token exists");

        _beforeTokenTransfer(address(0), to, tokenId);

        _balances[to] += 1;
        _owners[tokenId] = to;
        _ownedTokens[to].push(tokenId);

        emit Transfer(address(0), to, tokenId);
    }

    function _safeMint(address to, uint256 tokenId) internal {
        _safeMint(to, tokenId, "");
    }

    function _safeMint(address to, uint256 tokenId, bytes memory data) internal {
        _mint(to, tokenId);
        require(_checkOnERC721Received(address(0), to, tokenId, data), "Transfer rejected");
    }

    function _checkOnERC721Received(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) private returns (bool) {
        if (to.code.length > 0) {
            try IERC721Receiver(to).onERC721Received(msg.sender, from, tokenId, data) returns (bytes4 retval) {
                return retval == IERC721Receiver.onERC721Received.selector;
            } catch (bytes memory reason) {
                if (reason.length == 0) {
                    revert("Transfer to non ERC721Receiver");
                } else {
                    assembly {
                        revert(add(32, reason), mload(reason))
                    }
                }
            }
        } else {
            return true;
        }
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal virtual {}

    // Token URI functions
    function tokenURI(uint256 tokenId) public view returns (string memory) {
        require(_exists(tokenId), "Token doesn't exist");
        return _tokenURIs[tokenId];
    }

    function _setTokenURI(uint256 tokenId, string memory uri) internal {
        require(_exists(tokenId), "Token doesn't exist");
        _tokenURIs[tokenId] = uri;
    }

    // Enumeration functions
    function tokensOfOwner(address owner) public view returns (uint256[] memory) {
        return _ownedTokens[owner];
    }

    // Therapy Session Management
    function createTherapySession(
        address user,
        uint256 sessionId,
        string memory uuid,
        string[] memory initialTopics
    ) external {
        require(msg.sender == user || msg.sender == owner, "Unauthorized");
        require(uuidToNumericId[uuid] == 0, "UUID already exists");
        require(sessions[sessionId].timestamp == 0, "Session ID already exists");
        
        TherapySession memory newSession = TherapySession({
            sessionId: sessionId,
            timestamp: block.timestamp,
            summary: "",
            topics: initialTopics,
            duration: 0,
            moodScore: 0,
            achievements: new string[](0),
            completed: false
        });
        
        sessions[sessionId] = newSession;
        uuidToNumericId[uuid] = sessionId;
        numericToUuid[sessionId] = uuid;
        userSessions[user].push(sessionId);
        
        emit TherapySessionCreated(sessionId, uuid, user);
    }

    function completeTherapySession(
        string memory uuid,
        string memory summary,
        uint256 duration,
        uint8 moodScore,
        string[] memory achievements
    ) external {
        uint256 sessionId = uuidToNumericId[uuid];
        require(sessionId != 0, "Session not found");
        
        TherapySession storage session = sessions[sessionId];
        require(!session.completed, "Session already completed");
        
        session.summary = summary;
        session.duration = duration;
        session.moodScore = moodScore;
        session.achievements = achievements;
        session.completed = true;
        
        emit TherapySessionCompleted(sessionId, uuid, msg.sender);
    }

    // NFT Minting
    function mintSessionNFT(
        address user,
        string memory tokenURI,
        TherapySession memory sessionData
    ) external returns (uint256) {
        require(msg.sender == user || msg.sender == owner, "Unauthorized");
        require(sessionData.completed, "Session not completed");

        _tokenIdCounter++;
        uint256 newTokenId = _tokenIdCounter;

        _safeMint(user, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        
        sessions[newTokenId] = sessionData;
        userSessions[user].push(newTokenId);

        emit SessionNFTMinted(user, newTokenId, sessionData.sessionId, numericToUuid[sessionData.sessionId]);
        
        return newTokenId;
    }

    // View functions
    function getUserSessions(address user) external view returns (uint256[] memory) {
        return tokensOfOwner(user);
    }

    function getSessionDetails(uint256 sessionId) external view returns (TherapySession memory) {
        return sessions[sessionId];
    }
    
    // Consent Management
    function updateConsent(
        bool _aiInterventions,
        bool _emergencyContact,
        bool _dataSharing
    ) external {
        userConsent[msg.sender] = Consent({
            aiInterventions: _aiInterventions,
            emergencyContact: _emergencyContact,
            dataSharing: _dataSharing,
            lastUpdated: block.timestamp
        });
        
        emit ConsentUpdated(msg.sender, "ai_interventions", _aiInterventions);
        emit ConsentUpdated(msg.sender, "emergency_contact", _emergencyContact);
        emit ConsentUpdated(msg.sender, "data_sharing", _dataSharing);
    }
    
    // Audit Logging
    function logIntervention(
        address user,
        string memory interventionType,
        string memory outcome
    ) external onlyAuthorized(user) {
        require(userConsent[user].aiInterventions, "AI interventions not authorized");
        
        userAuditLogs[user].push(AuditLog({
            interventionType: interventionType,
            timestamp: block.timestamp,
            outcome: outcome
        }));
        
        emit InterventionLogged(user, interventionType, outcome);
    }
    
    function getConsent(address user) external view returns (Consent memory) {
        return userConsent[user];
    }
    
    function getAuditLogs(address user) external view returns (AuditLog[] memory) {
        return userAuditLogs[user];
    }

    // Helper functions
    function getNumericId(string memory uuid) public view returns (uint256) {
        return uuidToNumericId[uuid];
    }

    function getUuid(uint256 numericId) public view returns (string memory) {
        return numericToUuid[numericId];
    }
}
