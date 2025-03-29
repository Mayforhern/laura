"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Activity, Heart, MessageCircle, Calendar, TrendingUp, Clock, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/lib/contexts/auth-context";
import { getUserActivities, getAllTherapySessions } from "@/lib/db/actions";

interface ActivityData {
  id: string;
  type: string;
  name: string;
  description: string | null;
  timestamp: Date;
  duration: number | null;
  completed: boolean;
  moodScore: number | null;
  moodNote: string | null;
}

interface TherapySession {
  id: string;
  type: string;
  status: string;
  scheduledTime: Date;
  summary: string | null;
}

export default function ActivityPage() {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("week");
  const [activities, setActivities] = useState<ActivityData[]>([]);
  const [sessions, setSessions] = useState<TherapySession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const loadData = async () => {
      if (!user?.id) return;
      setIsLoading(true);
      try {
        // Get activities based on time range
        const days = timeRange === "week" ? 7 : timeRange === "month" ? 30 : 365;
        const [userActivities, therapySessions] = await Promise.all([
          getUserActivities(user.id, days),
          getAllTherapySessions(user.id)
        ]);
        setActivities(userActivities);
        setSessions(therapySessions);
      } catch (error) {
        console.error("Error loading activities:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [user?.id, timeRange]);

  // Calculate stats
  const totalSessions = sessions.length;
  const completedSessions = sessions.filter(s => s.status === "completed").length;
  const averageDuration = activities
    .filter(a => a.duration)
    .reduce((acc, curr) => acc + (curr.duration || 0), 0) / activities.length || 0;
  
  const engagementRate = totalSessions > 0 
    ? Math.round((completedSessions / totalSessions) * 100) 
    : 0;

  const stats = [
    {
      title: "Total Sessions",
      value: totalSessions.toString(),
      icon: Calendar,
      trend: "+12%",
      trendUp: true,
    },
    {
      title: "Average Duration",
      value: `${Math.round(averageDuration)} min`,
      icon: Clock,
      trend: "+5%",
      trendUp: true,
    },
    {
      title: "Engagement Rate",
      value: `${engagementRate}%`,
      icon: Activity,
      trend: "-2%",
      trendUp: false,
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen pt-20 px-6">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading your activities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl space-y-8 pt-20 px-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Activity</h1>
        <p className="text-muted-foreground">
          Track your mental health journey and progress
        </p>
      </div>

      {/* Time Range Selector */}
      <div className="flex gap-2">
        <Button
          variant={timeRange === "week" ? "default" : "outline"}
          onClick={() => setTimeRange("week")}
        >
          Week
        </Button>
        <Button
          variant={timeRange === "month" ? "default" : "outline"}
          onClick={() => setTimeRange("month")}
        >
          Month
        </Button>
        <Button
          variant={timeRange === "year" ? "default" : "outline"}
          onClick={() => setTimeRange("year")}
        >
          Year
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <stat.icon className="w-4 h-4 text-primary" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <TrendingUp
                  className={`w-4 h-4 mr-1 ${
                    stat.trendUp ? "text-green-500" : "text-red-500"
                  }`}
                />
                <span
                  className={`text-sm ${
                    stat.trendUp ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {stat.trend}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Progress Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Weekly Progress
          </CardTitle>
          <CardDescription>
            Your mental health journey progress
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Mood Stability</span>
              <span className="text-sm text-muted-foreground">
                {Math.round(activities.filter(a => a.type === 'mood').length / 7 * 100)}%
              </span>
            </div>
            <Progress value={Math.round(activities.filter(a => a.type === 'mood').length / 7 * 100)} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Session Attendance</span>
              <span className="text-sm text-muted-foreground">
                {engagementRate}%
              </span>
            </div>
            <Progress value={engagementRate} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Goal Achievement</span>
              <span className="text-sm text-muted-foreground">
                {Math.round(activities.filter(a => a.completed).length / activities.length * 100)}%
              </span>
            </div>
            <Progress value={Math.round(activities.filter(a => a.completed).length / activities.length * 100)} />
          </div>
        </CardContent>
      </Card>

      {/* Activity History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Recent Activity
          </CardTitle>
          <CardDescription>
            Your recent mental health activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {activities.slice(0, 5).map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0"
              >
                <div className="p-2 bg-primary/10 rounded-full">
                  {activity.type === 'therapy' ? (
                    <Brain className="w-4 h-4 text-primary" />
                  ) : activity.type === 'mood' ? (
                    <Heart className="w-4 h-4 text-primary" />
                  ) : (
                    <Activity className="w-4 h-4 text-primary" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{activity.name}</h4>
                    <span className="text-sm text-muted-foreground">
                      {activity.duration ? `${activity.duration} minutes` : 'N/A'}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {activity.description || 'No description available'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(activity.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}

            {activities.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No activities recorded yet. Start your mental health journey by completing a therapy session or logging your mood.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 