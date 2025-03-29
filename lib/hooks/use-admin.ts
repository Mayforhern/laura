import { useAuth } from "@/lib/contexts/auth-context";

// Admin configuration
const ADMIN_CONFIG = {
  emails: ['mayankdindoire@gmail.com'],
  walletAddresses: [
    "0x98EE7891eC3fe81453d78F37457d81D91A0248bD"
  ].map(address => address.toLowerCase())
};

export function useAdmin() {
  const { user } = useAuth();
  
  const isAdmin = Boolean(
    user && 
    (
      // Check if email is in admin list
      (user.email && ADMIN_CONFIG.emails.includes(user.email)) ||
      // Check if wallet is in admin list
      (user.walletAddress && ADMIN_CONFIG.walletAddresses.includes(user.walletAddress.toLowerCase()))
    )
  );

  return {
    isAdmin,
    adminConfig: ADMIN_CONFIG
  };
} 