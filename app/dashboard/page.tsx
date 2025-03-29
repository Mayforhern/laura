"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Calendar,
  LineChart,
  MessageCircle,
  Activity,
  Sun,
  Moon,
  Cloud,
  Timer,
  BookOpen,
  Heart,
  Trophy,
  Bell,
  AlertCircle,
  PhoneCall,
  Pill,
  Lightbulb,
  Sparkles,
  MessageSquare,
  Settings,
  Wand2,
  Wifi,
  Thermometer,
  Music,
  Lamp,
  BrainCircuit,
  ArrowRight,
  X,
  XCircle,
  Loader2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FixedChat } from "@/components/chat/fixed-chat";
import { MoodForm } from "@/components/mood/mood-form";
import { AnxietyGames } from "@/components/games/anxiety-games";
import { ExpandableChat } from "@/components/chat/expandable-chat";
import { MoodTracker } from "@/components/mood/mood-tracker";
import { GoogleFitConnect } from "@/components/wearables/google-fit-connect";
import { ActivityList } from "@/components/activities/activity-list";
import { ChatHistory } from "@/components/chat/chat-history";
import {
  getTodaysActivities,
  updateActivityStatus,
  getLatestHealthMetrics,
  getUserActivities,
  saveMoodData,
  logActivity,
} from "@/lib/db/actions";
import { StartSessionModal } from "@/components/therapy/start-session-modal";
import { SessionHistory } from "@/components/therapy/session-history";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useRouter, useSearchParams } from "next/navigation";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  addDays,
  format,
  subDays,
  startOfDay,
  isWithinInterval,
} from "date-fns";
import { useAuth } from "@/lib/contexts/auth-context";
import Modal from "@/components/Modal";
import { ActivityLogger } from "@/components/activities/activity-logger";
import { usePrivy } from "@privy-io/react-auth";
import { HealthMetrics } from "@/components/dashboard/health-metrics";
import { FitbitConnect } from "@/components/wearables/fitbit-connect";

// Add this type definition
type ActivityLevel = "none" | "low" | "medium" | "high";

interface DayActivity {
  date: Date;
  level: ActivityLevel;
  activities: {
    type: string;
    name: string;
    completed: boolean;
    time?: string;
  }[];
}

