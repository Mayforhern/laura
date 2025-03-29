"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { usePrivy } from "@privy-io/react-auth";

interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: {
    id?: string;
    name?: string;
    email?: string;
    walletAddress?: string;
  } | null;
  showLoginModal: boolean;
  showUserForm: boolean;
}

interface AuthContextType extends AuthState {
  login: () => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (data: Partial<AuthState["user"]>) => Promise<void>;
  setShowLoginModal: (show: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const {
    login: privyLogin,
    logout: privyLogout,
    authenticated,
    user: privyUser,
  } = usePrivy();

  const [state, setState] = useState<AuthState>({
    isLoading: false,
    isAuthenticated: false,
    user: null,
    showLoginModal: false,
    showUserForm: false,
  });

  // Update the authentication effect
  useEffect(() => {
    let isSubscribed = true; // Add cleanup flag

    const handleAuthChange = async () => {
      // Skip if already loading or no change in auth state
      if (!isSubscribed || !privyUser?.wallet?.address) return;

      const walletAddress = privyUser.wallet.address;

      // Only proceed if authenticated and wallet address changed
      if (authenticated && walletAddress !== state.user?.walletAddress) {
        setState((s) => ({ ...s, isLoading: true }));
        try {
          const response = await fetch(`/api/users?walletId=${walletAddress}`);

          if (!isSubscribed) return; // Check if still subscribed before updating state

          if (response.ok) {
            const { user } = await response.json();
            setState((s) => ({
              ...s,
              isAuthenticated: true,
              user: {
                ...user,
                walletAddress,
              },
              showUserForm: false,
              showLoginModal: false,
              isLoading: false,
            }));
          } else if (response.status === 404) {
            setState((s) => ({
              ...s,
              isAuthenticated: false,
              user: { walletAddress },
              showUserForm: true,
              showLoginModal: true,
              isLoading: false,
            }));
          }
        } catch (error) {
          if (!isSubscribed) return;
          console.error("Error checking user:", error);
          setState((s) => ({ ...s, isLoading: false }));
        }
      } else if (!authenticated) {
        setState((s) => ({
          ...s,
          isAuthenticated: false,
          user: null,
          isLoading: false,
        }));
      }
    };

    handleAuthChange();

    // Cleanup function
    return () => {
      isSubscribed = false;
    };
  }, [authenticated, privyUser?.wallet?.address]); // Only depend on these values

  const login = async () => {
    setState((s) => ({ ...s, showLoginModal: true }));
    try {
      await privyLogin();
    } catch (error) {
      console.error("Login error:", error);
      setState((s) => ({ ...s, showLoginModal: false }));
    }
  };

  const logout = async () => {
    setState((s) => ({ ...s, isLoading: true }));
    try {
      await privyLogout();
      setState((s) => ({
        ...s,
        isAuthenticated: false,
        user: null,
        showLoginModal: false,
        showUserForm: false,
      }));
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setState((s) => ({ ...s, isLoading: false }));
    }
  };

  const updateUser = async (userData: Partial<AuthState["user"]>) => {
    if (!state.user?.walletAddress) return;

    setState((s) => ({ ...s, isLoading: true }));
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...userData,
          walletId: state.user.walletAddress,
        }),
      });

      if (!response.ok) throw new Error("Failed to update user");

      const { user } = await response.json();
      setState((s) => ({
        ...s,
        isAuthenticated: true,
        user: {
          ...user,
          walletAddress: state.user?.walletAddress,
        },
        showUserForm: false,
        showLoginModal: false,
      }));
    } catch (error) {
      console.error("Update user error:", error);
    } finally {
      setState((s) => ({ ...s, isLoading: false }));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        updateUser,
        setShowLoginModal: (show) =>
          setState((s) => ({ ...s, showLoginModal: show })),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
