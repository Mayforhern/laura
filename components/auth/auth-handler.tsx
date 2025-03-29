"use client";

import { useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { createUser } from "@/lib/db/actions";

export function AuthHandler() {
  const { ready, authenticated, user } = usePrivy();

  useEffect(() => {
    const initUser = async () => {
      if (ready && authenticated && user) {
        try {
          console.log("Privy user:", user);
          console.log("Linked accounts:", user.linkedAccounts);

          // Wait for wallet to be created
          if (!user.wallet?.address) {
            console.log("Waiting for wallet to be created...");
            return;
          }

          // Create user record if they log in
          await createUser({
            id: user.id,
            email: user.email?.address || "",
            name: user.email?.address?.split("@")[0] || "User",
            encryptedData: null,
            walletId: user.wallet.address,
            walletAddress: user.wallet.address,
          });

          console.log("User created successfully with wallet:", user.wallet.address);
        } catch (error: any) {
          // Ignore duplicate key errors (user already exists)
          if (!error.message?.includes("duplicate key")) {
            console.error("Error creating user:", error);
          }
        }
      }
    };

    initUser();
  }, [ready, authenticated, user]);

  return null;
} 