// Add this interface near the top with other interfaces
interface Activity {
  id: string;
  userId: string | null;
  type: string;
  name: string;
  description: string | null;
  timestamp: Date;
  duration: number | null;
  completed: boolean;
  moodScore: number | null;
  moodNote: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Add this interface near other interfaces
interface GameActivity {
  name: string;
  type: "game";
  description: string;
}

// Add this component for the contribution graph
const ContributionGraph = ({ data }: { data: DayActivity[] }) => {
  const getLevelColor = (level: ActivityLevel) => {
    switch (level) {
      case "high":
        return "bg-primary hover:bg-primary/90";
      case "medium":
        return "bg-primary/60 hover:bg-primary/70";
      case "low":
        return "bg-primary/30 hover:bg-primary/40";
      default:
        return "bg-muted hover:bg-muted/80";
    }
  };

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-7 gap-2">
        {data.map((day, i) => (
          <div key={i} className="group relative">
            <div
              className={cn(
                "w-full aspect-square rounded-sm cursor-pointer transition-colors",
                getLevelColor(day.level)
              )}
            />
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block">
              <div className="bg-popover text-popover-foreground text-xs rounded-md px-2 py-1 whitespace-nowrap shadow-md">
                <p className="font-medium">{format(day.date, "MMM d, yyyy")}</p>
                <p>{day.activities.length} activities</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Add these helper functions at the top of the file
const calculateDailyStats = (activities: Activity[]) => {
  const today = startOfDay(new Date());
  const todaysActivities = activities.filter((activity) =>
    isWithinInterval(new Date(activity.timestamp), {
      start: today,
      end: addDays(today, 1),
    })
  );

  // Calculate mood score (average of today's mood entries)
  const moodEntries = todaysActivities.filter(
    (a) => a.type === "mood" && a.moodScore !== null
  );
  const averageMood =
    moodEntries.length > 0
      ? Math.round(
          moodEntries.reduce((acc, curr) => acc + (curr.moodScore || 0), 0) /
            moodEntries.length
        )
      : null;

  // Calculate completion rate
  const completedActivities = todaysActivities.filter(
    (a) => a.completed
  ).length;
  const completionRate =
    todaysActivities.length > 0
      ? Math.round((completedActivities / todaysActivities.length) * 100)
      : 0;

  // Count mindfulness activities (games, meditation, etc.)
  const mindfulnessActivities = todaysActivities.filter((a) =>
    ["game", "meditation", "breathing"].includes(a.type)
  ).length;

  return {
    moodScore: averageMood,
    completionRate,
    mindfulnessCount: mindfulnessActivities,
    totalActivities: todaysActivities.length,
  };
};

// Add this helper function to generate AI insights
const generateAIInsights = (activities: Activity[]) => {
  const insights: {
    title: string;
    description: string;
    icon: any;
    priority: "low" | "medium" | "high";
  }[] = [];

  // Get activities from last 7 days
  const lastWeek = subDays(new Date(), 7);
  const recentActivities = activities.filter(
    (a) => new Date(a.timestamp) >= lastWeek
  );

  // Analyze mood patterns
  const moodEntries = recentActivities.filter(
    (a) => a.type === "mood" && a.moodScore !== null
  );
  if (moodEntries.length >= 2) {
    const averageMood =
      moodEntries.reduce((acc, curr) => acc + (curr.moodScore || 0), 0) /
      moodEntries.length;
    const latestMood = moodEntries[moodEntries.length - 1].moodScore || 0;

    if (latestMood > averageMood) {
      insights.push({
        title: "Mood Improvement",
        description:
          "Your recent mood scores are above your weekly average. Keep up the good work!",
        icon: Brain,
        priority: "high",
      });
    } else if (latestMood < averageMood - 20) {
      insights.push({
        title: "Mood Change Detected",
        description:
          "I've noticed a dip in your mood. Would you like to try some mood-lifting activities?",
        icon: Heart,
        priority: "high",
      });
    }
  }

  // Analyze activity patterns
  const mindfulnessActivities = recentActivities.filter((a) =>
    ["game", "meditation", "breathing"].includes(a.type)
  );
  if (mindfulnessActivities.length > 0) {
    const dailyAverage = mindfulnessActivities.length / 7;
    if (dailyAverage >= 1) {
      insights.push({
        title: "Consistent Practice",
        description: `You've been regularly engaging in mindfulness activities. This can help reduce stress and improve focus.`,
        icon: Trophy,
        priority: "medium",
      });
    } else {
      insights.push({
        title: "Mindfulness Opportunity",
        description:
          "Try incorporating more mindfulness activities into your daily routine.",
        icon: Sparkles,
        priority: "low",
      });
    }
  }

  // Check activity completion rate
  const completedActivities = recentActivities.filter((a) => a.completed);
  const completionRate =
    recentActivities.length > 0
      ? (completedActivities.length / recentActivities.length) * 100
      : 0;

  if (completionRate >= 80) {
    insights.push({
      title: "High Achievement",
      description: `You've completed ${Math.round(
        completionRate
      )}% of your activities this week. Excellent commitment!`,
      icon: Trophy,
      priority: "high",
    });
  } else if (completionRate < 50) {
    insights.push({
      title: "Activity Reminder",
      description:
        "You might benefit from setting smaller, more achievable daily goals.",
      icon: Calendar,
      priority: "medium",
    });
  }

  // Time pattern analysis
  const morningActivities = recentActivities.filter(
    (a) => new Date(a.timestamp).getHours() < 12
  );
  const eveningActivities = recentActivities.filter(
    (a) => new Date(a.timestamp).getHours() >= 18
  );

  if (morningActivities.length > eveningActivities.length) {
    insights.push({
      title: "Morning Person",
      description:
        "You're most active in the mornings. Consider scheduling important tasks during your peak hours.",
      icon: Sun,
      priority: "medium",
    });
  } else if (eveningActivities.length > morningActivities.length) {
    insights.push({
      title: "Evening Routine",
      description:
        "You tend to be more active in the evenings. Make sure to wind down before bedtime.",
      icon: Moon,
      priority: "medium",
    });
  }

  // Sort insights by priority and return top 3
  return insights
    .sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    })
    .slice(0, 3);
};

// Create a SearchParamsComponent to isolate useSearchParams
const SearchParamsComponent = ({
  onParamsChange,
}: {
  onParamsChange: (params: URLSearchParams) => void;
}) => {
  const searchParams = useSearchParams();

  useEffect(() => {
    onParamsChange(searchParams);
  }, [searchParams, onParamsChange]);

  return null;
};

export default function Dashboard() {
  const { isLoading, user, isAuthenticated } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  // New states for crisis management and interventions
  const [riskLevel, setRiskLevel] = useState<"low" | "medium" | "high">("low");
  const [showCrisisAlert, setShowCrisisAlert] = useState(false);
  const [interventions, setInterventions] = useState([
    {
      type: "meditation",
      title: "Breathing Exercise",
      duration: "5 mins",
      completed: false,
    },
    {
      type: "activity",
      title: "Evening Walk",
      duration: "20 mins",
      completed: true,
    },
  ]);

  // Crisis resources
  const emergencyContacts = [
    { name: "Crisis Hotline", number: "1-800-273-8255" },
    { name: "Therapist", number: "Dr. Smith - (555) 123-4567" },
  ];

  // Medication tracking
  const medications = [
    {
      name: "Sertraline",
      dosage: "50mg",
      time: "9:00 AM",
      taken: true,
    },
    {
      name: "Vitamin D",
      dosage: "1000 IU",
      time: "9:00 AM",
      taken: false,
    },
  ];

  // AI Insights
  const [aiInsights, setAiInsights] = useState<
    {
      title: string;
      description: string;
      icon: any;
      priority: "low" | "medium" | "high";
    }[]
  >([]);

  // New states for chat and IoT
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi Sarah, how are you feeling today?",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
    },
    {
      role: "user",
      content: "I'm feeling a bit anxious about my presentation tomorrow.",
      timestamp: new Date(Date.now() - 1000 * 60 * 4),
    },
    {
      role: "assistant",
      content:
        "I understand presentations can be stressful. Would you like to try a quick breathing exercise together?",
      timestamp: new Date(Date.now() - 1000 * 60 * 3),
    },
  ]);

