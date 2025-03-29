import { ethers } from "ethers";
// import TherapyConsent from "../../artifacts/contracts/TherapyConsent.sol/TherapyConsent.json";
import TherapyConsent from "../../artifacts/contracts/TherapyConsent.sol/TherapyConsent.json";
import { PinataSDK } from "pinata-web3";
import { eq } from "drizzle-orm";
import { therapySessions } from "@/lib/db/schema";
import { db } from "@/lib/db/dbConfig";
import { getPublicClient } from '@wagmi/core'
import { therapyABI } from './abis/therapy'
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

const THERAPY_ADDRESS = process.env.NEXT_PUBLIC_THERAPY_CONSENT_ADDRESS;

// Initialize Pinata SDK
const pinata = new PinataSDK({
  pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT!,
  pinataGateway:
    process.env.NEXT_PUBLIC_PINATA_GATEWAY || "gateway.pinata.cloud",
});

// Add this helper function to validate contract address
const validateContractAddress = () => {
  if (!THERAPY_ADDRESS) {
    throw new Error("Contract address not found in environment variables");
  }
  // Ensure the address starts with 0x
  const formattedAddress = THERAPY_ADDRESS.startsWith('0x') 
    ? THERAPY_ADDRESS 
    : `0x${THERAPY_ADDRESS}`;
  return formattedAddress;
};

export interface TherapySession {
  sessionId: string;
  timestamp: number;
  summary: string;
  topics: string[];
  duration: number;
  moodScore: number;
  achievements: string[];
  completed: boolean;
}

export interface SessionMetadata {
  name: string;
  description: string;
  image: string;
  attributes: {
    trait_type: string;
    value: string | number;
  }[];
}

export interface SessionImage {
  file: File;
  preview: string;
}

// Function to upload session image to IPFS
export const uploadSessionImage = async (image: Buffer): Promise<string> => {
  try {
    const file = new File([image], `therapy-session-${Date.now()}.png`, {
      type: "image/png",
    });

    const upload = await pinata.upload.file(file);
    return upload.IpfsHash;
  } catch (error) {
    console.error("Error uploading session image:", error);
    throw error;
  }
};

// Function to upload session metadata to IPFS
export const uploadSessionMetadata = async (metadata: any): Promise<string> => {
  try {
    const metadataBuffer = Buffer.from(JSON.stringify(metadata));
    const file = new File([metadataBuffer], `metadata-${Date.now()}.json`, {
      type: "application/json",
    });

    const upload = await pinata.upload.file(file);
    return upload.IpfsHash;
  } catch (error) {
    console.error("Error uploading session metadata:", error);
    throw error;
  }
};

