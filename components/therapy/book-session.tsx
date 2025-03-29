"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";

export function BookSession() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  console.log(user);
  const handleBooking = async () => {
    try {
      setIsLoading(true);

      // Process payment using server wallet
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          walletId: user?.walletAddress,
          amount: "0.01", // 0.01 ETH for session
          toAddress: "0x...", // Your therapy service wallet
        }),
      });

      if (!response.ok) throw new Error("Payment failed");

      toast({
        title: "Session Booked!",
        description: "Your therapy session has been confirmed.",
      });
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Book a Session</h3>
      <p className="text-sm text-muted-foreground">
        30-minute therapy session - 0.01 ETH
      </p>
      <Button onClick={handleBooking} disabled={isLoading} className="w-full">
        {isLoading ? "Processing..." : "Book Now - 0.01 ETH"}
      </Button>
    </div>
  );
}
