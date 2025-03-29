"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Watch, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { usePrivy } from "@privy-io/react-auth";

interface GoogleFitConnectProps {
  onConnect: () => void;
}

export function GoogleFitConnect({ onConnect }: GoogleFitConnectProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();
  const { getAccessToken } = usePrivy();

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      // Get Privy token
      const privyToken = await getAccessToken();
      if (!privyToken) {
        throw new Error("Not authenticated");
      }

      // Google Fit OAuth2 configuration
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
      
      if (!clientId) {
        throw new Error("Google Client ID is not configured");
      }

      const redirectUri = `${window.location.origin}/api/google-fit/callback`;
      const scope = "https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.heart_rate.read https://www.googleapis.com/auth/fitness.sleep.read";

      // Construct the authorization URL
      const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
      authUrl.searchParams.append("client_id", clientId);
      authUrl.searchParams.append("redirect_uri", redirectUri);
      authUrl.searchParams.append("response_type", "code");
      authUrl.searchParams.append("scope", scope);
      authUrl.searchParams.append("access_type", "offline");
      authUrl.searchParams.append("prompt", "consent");
      
      // Pass the Privy token in the state parameter
      const state = JSON.stringify({ token: privyToken });
      authUrl.searchParams.append("state", state);

      // Log debugging information
      console.log("Starting Google Fit connection with:");
      console.log("- Client ID:", clientId);
      console.log("- Redirect URI:", redirectUri);
      console.log("- State:", state);
      console.log("- Full Auth URL:", authUrl.toString());

      // Show toast to indicate we're starting
      toast({
        title: "Connecting to Google Fit",
        description: "Redirecting to Google authorization...",
      });

      // Redirect to Google authorization page
      window.location.href = authUrl.toString();
    } catch (error) {
      console.error("Failed to connect to Google Fit:", error);
      toast({
        title: "Connection Failed",
        description: error instanceof Error ? error.message : "Unable to connect to Google Fit. Please try again.",
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
      {isConnecting ? "Connecting..." : "Connect Google Fit"}
    </Button>
  );
} 