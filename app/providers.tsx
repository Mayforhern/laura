"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { AuthProvider } from "@/lib/contexts/auth-context";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthHandler } from "@/components/auth/auth-handler";
import { Web3Provider } from "@/components/providers/web3-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Web3Provider>
      <PrivyProvider
        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}
        config={{
          loginMethods: ["wallet"],
          appearance: {
            theme: "dark",
            accentColor: "#674188",
            showWalletLoginFirst: true,
          },
        }}
      >
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <AuthHandler />
            {children}
          </ThemeProvider>
        </AuthProvider>
      </PrivyProvider>
    </Web3Provider>
  );
}
