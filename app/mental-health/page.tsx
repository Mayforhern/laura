"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoodJournal } from "@/components/mental-health/mood-journal";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Calendar, LineChart as ChartIcon, Heart, Phone, MapPin, Globe, Clock, Sparkles, Moon, Activity, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateHealthInsights, generateMoodRecommendations, analyzeSleepPattern } from "@/lib/services/ai-insights";
import { usePrivy } from "@privy-io/react-auth";
import { MoodHistory } from "@/components/mental-health/mood-history";

const MAPBOX_API_KEY = "pk.eyJ1IjoiZXJlbjk3IiwiYSI6ImNsendmMTY5YzBpZGgybnNpNHUxY2dmeXcifQ.SlfHg7eZD2QVa6miDf5hfw";

interface MoodEntry {
  id: string;
  moodScore: number;
  description: string;
  moodNote: string;
  createdAt: string;
}

interface Location {
  country: string;
  city: string;
  state?: string;
}

interface Insight {
  title: string;
  description: string;
  priority: string;
  category: string;
}

interface Recommendation {
  title: string;
  description: string;
  type: string;
  duration: string;
}

interface SleepInsight {
  quality: string;
  insights: Array<{
    title: string;
    description: string;
    recommendation: string;
  }>;
  recommendations: {
    bedtime: string;
    wakeTime: string;
    improvements: string[];
  };
}

