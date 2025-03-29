"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { getUserSessions } from "@/lib/contracts/therapy-actions";
import { Loader2, Wallet } from "lucide-react";
import { NFTGallery } from "@/app/components/therapy/nft-gallery";

interface NFT {
  sessionId: string;
  imageUri: string;
  metadata: {
    name: string;
    description: string;
    attributes: Array<{
      trait_type: string;
      value: string | number;
    }>;
  };
}

export default function NFTsPage() {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    const loadNFTs = async () => {
      if (!address || !isConnected) return;

      try {
        setError(null);
        setIsLoading(true);
        const userSessions = await getUserSessions(address);
        setNfts(userSessions);
      } catch (error) {
        console.error("Error loading NFTs:", error);
        setError(error instanceof Error ? error.message : "Failed to load NFTs");
      } finally {
        setIsLoading(false);
      }
    };

    if (isConnected) {
      loadNFTs();
    }
  }, [address, isConnected]);

  if (!isConnected) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-gradient-to-b from-background to-background/80">
        <div className="text-center max-w-md mx-auto p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Wallet className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Connect Wallet
          </h1>
          <p className="text-muted-foreground mb-8">
            Connect your wallet to view your therapy session NFTs and track your progress
          </p>
          <w3m-button />
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-gradient-to-b from-background to-background/80">
        <div className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl" />
            <Loader2 className="w-12 h-12 animate-spin text-primary relative" />
          </div>
          <p className="text-lg text-muted-foreground">Loading your NFTs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-gradient-to-b from-background to-background/80">
        <div className="text-center max-w-md mx-auto p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
          <h1 className="text-3xl font-bold text-red-500 mb-4">Error Loading NFTs</h1>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-background/80">
      <div className="max-w-7xl mx-auto">
        <NFTGallery sessions={nfts} />
      </div>
    </div>
  );
}
