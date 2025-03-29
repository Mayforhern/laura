"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";

export function RoleSelector() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = usePrivy();

  const handleLogin = async (role: 'admin' | 'user') => {
    setIsLoading(true);
    try {
      // Store the selected role in localStorage before login
      localStorage.setItem('userRole', role);
      await login();
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-primary/5 p-4">
      <h1 className="text-4xl font-bold mb-8">Welcome to Aura Therapy</h1>
      <p className="text-muted-foreground mb-8 text-center max-w-md">
        Choose how you want to sign in. Your wallet will be connected after selection.
      </p>
      
      <div className="grid md:grid-cols-2 gap-4 w-full max-w-2xl">
        <Card className="group cursor-pointer hover:border-primary/50 transition-colors" 
          onClick={() => handleLogin('admin')}>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Admin Login</h2>
                <p className="text-sm text-muted-foreground">
                  Access administrative features and manage the platform
                </p>
              </div>
              <Button 
                className="w-full" 
                disabled={isLoading}
                variant="outline"
              >
                Continue as Admin
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="group cursor-pointer hover:border-primary/50 transition-colors"
          onClick={() => handleLogin('user')}>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">User Login</h2>
                <p className="text-sm text-muted-foreground">
                  Access therapy sessions and personal features
                </p>
              </div>
              <Button 
                className="w-full" 
                disabled={isLoading}
                variant="outline"
              >
                Continue as User
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 