"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Share2, Trophy, Clock, Smile } from "lucide-react";
import Image from "next/image";

interface SessionNFTProps {
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
  onShare?: () => void;
  onDownload?: () => void;
}

export function SessionNFT({
  sessionId,
  imageUri,
  metadata,
  onShare,
  onDownload,
}: SessionNFTProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden bg-gradient-to-br from-white via-white to-primary/5 dark:from-gray-900 dark:via-gray-900 dark:to-primary/20 border-primary/10 group-hover:border-primary/30 transition-all duration-300">
        <div className="relative aspect-square">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-yellow-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <Image
            src={imageUri.replace(
              "ipfs://",
              "https://gateway.pinata.cloud/ipfs/"
            )}
            alt={metadata.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Hover overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80 flex items-center justify-center gap-3 backdrop-blur-sm"
          >
            <Button
              variant="outline"
              size="icon"
              className="bg-white/10 hover:bg-white/20 border-white/20 hover:border-white/40"
              onClick={onShare}
            >
              <Share2 className="w-4 h-4 text-white" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="bg-white/10 hover:bg-white/20 border-white/20 hover:border-white/40"
              onClick={onDownload}
            >
              <Download className="w-4 h-4 text-white" />
            </Button>
          </motion.div>
        </div>

        <div className="p-6">
          <h3 className="font-semibold text-lg mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent group-hover:from-primary/80 group-hover:to-primary transition-all duration-300">
            {metadata.name} ✨
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {metadata.description}
          </p>

          <div className="space-y-2">
            {metadata.attributes.map((attr, idx) => (
              <div key={idx} className="flex items-center gap-2">
                {attr.trait_type === "Duration" && (
                  <Clock className="w-4 h-4 text-blue-500" />
                )}
                {attr.trait_type === "Mood Score" && (
                  <Smile className="w-4 h-4 text-yellow-500" />
                )}
                {attr.trait_type === "Achievements" &&
                  Number(attr.value) > 0 && (
                    <Trophy className="w-4 h-4 text-yellow-500" />
                  )}
                <Badge
                  variant="outline"
                  className="text-xs bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-primary/20"
                >
                  {attr.trait_type}: {attr.value}{" "}
                  {attr.trait_type === "Duration" ? "min" : ""}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