// Generate session visualization image
export const generateSessionImage = async (
  session: TherapySession
): Promise<File> => {
  // Create a canvas element
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  canvas.width = 800;
  canvas.height = 800;

  // Set background gradient
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "#f8f9fa");
  gradient.addColorStop(1, "#e9ecef");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Add decorative circles
  ctx.beginPath();
  ctx.arc(100, 100, 150, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(147, 51, 234, 0.1)"; // primary color with opacity
  ctx.fill();

  ctx.beginPath();
  ctx.arc(canvas.width - 100, canvas.height - 100, 120, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(249, 168, 212, 0.1)"; // pink with opacity
  ctx.fill();

  // Calculate emoji based on duration
  const durationEmoji =
    session.duration <= 5
      ? "🌱"
      : session.duration <= 15
      ? "🌿"
      : session.duration <= 30
      ? "🌳"
      : "🌺";

  // Add large centered emoji
  ctx.font = "180px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(durationEmoji, canvas.width / 2, canvas.height / 2 - 40);

  // Add session type text
  const sessionType =
    session.duration <= 5
      ? "Quick Check-in"
      : session.duration <= 15
      ? "Growth Session"
      : session.duration <= 30
      ? "Deep Reflection"
      : "Transformative Journey";

  ctx.font = "bold 36px Inter";
  ctx.fillStyle = "#6b21a8"; // primary dark
  ctx.fillText(sessionType, canvas.width / 2, canvas.height / 2 + 100);

  // Add session details
  ctx.font = "24px Inter";
  ctx.fillStyle = "#64748b"; // muted foreground
  ctx.fillText(
    `Duration: ${session.duration} minutes ⏱️`,
    canvas.width / 2,
    canvas.height / 2 + 160
  );
  ctx.fillText(
    `Mood Score: ${session.moodScore}/10 ${
      session.moodScore >= 7 ? "😊" : "😌"
    }`,
    canvas.width / 2,
    canvas.height / 2 + 200
  );

  // Add achievements
  if (session.achievements.length > 0) {
    ctx.font = "20px Inter";
    ctx.fillText("Achievements:", canvas.width / 2, canvas.height / 2 + 260);
    session.achievements.forEach((achievement, index) => {
      ctx.fillText(
        achievement,
        canvas.width / 2,
        canvas.height / 2 + 300 + index * 30
      );
    });
  }

  // Convert canvas to file
  const blob = await new Promise<Blob>((resolve) =>
    canvas.toBlob((blob) => resolve(blob!))
  );
  return new File([blob], `session-${session.sessionId}.png`, {
    type: "image/png",
  });
};

export const createTherapySession = async (
  signer: ethers.Signer,
  topics: string[]
) => {
  try {
    const contract = new ethers.Contract(
      validateContractAddress(),
      TherapyConsent.abi,
      signer
    );

    // Generate a numeric session ID using timestamp and random component
    const timestamp = BigInt(Date.now());
    const random = BigInt(Math.floor(Math.random() * 1000));
    const sessionId = timestamp * BigInt(1000) + random;

    // Create database session first to get UUID
    const dbSession = await db
      .insert(therapySessions)
      .values({
        userId: await signer.getAddress(),
        type: "text",
        status: "in_progress",
        scheduledTime: new Date(),
        title: `New Session - ${new Date().toLocaleString()}`,
      })
      .returning();

    const uuid = dbSession[0].id;

    console.log("Creating session with numeric ID and UUID:", {
      numericId: sessionId.toString(),
      uuid,
    });

    // Create session in smart contract with both IDs
    const tx = await contract.createTherapySession(
      await signer.getAddress(),
      sessionId,
      uuid,
      topics
    );
    await tx.wait();

    return uuid;
  } catch (error) {
    console.error("Error creating therapy session:", error);
    throw new Error(
      `Failed to create therapy session: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
};

export async function completeTherapySession(
  signer: ethers.Signer,
  sessionId: string,
  summary: string,
  duration: number,
  moodScore: number,
  achievements: string[]
) {
  try {
    console.log("Starting session completion with UUID:", sessionId);

    const contract = new ethers.Contract(
      validateContractAddress(),
      TherapyConsent.abi,
      signer
    );

    // Create session in contract if it doesn't exist
    const timestamp = BigInt(Date.now());
    const random = BigInt(Math.floor(Math.random() * 1000));
    const newNumericId = timestamp * BigInt(1000) + random;

    console.log(
      "Creating session in contract with numeric ID:",
      newNumericId.toString()
    );

    let numericId = newNumericId;
    try {
      const createTx = await contract.createTherapySession(
        await signer.getAddress(),
        newNumericId,
        sessionId,
        [] // empty topics
      );
      const createReceipt = await createTx.wait();
      const createEvent = createReceipt.events?.find(
        (e: any) => e.event === "TherapySessionCreated"
      );
      if (createEvent) {
        numericId = createEvent.args.sessionId;
        console.log(
          "Session created in contract with ID:",
          numericId.toString()
        );
      }
    } catch (error) {
      console.log(
        "Session might already exist in contract, continuing...",
        error
      );
    }

    // First update the session in the database
    await db
      .update(therapySessions)
      .set({
        status: "completed",
        summary,
        updatedAt: new Date(),
      })
      .where(eq(therapySessions.id, sessionId))
      .returning();

    console.log("Database updated, completing session in contract...");

    // Complete the session in the smart contract
    const tx = await contract.completeTherapySession(
      sessionId,
      summary,
      duration,
      moodScore,
      achievements
    );

    console.log("Waiting for transaction confirmation...");
    const receipt = await tx.wait();

    console.log("Transaction confirmed, events:", receipt.events);

    // Try to find the completion event
    const event = receipt.events?.find(
      (e: any) => e.event === "TherapySessionCompleted"
    );

    // If no event, use the numeric ID we got from creation
    const sessionNumericId = event?.args.sessionId || numericId;
    console.log("Using session numeric ID:", sessionNumericId.toString());

    console.log("Session completed, generating NFT...");

    // Generate and upload session image
    const image = await generateSessionImage({
      sessionId: sessionNumericId.toString(),
      timestamp: Date.now(),
      summary,
      topics: [],
      duration,
      moodScore,
      achievements,
      completed: true,
    });

    const imageBuffer = Buffer.from(await image.arrayBuffer());
    const imageUri = await uploadSessionImage(imageBuffer);

    console.log("Image uploaded to IPFS:", imageUri);

    // Create and upload metadata
    const metadata = {
      name: `Therapy Session #${sessionNumericId.toString()}`,
      description: summary,
      image: `ipfs://${imageUri}`,
      attributes: [
        {
          trait_type: "Duration",
          value: duration,
        },
        {
          trait_type: "Mood Score",
          value: moodScore,
        },
        {
          trait_type: "Achievements",
          value: achievements.length,
        },
      ],
    };

    const metadataUri = await uploadSessionMetadata(metadata);
    console.log("Metadata uploaded to IPFS:", metadataUri);

    // Mint the NFT
    console.log("Minting NFT...");
    const mintTx = await contract.mintSessionNFT(
      await signer.getAddress(),
      metadataUri,
      {
        sessionId: sessionNumericId,
        timestamp: Math.floor(Date.now() / 1000),
        summary,
        topics: [],
        duration,
        moodScore,
        achievements,
        completed: true,
      }
    );

    const mintReceipt = await mintTx.wait();
    console.log("NFT minted successfully");

    // Get the NFT minting event
    const mintEvent = mintReceipt.events?.find(
      (e: any) => e.event === "SessionNFTMinted"
    );

    return {
      sessionId: sessionNumericId.toString(),
      uuid: sessionId,
      imageUri: `ipfs://${imageUri}`,
      metadataUri: `ipfs://${metadataUri}`,
      tokenId: mintEvent?.args.tokenId?.toString(),
    };
  } catch (error) {
    console.error("Error completing therapy session:", error);
    throw new Error(
      `Failed to complete therapy session: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

// Add helper function to get numeric ID from UUID
export async function getNumericIdFromUUID(
  provider: ethers.Provider,
  uuid: string
): Promise<string> {
  const contract = new ethers.Contract(
    validateContractAddress(),
    TherapyConsent.abi,
    provider
  );
  const numericId = await contract.getNumericId(uuid);
  return numericId.toString();
}

// Add helper function to get UUID from numeric ID
export async function getUUIDFromNumericId(
  provider: ethers.Provider,
  numericId: string
): Promise<string> {
  const contract = new ethers.Contract(
    validateContractAddress(),
    TherapyConsent.abi,
    provider
  );
  return await contract.getUuid(numericId);
}

// Create a public client instance
const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
})

const ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "tokenOfOwnerByIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

export async function getUserSessions(address: string) {
  try {
    if (!window.ethereum) {
      throw new Error("Web3 provider not found");
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(
      "0x98EE7891eC3fe81453d78F37457d81D91A0248bD",
      ABI,
      provider
    );

    const sessionCount = await contract.balanceOf(address);
    const sessions = [];

    for (let i = 0; i < Number(sessionCount); i++) {
      const tokenId = await contract.tokenOfOwnerByIndex(address, i);
      const tokenUri = await contract.tokenURI(tokenId);
      const response = await fetch(tokenUri.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/'));
      const metadata = await response.json();
      
      sessions.push({
        sessionId: tokenId.toString(),
        imageUri: metadata.image,
        metadata: {
          name: metadata.name,
          description: metadata.description,
          attributes: metadata.attributes,
        },
      });
    }

    return sessions;
  } catch (error) {
    console.error('Error getting user sessions:', error);
    throw error;
  }
}

// Function to get session image
export const getSessionImage = async (imageUri: string): Promise<string> => {
  try {
    const response = await fetch(
      `https://gateway.pinata.cloud/ipfs/${imageUri.replace("ipfs://", "")}`
    );
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Error fetching session image:", error);
    throw error;
  }
};
