"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRole } from "@/lib/hooks/use-role";
import { Loader2 } from "lucide-react";

interface RequireRoleProps {
  children: React.ReactNode;
  requiredRole: 'admin' | 'user';
}

export function RequireRole({ children, requiredRole }: RequireRoleProps) {
  const { role, isLoading } = useRole();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && role !== requiredRole) {
      router.push('/dashboard');
    }
  }, [isLoading, role, requiredRole, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Checking access...</p>
        </div>
      </div>
    );
  }

  if (role !== requiredRole) {
    return null;
  }

  return <>{children}</>;
} 