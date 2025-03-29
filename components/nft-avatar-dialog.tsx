"use client";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'w3m-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/lib/contexts/auth-context";
import { getUserSessions } from "@/lib/contracts/therapy-actions";
import { Loader2 } from "lucide-react";

interface NFT {
  id: string;
  name: string;
  image: string;
  collection: string;
}

interface NFTAvatarDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (nft: NFT) => void;
}

export function NFTAvatarDialog({ open, onOpenChange, onSelect }: NFTAvatarDialogProps) {
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const loadNFTs = async () => {
      if (!user?.walletAddress) return;

      try {
        setError(null);
        setIsLoading(true);

        const userSessions = await getUserSessions(user.walletAddress);
        console.log("Loaded user sessions:", userSessions);
        
        const mappedNFTs = userSessions.map((session) => ({
          id: session.sessionId,
          name: session.metadata.name,
          image: session.imageUri,
          collection: "Therapy Sessions"
        }));

        console.log("Mapped NFTs:", mappedNFTs);
        setNfts(mappedNFTs);
      } catch (error) {
        console.error("Error loading NFTs:", error);
        setError(error instanceof Error ? error.message : "Failed to load NFTs");
      } finally {
        setIsLoading(false);
      }
    };

    if (open && user?.walletAddress) {
      loadNFTs();
    }
  }, [open, user?.walletAddress]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select NFT Avatar</DialogTitle>
          <DialogDescription>
            Choose an NFT from your therapy sessions to use as your avatar
          </DialogDescription>
        </DialogHeader>

        {!user?.walletAddress ? (
          <div className="h-[300px] flex items-center justify-center">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Please sign in with your wallet to view your NFTs
              </p>
              <Button 
                variant="outline" 
                onClick={() => onOpenChange(false)} 
                className="mt-4"
              >
                Close
              </Button>
            </div>
          </div>
        ) : isLoading ? (
          <div className="h-[300px] flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Loading your NFTs...</p>
            </div>
          </div>
        ) : error ? (
          <div className="h-[300px] flex items-center justify-center">
            <div className="text-center">
              <p className="text-sm text-red-500">{error}</p>
              <Button 
                variant="outline" 
                onClick={() => onOpenChange(false)} 
                className="mt-4"
              >
                Close
              </Button>
            </div>
          </div>
        ) : nfts.length === 0 ? (
          <div className="h-[300px] flex items-center justify-center">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                You don't have any NFTs yet. Complete therapy sessions to earn NFTs that you can use as your avatar.
              </p>
              <Button 
                variant="outline" 
                onClick={() => onOpenChange(false)} 
                className="mt-4"
              >
                Close
              </Button>
            </div>
          </div>
        ) : (
          <>
            <ScrollArea className="h-[300px] pr-4">
              <div className="grid grid-cols-2 gap-4">
                {nfts.map((nft) => (
                  <div
                    key={nft.id}
                    className={`relative group cursor-pointer rounded-lg border-2 transition-colors ${
                      selectedNFT?.id === nft.id
                        ? "border-primary"
                        : "border-transparent hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedNFT(nft)}
                  >
                    <img
                      src={nft.image}
                      alt={nft.name}
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-medium">Select</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (selectedNFT) {
                    onSelect(selectedNFT);
                    onOpenChange(false);
                  }
                }}
                disabled={!selectedNFT}
              >
                Use as Avatar
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
} 