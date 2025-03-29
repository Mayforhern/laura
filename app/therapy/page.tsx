"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function TherapyPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard after a short delay
    const timer = setTimeout(() => {
      router.push("/dashboard");
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center mt-16">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <div className="text-center">
          <p className="font-medium">Redirecting to dashboard...</p>
          <p className="text-sm text-muted-foreground">
            You can start a new session from there
          </p>
        </div>
      </div>
    </div>
  );
} 