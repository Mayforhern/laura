"use client";

import { useState } from "react";
import { SessionNFT } from "./session-nft";
import { Button } from "@/components/ui/button";
import { Grid3X3, List, AlertCircle, Trophy, Sparkles, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/auth-context";
import { createTherapySession } from "@/lib/db/actions";

interface NFTGalleryProps {
  sessions: Array<{
    sessionId: string;
    imageUri: string;
    metadata: {
      name: string;
      description: string;
      attributes: {
        trait_type: string;
        value: string | number;
      }[];
    };
  }>;
}

export function NFTGallery({ sessions }: NFTGalleryProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  const handleShare = async (sessionId: string) => {
    try {
      await navigator.share({
        title: "My Therapy Session NFT ✨",
        text: "Check out my therapy session achievement! 🌟",
        url: `${window.location.origin}/therapy/nft/${sessionId}`,
      });
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        setError("Failed to share NFT. Please try again.");
      }
    }
  };

  const handleDownload = async (imageUri: string) => {
    try {
      setError(null);
      const response = await fetch(
        imageUri.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/")
      );

      if (!response.ok) {
        throw new Error("Failed to download image");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "therapy-session-nft.png";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading:", error);
      setError("Failed to download NFT. Please try again.");
    }
  };

  const handleStartSession = async () => {
    if (!user?.id) {
      setError("Please sign in to start a session");
      return;
    }

    try {
      setIsLoading(true);
      const session = await createTherapySession({
        userId: user.id,
        type: "text",
      });

      router.push(`/therapy/${session[0].id}`);
    } catch (error) {
      console.error("Failed to start session:", error);
      setError("Failed to start session. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/5 to-primary/20 blur-3xl -z-10" />
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-8 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-6 h-6 text-primary animate-pulse" />
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Your Journey NFTs
              </h2>
            </div>
            <p className="text-muted-foreground">
              Each NFT represents a milestone in your therapy journey
            </p>
          </div>
          <div className="flex gap-2 p-1 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="relative overflow-hidden"
            >
              <Grid3X3 className="w-4 h-4" />
              {viewMode === "grid" && (
                <motion.div
                  layoutId="viewMode"
                  className="absolute inset-0 bg-primary opacity-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="relative overflow-hidden"
            >
              <List className="w-4 h-4" />
              {viewMode === "list" && (
                <motion.div
                  layoutId="viewMode"
                  className="absolute inset-0 bg-primary opacity-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Button>
          </div>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          layout
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-6"
          }
        >
          {sessions.map((session, index) => (
            <motion.div
              key={session.sessionId}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <SessionNFT
                sessionId={session.sessionId}
                imageUri={session.imageUri}
                metadata={session.metadata}
                onShare={() => handleShare(session.sessionId)}
                onDownload={() => handleDownload(session.imageUri)}
              />
            </motion.div>
          ))}

          {sessions.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full"
            >
              <div className="flex flex-col items-center justify-center p-12 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Trophy className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  No NFTs Yet
                </h3>
                <p className="text-muted-foreground text-center max-w-md mb-8">
                  Complete therapy sessions to earn special NFTs that mark your progress and achievements
                </p>
                <Button
                  size="lg"
                  className="bg-primary/20 hover:bg-primary/30 text-primary"
                  onClick={handleStartSession}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Starting Session...
                    </>
                  ) : (
                    "Start Session"
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