export default function MentalHealthPage() {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [sleepInsights, setSleepInsights] = useState<SleepInsight | null>(null);
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);
  const { toast } = useToast();
  const { user, authenticated, ready } = usePrivy();
  const [activeTab, setActiveTab] = useState('journal');

  useEffect(() => {
    if (authenticated) {
      fetchMoodEntries();
      getUserLocation();
    }
  }, [authenticated]);

  const getUserLocation = async () => {
    setLoading(true);
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${MAPBOX_API_KEY}`
      );
      
      const data = await response.json();
      const features = data.features[0];
      
      const country = features.context.find((c: any) => c.id.startsWith('country'))?.text;
      const city = features.context.find((c: any) => c.id.startsWith('place'))?.text;
      const state = features.context.find((c: any) => c.id.startsWith('region'))?.text;

      setLocation({ country, city, state });
    } catch (error) {
      console.error('Error getting location:', error);
      toast({
        title: "Location Error",
        description: "Could not determine your location. Showing general resources.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchMoodEntries = async () => {
    try {
      const response = await fetch("/api/mental-health/mood");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setMoodEntries(data);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to load entries",
        variant: "destructive",
      });
    }
  };

  const handleSaveMood = async (entry: MoodEntry) => {
    try {
      const response = await fetch("/api/mental-health/mood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });

      if (!response.ok) throw new Error("Failed to save");
      
      const savedEntry = await response.json();
      setMoodEntries(prev => [savedEntry, ...prev]);
      
      toast({
        title: "Success",
        description: "Entry saved",
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to save entry",
        variant: "destructive",
      });
    }
  };

  const getEmergencyNumber = (country: string): string => {
    const emergencyNumbers: { [key: string]: string } = {
      'United States': '911',
      'United Kingdom': '999',
      'Australia': '000',
      'India': '112',
      // Add more country-specific emergency numbers
    };
    return emergencyNumbers[country] || '112'; // Default to general EU emergency number
  };

  const getCrisisHotline = (country: string): string => {
    const hotlines: { [key: string]: string } = {
      'United States': '988',
      'United Kingdom': '116 123',
      'Australia': '13 11 14',
      'India': '9152987821',
      // Add more country-specific crisis hotlines
    };
    return hotlines[country] || 'Contact your local mental health provider';
  };

  const generateInsights = async () => {
    if (!authenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to generate insights",
        variant: "destructive",
      });
      return;
    }

    setIsLoadingInsights(true);
    try {
      // Get the latest mood entries
      const latestEntries = moodEntries.slice(0, 5);
      if (latestEntries.length === 0) {
        toast({
          title: "No Mood Data",
          description: "Please add some mood entries first",
          variant: "destructive",
        });
        return;
      }

      const averageMood = latestEntries.reduce((sum, entry) => sum + entry.moodScore, 0) / latestEntries.length;
      
      // Prepare health data with actual mood entries
      const healthData = {
        heartRate: {
          average: 75,
          max: 120,
          min: 60
        },
        sleep: {
          duration: 7.5,
          efficiency: 85,
          stages: {
            deep: 20,
            light: 55,
            rem: 25
          }
        },
        steps: 8000,
        mood: averageMood,
        activities: latestEntries.map(entry => ({
          type: "mood_entry",
          timestamp: entry.createdAt,
          score: entry.moodScore,
          note: entry.moodNote || "",
        }))
      };

      let hasError = false;
      let errorMessages = [];

      // Generate health insights
      let insightResults = [];
      try {
        insightResults = await generateHealthInsights(healthData);
        if (insightResults.length > 0) {
          setInsights(insightResults);
        } else {
          errorMessages.push("Could not generate health insights");
          hasError = true;
        }
      } catch (error: any) {
        errorMessages.push(`Health insights error: ${error.message}`);
        hasError = true;
      }

      // Generate mood recommendations
      let recommendationResults = [];
      try {
        recommendationResults = await generateMoodRecommendations(healthData.mood, healthData.activities);
        if (recommendationResults.length > 0) {
          setRecommendations(recommendationResults);
        } else {
          errorMessages.push("Could not generate mood recommendations");
          hasError = true;
        }
      } catch (error: any) {
        errorMessages.push(`Mood recommendations error: ${error.message}`);
        hasError = true;
      }

      // Generate sleep analysis
      let sleepResults = null;
      try {
        sleepResults = await analyzeSleepPattern([{
          date: new Date().toISOString(),
          duration: healthData.sleep.duration,
          efficiency: healthData.sleep.efficiency,
          stages: healthData.sleep.stages
        }]);
        if (sleepResults) {
          setSleepInsights(sleepResults);
        } else {
          errorMessages.push("Could not generate sleep analysis");
          hasError = true;
        }
      } catch (error: any) {
        errorMessages.push(`Sleep analysis error: ${error.message}`);
        hasError = true;
      }

      // Show appropriate toast message
      if (hasError) {
        toast({
          title: "Some insights failed to generate",
          description: (
            <div className="mt-2 space-y-2">
              {errorMessages.map((msg, i) => (
                <p key={i} className="text-sm">• {msg}</p>
              ))}
              <p className="text-sm mt-2">This might be due to API limits or connectivity issues. Please try again later.</p>
            </div>
          ),
          variant: "destructive",
          duration: 5000,
        });
      } else if (insightResults.length > 0 || recommendationResults.length > 0 || sleepResults) {
        toast({
          title: "Success",
          description: "Generated insights based on your data",
          duration: 3000,
        });
      } else {
        toast({
          title: "No Insights Generated",
          description: "Could not generate any insights. This might be due to insufficient data or API issues.",
          variant: "destructive",
          duration: 5000,
        });
      }

    } catch (error: any) {
      toast({
        title: "Error Generating Insights",
        description: (
          <div className="mt-2 space-y-2">
            <p className="text-sm">Failed to generate insights: {error.message}</p>
            <p className="text-sm">Please try again later or contact support if the issue persists.</p>
          </div>
        ),
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsLoadingInsights(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl mt-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Mental Health Tracking
        </h1>
        <p className="text-muted-foreground mt-2">Track, analyze, and improve your emotional well-being</p>
      </motion.div>

      <Tabs defaultValue="journal" className="space-y-8">
        <TabsList className="grid w-full grid-cols-4 lg:w-[600px] relative overflow-hidden">
          <div className="absolute bottom-0 h-[2px] bg-primary transition-all duration-300" 
               style={{ 
                 left: '0%', 
                 width: '25%',
                 transform: `translateX(${['journal', 'history', 'insights', 'support'].indexOf(activeTab) * 100}%)`
               }} 
          />
          <TabsTrigger 
            value="journal" 
            className="flex items-center gap-2 relative overflow-hidden group"
            onClick={() => setActiveTab('journal')}
          >
            <Brain className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span className="relative">
              Journal
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform" />
            </span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2 relative overflow-hidden group" onClick={() => setActiveTab('history')}>
            <Calendar className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span className="relative">
              History
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform" />
            </span>
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2 relative overflow-hidden group" onClick={() => setActiveTab('insights')}>
            <ChartIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span className="relative">
              Insights
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform" />
            </span>
          </TabsTrigger>
          <TabsTrigger value="support" className="flex items-center gap-2 relative overflow-hidden group" onClick={() => setActiveTab('support')}>
            <Heart className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span className="relative">
              Support
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform" />
            </span>
          </TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <TabsContent value="journal" className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <CardContent className="pt-6">
                  <MoodJournal onSave={handleSaveMood} entries={moodEntries} />
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="history">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <CardContent className="pt-6">
                  <MoodHistory entries={moodEntries.map(entry => ({
                    id: entry.id,
                    score: entry.moodScore,
                    description: entry.moodNote || entry.description,
                    createdAt: entry.createdAt,
                    tags: []
                  }))} />
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="insights">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  AI Insights
                </h2>
                <Button 
                  onClick={generateInsights} 
                  disabled={isLoadingInsights}
                  className="flex items-center gap-2 bg-primary/90 hover:bg-primary transition-colors duration-300"
                >
                  <Sparkles className="w-4 h-4" />
                  {isLoadingInsights ? (
                    <span className="flex items-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="mr-2"
                      >
                        <Waves className="w-4 h-4" />
                      </motion.div>
                      Generating...
                    </span>
                  ) : (
                    "Generate Insights"
                  )}
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {[
                  {
                    title: "Health Insights",
                    icon: <Activity className="w-5 h-5 text-primary" />,
                    description: "AI-powered analysis of your health data",
                    content: insights,
                    type: "insights" as const
                  },
                  {
                    title: "Mood Recommendations",
                    icon: <Brain className="w-5 h-5 text-primary" />,
                    description: "Personalized suggestions for mood improvement",
                    content: recommendations,
                    type: "recommendations" as const
                  },
                  {
                    title: "Sleep Analysis",
                    icon: <Moon className="w-5 h-5 text-primary" />,
                    description: "AI analysis of your sleep patterns",
                    content: sleepInsights,
                    type: "sleep" as const
                  }
                ].map((section, index) => (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur supports-[backdrop-filter]:bg-background/60 group overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <span className="transform group-hover:scale-110 transition-transform duration-300">
                            {section.icon}
                          </span>
                          {section.title}
                        </CardTitle>
                        <CardDescription>{section.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {section.type === "insights" && section.content && section.content.length > 0 ? (
                          section.content.map((insight: Insight, index: number) => (
                            <div key={index} className="p-4 bg-gradient-to-br from-muted/80 to-muted/40 rounded-lg border border-border/50 hover:border-primary/20 transition-colors duration-300">
                              <h3 className="font-semibold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">{insight.title}</h3>
                              <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
                              <div className="flex gap-2 mt-2">
                                <span className={`text-xs px-2 py-1 rounded-full shadow-sm ${
                                  insight.priority === 'high' ? 'bg-red-100 text-red-800 border border-red-200' :
                                  insight.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                                  'bg-green-100 text-green-800 border border-green-200'
                                }`}>
                                  {insight.priority}
                                </span>
                                <span className={`text-xs px-2 py-1 rounded-full shadow-sm ${
                                  insight.category === 'sleep' ? 'bg-indigo-100 text-indigo-800 border border-indigo-200' :
                                  insight.category === 'activity' ? 'bg-orange-100 text-orange-800 border border-orange-200' :
                                  insight.category === 'mood' ? 'bg-pink-100 text-pink-800 border border-pink-200' :
                                  'bg-blue-100 text-blue-800 border border-blue-200'
                                }`}>
                                  {insight.category}
                                </span>
                              </div>
                            </div>
                          ))
                        ) : section.type === "recommendations" && section.content && section.content.length > 0 ? (
                          section.content.map((rec: Recommendation, index: number) => (
                            <div key={index} className="p-4 bg-gradient-to-br from-muted/80 to-muted/40 rounded-lg border border-border/50 hover:border-primary/20 transition-colors duration-300">
                              <h3 className="font-semibold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">{rec.title}</h3>
                              <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
                              <div className="flex gap-2 mt-2">
                                <span className={`text-xs px-2 py-1 rounded-full shadow-sm ${
                                  rec.type === 'meditation' ? 'bg-purple-100 text-purple-800 border border-purple-200' :
                                  rec.type === 'exercise' ? 'bg-orange-100 text-orange-800 border border-orange-200' :
                                  rec.type === 'social' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                                  'bg-pink-100 text-pink-800 border border-pink-200'
                                }`}>
                                  {rec.type}
                                </span>
                                <span className="text-xs px-2 py-1 rounded-full shadow-sm bg-emerald-100 text-emerald-800 border border-emerald-200">
                                  {rec.duration}
                                </span>
                              </div>
                            </div>
                          ))
                        ) : section.type === "sleep" && section.content ? (
                          <>
                            <div className="p-4 bg-gradient-to-br from-muted/80 to-muted/40 rounded-lg border border-border/50 hover:border-primary/20 transition-colors duration-300">
                              <h3 className="font-semibold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Sleep Quality</h3>
                              <p className={`text-2xl font-bold mt-1 capitalize ${
                                section.content.quality === 'good' ? 'text-emerald-600' :
                                section.content.quality === 'fair' ? 'text-yellow-600' :
                                'text-red-600'
                              }`}>{section.content.quality}</p>
                            </div>
                            {section.content.insights.map((insight, index) => (
                              <div key={index} className="p-4 bg-gradient-to-br from-muted/80 to-muted/40 rounded-lg border border-border/50 hover:border-primary/20 transition-colors duration-300">
                                <h3 className="font-semibold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">{insight.title}</h3>
                                <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
                                <p className="text-sm text-primary mt-2">{insight.recommendation}</p>
                              </div>
                            ))}
                          </>
                        ) : (
                          <p className="text-muted-foreground text-sm">Generate insights to see analysis</p>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="support">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid gap-4 md:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60 group">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-primary" />
                        Local Emergency Resources
                      </CardTitle>
                      <CardDescription>
                        {loading ? "Detecting your location..." : 
                         location ? `Resources for ${location.city}, ${location.state || location.country}` :
                         "Location access required for local resources"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {location && (
                        <>
                          <div className="p-4 bg-muted rounded-lg">
                            <h3 className="font-semibold flex items-center gap-2 mb-2">
                              <Phone className="w-4 h-4" />
                              Emergency Number
                            </h3>
                            <p className="text-2xl font-bold text-primary">{getEmergencyNumber(location.country)}</p>
                            <p className="text-sm text-muted-foreground mt-1">For immediate emergency assistance</p>
                          </div>
                          <div className="p-4 bg-muted rounded-lg">
                            <h3 className="font-semibold flex items-center gap-2 mb-2">
                              <Heart className="w-4 h-4" />
                              Crisis Hotline
                            </h3>
                            <p className="text-2xl font-bold text-primary">{getCrisisHotline(location.country)}</p>
                            <p className="text-sm text-muted-foreground mt-1">24/7 Mental health crisis support</p>
                          </div>
                        </>
                      )}
                      {!location && !loading && (
                        <Button onClick={getUserLocation} variant="outline" className="w-full">
                          <MapPin className="w-4 h-4 mr-2" />
                          Enable Location Access
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60 group">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Globe className="w-5 h-5 text-primary" />
                        Global Resources
                      </CardTitle>
                      <CardDescription>
                        International mental health support services
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 bg-muted rounded-lg">
                        <h3 className="font-semibold flex items-center gap-2 mb-2">
                          <Clock className="w-4 h-4" />
                          24/7 Online Support
                        </h3>
                        <ul className="space-y-2">
                          <li>
                            <a href="https://www.7cups.com" target="_blank" rel="noopener noreferrer" 
                               className="text-primary hover:underline">7 Cups - Online Therapy</a>
                          </li>
                          <li>
                            <a href="https://www.betterhelp.com" target="_blank" rel="noopener noreferrer"
                               className="text-primary hover:underline">BetterHelp - Professional Counseling</a>
                          </li>
                          <li>
                            <a href="https://www.crisistextline.org" target="_blank" rel="noopener noreferrer"
                               className="text-primary hover:underline">Crisis Text Line - Text Support</a>
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          </TabsContent>
        </AnimatePresence>
      </Tabs>
    </div>
  );
} 