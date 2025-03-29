"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Activity, LineChart, TrendingUp, Loader2, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  supportGroups: number;
  weeklyGrowth: number;
  recentActivities: Array<{
    id: string;
    type: string;
    description: string;
    timestamp: string;
  }>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchDashboardStats = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setErrorDetails(null);

      // Fetch users count first to test connection
      const usersResponse = await fetch('/api/admin/users/count');
      const usersData = await usersResponse.json();
      
      if (!usersResponse.ok) {
        throw new Error(`Users API error: ${usersData.error} - ${usersData.details || 'No details available'}`);
      }

      // Fetch remaining data
      const [sessionsResponse, groupsResponse, growthResponse, activitiesResponse] = 
        await Promise.all([
          fetch('/api/admin/sessions/active'),
          fetch('/api/admin/support-groups/count'),
          fetch('/api/admin/analytics/weekly-growth'),
          fetch('/api/admin/activities/recent')
        ]);

      // Parse all responses
      const [
        { count: activeUsers },
        { count: supportGroups },
        { percentage: weeklyGrowth },
        { activities: recentActivities }
      ] = await Promise.all([
        sessionsResponse.json(),
        groupsResponse.json(),
        growthResponse.json(),
        activitiesResponse.json()
      ]);

      setStats({
        totalUsers: usersData.count,
        activeUsers,
        supportGroups,
        weeklyGrowth,
        recentActivities
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      setError('Failed to load dashboard statistics');
      setErrorDetails(error instanceof Error ? error.message : 'Unknown error');
      toast({
        title: "Error",
        description: "Failed to load dashboard statistics. Check console for details.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
    // Refresh data every 30 seconds
    const interval = setInterval(fetchDashboardStats, 30000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4 min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            <p>{error}</p>
            {errorDetails && (
              <p className="mt-2 text-sm opacity-80">Details: {errorDetails}</p>
            )}
          </AlertDescription>
        </Alert>
        <Button onClick={fetchDashboardStats} variant="outline" className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  // Initialize stats with default values if null
  const displayStats = stats || {
    totalUsers: 0,
    activeUsers: 0,
    supportGroups: 0,
    weeklyGrowth: 0,
    recentActivities: []
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-0.5 mb-8">
        <h2 className="text-2xl font-bold tracking-tight">Admin Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of platform statistics and recent activity
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{displayStats.totalUsers.toLocaleString()}</div>
              <div className="text-sm text-green-500 flex items-center">
                Live
                <Activity className="ml-1 h-4 w-4 animate-pulse" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Sessions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{displayStats.activeUsers}</div>
              <div className="text-sm text-green-500 flex items-center">
                Live
                <Activity className="ml-1 h-4 w-4 animate-pulse" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support Groups */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Support Groups</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{displayStats.supportGroups}</div>
              <div className="text-sm text-green-500 flex items-center">
                Live
                <Activity className="ml-1 h-4 w-4 animate-pulse" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Growth */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Growth</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{displayStats.weeklyGrowth}%</div>
              <div className="text-sm text-green-500 flex items-center">
                Live
                <Activity className="ml-1 h-4 w-4 animate-pulse" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Recent Activity
            <span className="text-sm text-green-500 flex items-center gap-1">
              Live
              <Activity className="h-4 w-4 animate-pulse" />
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {displayStats.recentActivities.length > 0 ? (
              displayStats.recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Activity className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{activity.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
                        -Math.round((Date.now() - new Date(activity.timestamp).getTime()) / (1000 * 60 * 60)),
                        'hours'
                      )}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-sm text-muted-foreground">No recent activities</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 