"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/contexts/auth-context";

interface SignInButtonProps {
  className?: string;
}

export function SignInButton({ className }: SignInButtonProps) {
  const { setShowLoginModal } = useAuth();

  return (
    <Button className={className} onClick={() => setShowLoginModal(true)}>
      Sign In
    </Button>
  );
}
