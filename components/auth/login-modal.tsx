"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Brain, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/contexts/auth-context";

export function LoginModal() {
  const {
    showLoginModal,
    showUserForm,
    isLoading,
    login,
    updateUser,
    setShowLoginModal,
  } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!showLoginModal) {
      setName("");
      setEmail("");
    }
  }, [showLoginModal]);

  const handleSubmit = async () => {
    if (showUserForm) {
      if (!name.trim() || !email.trim()) return;
      await updateUser({ name, email });
    } else {
      await login();
    }
  };

  return (
    <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="mx-auto mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center">
              <Brain className="w-6 h-6" />
            </div>
          </div>
          <DialogTitle className="text-center">
            {showUserForm ? "Complete Your Profile" : "Welcome to AI Therapist"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {showUserForm
              ? "Please provide your details to continue"
              : "Sign in to start your wellness journey"}
          </DialogDescription>
        </DialogHeader>

        {showUserForm && (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        )}

        <Button
          className="w-full"
          size="lg"
          onClick={handleSubmit}
          disabled={
            isLoading || (showUserForm && (!name.trim() || !email.trim()))
          }
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {showUserForm ? "Saving..." : "Connecting..."}
            </>
          ) : showUserForm ? (
            "Complete Sign Up"
          ) : (
            "Get Started"
          )}
        </Button>

        <p className="text-xs text-center text-muted-foreground mt-4">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </DialogContent>
    </Dialog>
  );
}
