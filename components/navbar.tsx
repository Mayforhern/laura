import { Button } from "@/components/ui/button";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Brain, Sun, LogOut, Shield } from "lucide-react";
import { useAdmin } from "@/lib/hooks/use-admin";

export function Navbar() {
  const { authenticated, logout } = usePrivy();
  const router = useRouter();
  const { isAdmin } = useAdmin();

  const handleSignOut = async () => {
    await logout();
    localStorage.removeItem('userRole'); // Clear the role
    router.push('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Brain className="w-6 h-6" />
            <span className="text-xl font-semibold">Laura3.0</span>
          </Link>

          {/* Main Navigation */}
          <div className="flex items-center space-x-8">
            <Link 
              href="/features" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link 
              href="/about" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              About Laura
            </Link>
            <Link 
              href="/dashboard" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Dashboard
            </Link>
            <Link 
              href="/mental-health" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Mental Health
            </Link>
            <Link 
              href="/community" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Community
            </Link>
            {isAdmin && (
              <Link 
                href="/admin/support-groups" 
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
              >
                <Shield className="w-4 h-4" />
                Admin
              </Link>
            )}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="w-9 h-9 rounded-full">
              <Sun className="w-4 h-4" />
            </Button>
            {authenticated ? (
              <Button 
                variant="ghost" 
                onClick={handleSignOut}
                className="flex items-center gap-2"
              >
                <span>Sign out</span>
                <LogOut className="w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={() => router.push("/sign-in")}>
                Sign in
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 