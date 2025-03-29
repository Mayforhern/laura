"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LitService } from "@/lib/services/lit.service";
import { Coins, TrendingUp, ArrowRightLeft } from "lucide-react";
import { useAuth } from "@/lib/context/auth-context";

export function TherapyCreditManager() {
  const [credits, setCredits] = useState<number>(0);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const litService = LitService.getInstance();
  const { user } = useAuth();

  const optimizeCredits = async () => {
    if (!user?.wallet) return;

    try {
      setIsOptimizing(true);
      await litService.manageTherapyCredits(user.wallet);
      // Update credits display
    } catch (error) {
      console.error("Optimization error:", error);
    } finally {
      setIsOptimizing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Coins className="w-5 h-5" />
          Therapy Credits
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Available Credits</span>
            <span className="font-bold">{credits} USDC</span>
          </div>
          <Button
            onClick={optimizeCredits}
            disabled={isOptimizing}
            className="w-full"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Optimize Yield
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