  // New states for activities and wearables
  const [activities, setActivities] = useState<Activity[]>([]);
  // const [wearableConnected, setWearableConnected] = useState(false);
  // const [healthMetrics, setHealthMetrics] = useState({...});

  // Also add userId for the function call
  // const userId = "current-user-id"; // Replace this with actual user ID from your auth system

  // New states for mood tracking
  const [showMoodModal, setShowMoodModal] = useState(false);
  const [showCheckInChat, setShowCheckInChat] = useState(false);

  // In your Dashboard component, add this state
  const [activityHistory, setActivityHistory] = useState<DayActivity[]>([]);

  // Add state for activity logger
  const [showActivityLogger, setShowActivityLogger] = useState(false);

  // Add new state for loading
  const [isSavingActivity, setIsSavingActivity] = useState(false);
  const [isSavingMood, setIsSavingMood] = useState(false);

  // Add this state for today's stats
  const [todayStats, setTodayStats] = useState({
    moodScore: null as number | null,
    completionRate: 0,
    mindfulnessCount: 0,
    totalActivities: 0,
  });

  // Add this function to transform activities into day activity format
  const transformActivitiesToDayActivity = (
    activities: Activity[]
  ): DayActivity[] => {
    const days: DayActivity[] = [];
    const today = new Date();

    // Create array for last 28 days
    for (let i = 27; i >= 0; i--) {
      const date = startOfDay(subDays(today, i));
      const dayActivities = activities.filter((activity) =>
        isWithinInterval(new Date(activity.timestamp), {
          start: date,
          end: addDays(date, 1),
        })
      );

      // Determine activity level based on number of activities
      let level: ActivityLevel = "none";
      if (dayActivities.length > 0) {
        if (dayActivities.length <= 2) level = "low";
        else if (dayActivities.length <= 4) level = "medium";
        else level = "high";
      }

      days.push({
        date,
        level,
        activities: dayActivities.map((activity) => ({
          type: activity.type,
          name: activity.name,
          completed: activity.completed,
          time: format(new Date(activity.timestamp), "h:mm a"),
        })),
      });
    }

    return days;
  };

