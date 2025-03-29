"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/lib/contexts/auth-context";
import { Brain, Bell, Lock, Globe, Moon, Sun, Mail, Shield, Camera, ImageIcon, Settings as SettingsIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useThemeToggle } from "@/hooks/use-theme";
import { NFTAvatarDialog } from "@/components/nft-avatar-dialog";
import React from "react";
import { useAdmin } from "@/lib/hooks/use-admin";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const { user, isLoading } = useAuth();
  const { toast } = useToast();
  const { isDark, toggleTheme } = useThemeToggle();
  const { isAdmin } = useAdmin();
  const router = useRouter();
  
  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  
  // Update form data when user data changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user]);
  
  // Settings states
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [profileVisibility, setProfileVisibility] = useState<"public" | "private">("public");
  
  // Dialog states
  const [showDataDialog, setShowDataDialog] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showNFTDialog, setShowNFTDialog] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState<{ id: string; name: string; image: string; collection: string } | null>(null);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle avatar upload
  const handleAvatarUpload = async () => {
    try {
      setIsUploading(true);
      // Simulate file upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Avatar updated",
        description: "Your profile picture has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update avatar. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Handle privacy settings
  const toggleProfileVisibility = () => {
    const newVisibility = profileVisibility === "public" ? "private" : "public";
    setProfileVisibility(newVisibility);
    toast({
      title: "Privacy updated",
      description: `Your profile is now ${newVisibility}.`,
    });
  };

  // Handle notifications toggle
  const handleNotificationsChange = (checked: boolean) => {
    setNotifications(checked);
    toast({
      title: "Notifications updated",
      description: `Push notifications have been ${checked ? 'enabled' : 'disabled'}.`,
    });
  };

  // Handle email updates toggle
  const handleEmailUpdatesChange = (checked: boolean) => {
    setEmailUpdates(checked);
    toast({
      title: "Email updates updated",
      description: `Email updates have been ${checked ? 'enabled' : 'disabled'}.`,
    });
  };

  // Handle dark mode toggle
  const handleDarkModeChange = (checked: boolean) => {
    toggleTheme();
    toast({
      title: "Theme updated",
      description: `${checked ? 'Dark' : 'Light'} mode activated.`,
    });
  };

  // Handle save changes
  const handleSaveChanges = async () => {
    try {
      setIsSaving(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would typically call your update user API
      // await updateUser(formData);
      
      toast({
        title: "Changes saved",
        description: "Your settings have been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save changes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Handle NFT selection
  const handleNFTSelect = (nft: { id: string; name: string; image: string; collection: string }) => {
    setSelectedNFT(nft);
    toast({
      title: "Avatar updated",
      description: "Your NFT has been set as your avatar.",
    });
  };

  return (
    <div className="container max-w-3xl pt-24 pb-16 px-8">
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <div className="space-y-0.5 mb-8 pl-1">
            <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">
              Manage your account settings and preferences
            </p>
          </div>

          <div className="space-y-6">
            {/* Profile Settings */}
            <Card className="shadow-sm">
              <CardHeader className="pb-4 px-8">
                <CardTitle className="flex items-center gap-2 text-lg font-medium">
                  <Brain className="w-5 h-5 text-primary" />
                  Profile Settings
                </CardTitle>
                <CardDescription>
                  Update your profile information and avatar
                </CardDescription>
              </CardHeader>
              <Separator />
              <CardContent className="pt-6 px-8">
                <div className="flex flex-col gap-8">
                  <div className="flex items-center gap-6">
                    <div className="relative group">
                      <Avatar className="h-20 w-20 border-2 border-border">
                        <AvatarImage src={selectedNFT?.image || user?.image || ""} />
                        <AvatarFallback className="text-xl">
                          {formData.name?.[0] || formData.email?.[0] || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-2 -right-2 flex gap-1">
                        <Button 
                          size="icon" 
                          variant="secondary" 
                          className="h-8 w-8 rounded-full shadow-md"
                          onClick={handleAvatarUpload}
                          disabled={isUploading}
                        >
                          <Camera className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="secondary" 
                          className="h-8 w-8 rounded-full shadow-md"
                          onClick={() => setShowNFTDialog(true)}
                        >
                          <ImageIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium">{formData.name || "Your Name"}</h3>
                      <p className="text-sm text-muted-foreground">{formData.email || "email@example.com"}</p>
                      {selectedNFT && (
                        <p className="text-xs text-muted-foreground">
                          Using NFT: {selectedNFT.name} from {selectedNFT.collection}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid gap-5">
                    <div className="grid gap-2.5">
                      <Label htmlFor="name" className="font-medium">
                        Full Name
                      </Label>
                      <Input 
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="max-w-md"
                      />
                    </div>
                    <div className="grid gap-2.5">
                      <Label htmlFor="email" className="font-medium">
                        Email Address
                      </Label>
                      <Input 
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="max-w-md"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Admin Section */}
            {isAdmin && (
              <Card className="shadow-sm border-primary/20">
                <CardHeader className="pb-4 px-8">
                  <CardTitle className="flex items-center gap-2 text-lg font-medium text-primary">
                    <Shield className="w-5 h-5" />
                    Admin Access
                  </CardTitle>
                  <CardDescription className="text-primary/80">
                    You have administrator privileges
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 px-8">
                  <div className="flex flex-col items-center justify-center gap-4 py-4">
                    <div className="text-center space-y-2">
                      <Label className="font-medium text-lg">Admin Panel</Label>
                      <p className="text-sm text-muted-foreground">
                        Access the admin dashboard to manage the platform
                      </p>
                    </div>
                    <Button
                      onClick={() => router.push("/admin")}
                      className="gap-2 px-8 py-6 text-lg"
                      size="lg"
                    >
                      <Shield className="w-5 h-5" />
                      Open Admin Panel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Notification Settings */}
            <Card className="shadow-sm">
              <CardHeader className="pb-4 px-8">
                <CardTitle className="flex items-center gap-2 text-lg font-medium">
                  <Bell className="w-5 h-5 text-primary" />
                  Notifications
                </CardTitle>
                <CardDescription>
                  Configure how you receive notifications
                </CardDescription>
              </CardHeader>
              <Separator />
              <CardContent className="pt-6 px-8 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="font-medium">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications about your mental health journey
                    </p>
                  </div>
                  <Switch
                    checked={notifications}
                    onCheckedChange={handleNotificationsChange}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="font-medium">Email Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Get weekly progress reports and updates
                    </p>
                  </div>
                  <Switch
                    checked={emailUpdates}
                    onCheckedChange={handleEmailUpdatesChange}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card className="shadow-sm">
              <CardHeader className="pb-4 px-8">
                <CardTitle className="flex items-center gap-2 text-lg font-medium">
                  <Lock className="w-5 h-5 text-primary" />
                  Privacy
                </CardTitle>
                <CardDescription>
                  Manage your privacy and data settings
                </CardDescription>
              </CardHeader>
              <Separator />
              <CardContent className="pt-6 px-8 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="font-medium">Profile Visibility</Label>
                    <p className="text-sm text-muted-foreground">
                      Control who can see your profile information
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-9"
                    onClick={toggleProfileVisibility}
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    {profileVisibility === "public" ? "Public" : "Private"}
                  </Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="font-medium">Data Collection</Label>
                    <p className="text-sm text-muted-foreground">
                      Manage how we collect and use your data
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-9"
                    onClick={() => setShowDataDialog(true)}
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Manage
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Appearance Settings */}
            <Card className="shadow-sm">
              <CardHeader className="pb-4 px-8">
                <CardTitle className="flex items-center gap-2 text-lg font-medium">
                  {isDark ? (
                    <Moon className="w-5 h-5 text-primary" />
                  ) : (
                    <Sun className="w-5 h-5 text-primary" />
                  )}
                  Appearance
                </CardTitle>
                <CardDescription>
                  Customize your app experience
                </CardDescription>
              </CardHeader>
              <Separator />
              <CardContent className="pt-6 px-8">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="font-medium">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Switch between light and dark themes
                    </p>
                  </div>
                  <Switch
                    checked={isDark}
                    onCheckedChange={handleDarkModeChange}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end pt-4 px-1">
              <Button 
                size="lg" 
                className="px-8"
                onClick={handleSaveChanges}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>

          {/* NFT Avatar Dialog */}
          <NFTAvatarDialog
            open={showNFTDialog}
            onOpenChange={setShowNFTDialog}
            onSelect={handleNFTSelect}
          />

          {/* Data Collection Dialog */}
          <Dialog open={showDataDialog} onOpenChange={setShowDataDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Data Collection Settings</DialogTitle>
                <DialogDescription>
                  Manage how we collect and use your data. Your privacy is important to us.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="font-medium">Usage Analytics</Label>
                    <p className="text-sm text-muted-foreground">
                      Help us improve by sharing usage data
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="font-medium">Personalization</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow us to personalize your experience
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowDataDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  setShowDataDialog(false);
                  toast({
                    title: "Settings saved",
                    description: "Your data collection preferences have been updated.",
                  });
                }}>
                  Save Preferences
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
} 