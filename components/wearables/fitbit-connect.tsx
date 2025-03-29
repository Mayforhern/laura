"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Watch, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface FitbitConnectProps {
  onConnect: () => void;
}

export function FitbitConnect({ onConnect }: FitbitConnectProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      // Fitbit OAuth2 configuration
      const clientId = process.env.NEXT_PUBLIC_FITBIT_CLIENT_ID;
      if (!clientId) {
        throw new Error("Fitbit client ID not configured");
      }

      const redirectUri = `${window.location.origin}/api/fitbit/callback`;
      const scope = "activity heartrate sleep profile";

      // Construct the authorization URL
      const authUrl = `https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&scope=${encodeURIComponent(scope)}`;

      // Redirect to Fitbit authorization page
      window.location.href = authUrl;
    } catch (error) {
      console.error("Failed to connect to Fitbit:", error);
      toast({
        title: "Connection Failed",
        description: "Unable to connect to Fitbit. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <Button
      onClick={handleConnect}
      disabled={isConnecting}
      className="flex items-center gap-2 bg-primary hover:bg-primary/90"
    >
      {isConnecting ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Watch className="w-4 h-4" />
      )}
      {isConnecting ? "Connecting..." : "Connect Fitbit"}
    </Button>
  );
}