  // Modify the loadActivities function to update activityHistory
  const loadActivities = useCallback(async () => {
    if (!user?.id) return;
    try {
      const userActivities = await getUserActivities(user.id);
      setActivities(userActivities);
      setActivityHistory(transformActivitiesToDayActivity(userActivities));
    } catch (error) {
      console.error("Error loading activities:", error);
    }
  }, [user?.id]);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Check if we have a hash in the URL (contains access token after auth)
    if (window.location.hash) {
      const params = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = params.get("access_token");
      if (accessToken) {
        // Store the token securely
        localStorage.setItem("fitbit_token", accessToken);
        // Clear the URL
        router.replace("/dashboard");
        // Update state to show connected
        // setWearableConnected(true);
      }
    }
  }, [router]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setShowModal(true);
      // Redirect after a short delay to allow modal to be shown
      const timeout = setTimeout(() => {
        router.push("/");
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [isAuthenticated, isLoading, router]);

  const moodHistory = [
    { day: "Mon", value: 65 },
    { day: "Tue", value: 75 },
    { day: "Wed", value: 85 },
    { day: "Thu", value: 70 },
    { day: "Fri", value: 80 },
    { day: "Sat", value: 90 },
    { day: "Sun", value: 85 },
  ];

  const upcomingSessions = [
    {
      title: "Therapy Session",
      time: "2:00 PM",
      date: "Today",
      type: "Video Call",
    },
    {
      title: "Meditation",
      time: "9:00 AM",
      date: "Tomorrow",
      type: "Group Session",
    },
  ];

  // Add this effect to update stats when activities change
  useEffect(() => {
    if (activities.length > 0) {
      setTodayStats(calculateDailyStats(activities));
    }
  }, [activities]);

  // Replace the existing wellnessStats array with this dynamic version
  const wellnessStats = [
    {
      title: "Mood Score",
      value: todayStats.moodScore ? `${todayStats.moodScore}%` : "No data",
      icon: Brain,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      description: "Today's average mood",
    },
    {
      title: "Completion Rate",
      value: `${todayStats.completionRate}%`,
      icon: Trophy,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      description: "Activities completed",
    },
    {
      title: "Mindfulness",
      value: `${todayStats.mindfulnessCount} sessions`,
      icon: Heart,
      color: "text-rose-500",
      bgColor: "bg-rose-500/10",
      description: "Mindfulness activities",
    },
    {
      title: "Total Activities",
      value: todayStats.totalActivities.toString(),
      icon: Activity,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      description: "Planned for today",
    },
  ];

  // Add this effect to update insights when activities change
  useEffect(() => {
    if (activities.length > 0) {
      setAiInsights(generateAIInsights(activities));
    }
  }, [activities]);

  // Fetch activities and health metrics
  // useEffect(() => {
  //   if (mounted) {
  //     fetchTodaysActivities();
  //     fetchHealthMetrics();
  //   }
  // }, [mounted]);

  // Add these action handlers
  const handleStartTherapy = () => {
    router.push("/therapy/new");
  };

  const handleMoodSubmit = async (data: { moodScore: number }) => {
    setIsSavingMood(true);
    try {
      await saveMoodData({
        userId: user?.id as string,
        mood: data.moodScore,
        note: "",
      });
      setShowMoodModal(false);
    } catch (error) {
      console.error("Error saving mood:", error);
    } finally {
      setIsSavingMood(false);
    }
  };

  const handleAICheckIn = () => {
    setShowActivityLogger(true);
  };

  // Function to fetch Fitbit data
  const fetchFitbitData = async () => {
    const token = localStorage.getItem("fitbit_token");
    if (!token) return;

    try {
      const response = await fetch(
        "https://api.fitbit.com/1/user/-/profile.json",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        // Handle the data
        console.log(data);
      } else {
        // Handle error or token expiration
        // setWearableConnected(false);
        localStorage.removeItem("fitbit_token");
      }
    } catch (error) {
      console.error("Failed to fetch Fitbit data:", error);
    }
  };

  // Use the fetchFitbitData function when needed
  useEffect(() => {
    if (mounted) {
      fetchFitbitData();
    }
  }, [mounted]);

  // Load activities on mount and after new ones are logged
  useEffect(() => {
    if (user?.id) {
      loadActivities();
    }
  }, [user?.id, loadActivities]);

  // Add this handler for game activities
  const handleGamePlayed = useCallback(
    async (gameName: string, description: string) => {
      if (!user?.id) return;

      try {
        await logActivity({
          userId: user.id,
          type: "game",
          name: gameName,
          description: description,
          completed: true,
          duration: null, // Games typically don't have fixed durations
          moodScore: null,
          moodNote: null,
        });

        // Refresh activities after logging
        loadActivities();
      } catch (error) {
        console.error("Error logging game activity:", error);
      }
    },
    [user?.id, loadActivities]
  );

  // Add handler for search params
  const handleSearchParams = useCallback((params: URLSearchParams) => {
    // Handle search params here
    // Your existing search params logic
  }, []);

  // Simple loading state
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  // Remove or modify the debug console.log
  // Instead of constant logging, we can log only when auth state changes
  // useEffect(() => {
  //   if (process.env.NODE_ENV === "development") {
  //     console.log("Auth state changed:", { isAuthenticated, user, isLoading });
  //   }
  // }, [isAuthenticated, user, isLoading]);

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            Please sign in to continue
          </h2>
          <p className="text-muted-foreground">
            You need to be authenticated to view this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={null}>
        <SearchParamsComponent onParamsChange={handleSearchParams} />
      </Suspense>
      <Container className="pt-20 pb-8 space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-2"
          >
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back, {user?.name || "there"}
            </h1>
            <p className="text-muted-foreground">
              {currentTime.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
          </motion.div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Crisis Alert */}
        {showCrisisAlert && (
          <Alert variant="destructive" className="animate-pulse">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Crisis Support Available</AlertTitle>
            <AlertDescription>
              We've noticed you might be having a difficult time. Help is
              available 24/7.
              <div className="mt-2">
                <Button variant="secondary" className="mr-2">
                  <PhoneCall className="mr-2 h-4 w-4" />
                  Call Crisis Line
                </Button>
                <Button variant="outline">Message Therapist</Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Main Grid Layout */}
        <div className="space-y-6">
          {/* Top Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Quick Actions Card */}
            <Card className="border-primary/10 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-transparent" />
              <CardContent className="p-6 relative">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Quick Actions</h3>
                      <p className="text-sm text-muted-foreground">
                        Start your wellness journey
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    <Button
                      variant="default"
                      className={cn(
                        "w-full justify-between items-center p-6 h-auto group/button",
                        "bg-gradient-to-r from-primary/90 to-primary hover:from-primary hover:to-primary/90",
                        "transition-all duration-200 group-hover:translate-y-[-2px]"
                      )}
                      onClick={handleStartTherapy}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                          <MessageSquare className="w-4 h-4 text-white" />
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-white">
                            Start Therapy
                          </div>
                          <div className="text-xs text-white/80">
                            Begin a new session
                          </div>
                        </div>
                      </div>
                      <div className="opacity-0 group-hover/button:opacity-100 transition-opacity">
                        <ArrowRight className="w-5 h-5 text-white" />
                      </div>
                    </Button>

                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant="outline"
                        className={cn(
                          "flex flex-col h-[120px] px-4 py-3 group/mood hover:border-primary/50",
                          "justify-center items-center text-center",
                          "transition-all duration-200 group-hover:translate-y-[-2px]"
                        )}
                        onClick={() => setShowMoodModal(true)}
                      >
                        <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center mb-2">
                          <Heart className="w-5 h-5 text-rose-500" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">Track Mood</div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            How are you feeling?
                          </div>
                        </div>
                      </Button>

                      <Button
                        variant="outline"
                        className={cn(
                          "flex flex-col h-[120px] px-4 py-3 group/ai hover:border-primary/50",
                          "justify-center items-center text-center",
                          "transition-all duration-200 group-hover:translate-y-[-2px]"
                        )}
                        onClick={handleAICheckIn}
                      >
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mb-2">
                          <BrainCircuit className="w-5 h-5 text-blue-500" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">Check-in</div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            Quick wellness check
                          </div>
                        </div>
                      </Button>

                      <Button
                        variant="outline"
                        className={cn(
                          "flex flex-col h-[120px] px-4 py-3 group/nft hover:border-primary/50",
                          "justify-center items-center text-center",
                          "transition-all duration-200 group-hover:translate-y-[-2px]"
                        )}
                        onClick={() => router.push("/therapy/nfts")}
                      >
                        <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center mb-2">
                          <Trophy className="w-5 h-5 text-yellow-500" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">
                            NFT Collection
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            View your achievements
                          </div>
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Today's Overview Card */}
            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle>Today's Overview</CardTitle>
                <CardDescription>
                  Your wellness metrics for {format(new Date(), "MMMM d, yyyy")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {wellnessStats.map((stat, index) => (
                    <div
                      key={stat.title}
                      className={cn(
                        "p-4 rounded-lg transition-all duration-200 hover:scale-[1.02]",
                        stat.bgColor
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <stat.icon className={cn("w-5 h-5", stat.color)} />
                        <p className="text-sm font-medium">{stat.title}</p>
                      </div>
                      <p className="text-2xl font-bold mt-2">{stat.value}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {stat.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Insights Card */}
            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BrainCircuit className="w-5 h-5 text-primary" />
                  AI Insights
                </CardTitle>
                <CardDescription>
                  Personalized recommendations based on your activity patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiInsights.length > 0 ? (
                    aiInsights.map((insight, index) => (
                      <div
                        key={index}
                        className={cn(
                          "p-4 rounded-lg space-y-2 transition-all hover:scale-[1.02]",
                          insight.priority === "high"
                            ? "bg-primary/10"
                            : insight.priority === "medium"
                            ? "bg-primary/5"
                            : "bg-muted"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <insight.icon className="w-5 h-5 text-primary" />
                          <p className="font-medium">{insight.title}</p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {insight.description}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-muted-foreground py-8">
                      <Activity className="w-8 h-8 mx-auto mb-3 opacity-50" />
                      <p>
                        Complete more activities to receive personalized
                        insights
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left side - Spans 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              {/* Google Fit Connect Card */}
              <Card className="border-primary/10 overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center gap-6">
                    {/* Left side - Icon */}
                    <div className="shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center ring-2 ring-primary/5">
                        <Wifi className="w-6 h-6" />
                      </div>
                    </div>

                    {/* Middle - Text content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold mb-1">
                          Connect Your Smartwatch
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Track health metrics and get personalized insights through Google Fit
                      </p>
                    </div>

                    {/* Right side - Button */}
                    <div className="shrink-0">
                      <GoogleFitConnect onConnect={() => {}} />
                    </div>
                  </div>

                  {/* Security note */}
                  <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="w-1 h-1 rounded-full bg-green-500" />
                    <span>Securely connect through Google Fit</span>
                  </div>
                </CardContent>
              </Card>

              {/* Anxiety Games - Now directly below Fitbit */}
              <AnxietyGames onGamePlayed={handleGamePlayed} />
            </div>

            {/* Right Column - Activities */}
            <div>
              <Card className="border-primary/10">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <CardTitle>Activity Overview</CardTitle>
                      <CardDescription>
                        Your wellness journey over time
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <div className="w-3 h-3 rounded-sm bg-muted" />
                        <span>Less</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <div className="w-3 h-3 rounded-sm bg-primary" />
                        <span>More</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Contribution Graph */}
                  <ContributionGraph data={activityHistory} />

                  {/* Recent Activities */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-sm">Recent Activities</h4>
                    <div className="space-y-2">
                      {activityHistory.slice(-3).flatMap((day) =>
                        day.activities.map((activity, i) => (
                          <div
                            key={`${format(day.date, "yyyy-MM-dd")}-${i}`}
                            className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={cn(
                                  "w-2 h-2 rounded-full",
                                  activity.completed
                                    ? "bg-green-500"
                                    : "bg-yellow-500"
                                )}
                              />
                              <div>
                                <p className="text-sm font-medium">
                                  {activity.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {format(day.date, "MMM d")}{" "}
                                  {activity.time && `at ${activity.time}`}
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className={cn(
                                "text-xs",
                                activity.completed && "text-green-500"
                              )}
                            >
                              {activity.completed ? "Completed" : "Start"}
                            </Button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Container>

      {/* Fixed Chat */}
      <FixedChat />

      {/* Mood tracking modal */}
      <Dialog open={showMoodModal} onOpenChange={setShowMoodModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>How are you feeling?</DialogTitle>
            <DialogDescription>
              Move the slider to track your current mood
            </DialogDescription>
          </DialogHeader>
          <MoodForm onSubmit={handleMoodSubmit} isLoading={isSavingMood} />
        </DialogContent>
      </Dialog>

      {/* AI check-in chat */}
      {showCheckInChat && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-background border-l shadow-lg">
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between px-4 py-3 border-b">
                <h3 className="font-semibold">AI Check-in</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowCheckInChat(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                {/* Add your AI chat interface here */}
              </div>
            </div>
          </div>
        </div>
      )}

      <ActivityLogger
        open={showActivityLogger}
        onOpenChange={setShowActivityLogger}
        onActivityLogged={loadActivities}
      />
    </div>
  );
}
