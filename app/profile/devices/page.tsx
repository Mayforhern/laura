"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Smartphone, 
  Watch, 
  Activity, 
  Heart, 
  Brain, 
  Wifi, 
  Unlink,
  Plus,
  AlertCircle,
  Loader2
} from "lucide-react";
import { useAuth } from "@/lib/contexts/auth-context";
import { getConnectedDevices } from "@/lib/db/actions";
import { GoogleFitConnect } from "@/components/wearables/google-fit-connect";
import { FitbitConnect } from "@/components/wearables/fitbit-connect";

interface Device {
  id: string;
  deviceType: string;
  deviceId: string;
  lastSynced: Date | null;
  status: "connected" | "disconnected";
  metrics: any;
  settings?: unknown;
}

export default function DevicesPage() {
  const [showDisconnectWarning, setShowDisconnectWarning] = useState(false);
  const [deviceToDisconnect, setDeviceToDisconnect] = useState<string | null>(null);
  const [devices, setDevices] = useState<Device[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const loadDevices = async () => {
      if (!user?.id) return;
      try {
        setIsLoading(true);
        const connectedDevices = await getConnectedDevices(user.id);
        setDevices(connectedDevices.map(device => ({
          ...device,
          status: device.status as "connected" | "disconnected"
        })));
      } catch (error) {
        console.error("Error loading devices:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDevices();
  }, [user?.id]);

  const handleDisconnect = (deviceId: string) => {
    setDeviceToDisconnect(deviceId);
    setShowDisconnectWarning(true);
  };

  const confirmDisconnect = async () => {
    if (!deviceToDisconnect) return;
    
    try {
      // TODO: Implement device disconnection logic
      // await disconnectDevice(deviceToDisconnect);
      setDevices(devices.filter(d => d.id !== deviceToDisconnect));
    } catch (error) {
      console.error("Error disconnecting device:", error);
    } finally {
      setShowDisconnectWarning(false);
      setDeviceToDisconnect(null);
    }
  };

  const getDeviceIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'fitbit':
        return Watch;
      case 'google_fit':
        return Activity;
      case 'apple_health':
        return Heart;
      default:
        return Smartphone;
    }
  };

  const getDeviceName = (type: string) => {
    switch (type.toLowerCase()) {
      case 'fitbit':
        return 'Fitbit';
      case 'google_fit':
        return 'Google Fit';
      case 'apple_health':
        return 'Apple Health';
      default:
        return type;
    }
  };

  const getMetricLabels = (type: string) => {
    switch (type.toLowerCase()) {
      case 'fitbit':
        return ['Heart Rate', 'Sleep', 'Activity'];
      case 'google_fit':
        return ['Steps', 'Calories', 'Distance'];
      case 'apple_health':
        return ['Heart Rate', 'Sleep', 'Activity'];
      default:
        return [];
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen pt-20 px-6">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading your devices...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-10 space-y-8 pt-20 px-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Connected Devices</h1>
        <p className="text-muted-foreground">
          Manage your connected health and wellness devices
        </p>
      </div>

      {/* Add New Device */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-2">
            <GoogleFitConnect onConnect={() => {}} />
            <FitbitConnect onConnect={() => {}} />
          </div>
        </CardContent>
      </Card>

      {/* Connected Devices */}
      <div className="space-y-4">
        {devices.map((device) => {
          const DeviceIcon = getDeviceIcon(device.deviceType);
          const deviceName = getDeviceName(device.deviceType);
          const metricLabels = getMetricLabels(device.deviceType);
          
          return (
            <Card key={device.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <DeviceIcon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium">{deviceName}</h3>
                      <p className="text-sm text-muted-foreground">Device ID: {device.deviceId}</p>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          device.status === "connected" ? "bg-green-500" : "bg-gray-500"
                        }`} />
                        <span className="text-sm text-muted-foreground">
                          {device.status === "connected" ? "Connected" : "Disconnected"}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Last synced: {device.lastSynced 
                          ? new Date(device.lastSynced).toLocaleString() 
                          : 'Never'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2">
                      {metricLabels.map((metric) => (
                        <span
                          key={metric}
                          className="text-xs px-2 py-1 bg-primary/10 rounded-full"
                        >
                          {metric}
                        </span>
                      ))}
                    </div>
                    {device.status === "connected" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => handleDisconnect(device.id)}
                      >
                        <Unlink className="w-4 h-4 mr-2" />
                        Disconnect
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {devices.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No devices connected yet. Connect a device to start tracking your health metrics.
          </div>
        )}
      </div>

      {/* Data Collection Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Data Collection
          </CardTitle>
          <CardDescription>
            Manage how your device data is collected and used
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Automatic Sync</Label>
              <p className="text-sm text-muted-foreground">
                Automatically sync data from connected devices
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Health Insights</Label>
              <p className="text-sm text-muted-foreground">
                Use device data to generate personalized insights
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Data Sharing</Label>
              <p className="text-sm text-muted-foreground">
                Share anonymized data for research purposes
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Disconnect Warning Dialog */}
      {showDisconnectWarning && deviceToDisconnect && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-[400px]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 bg-red-100 rounded-full">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h3 className="font-medium">Disconnect Device</h3>
                  <p className="text-sm text-muted-foreground">
                    Are you sure you want to disconnect this device? This will stop syncing data from this device.
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowDisconnectWarning(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={confirmDisconnect}
                >
                  Disconnect
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
} 