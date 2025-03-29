import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SmilePlus, Frown, Meh, Smile } from "lucide-react";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface MoodEntry {
  id: string;
  score: number;
  description: string;
  tags?: string[];
  createdAt: string;
}

interface MoodHistoryProps {
  entries: MoodEntry[];
}

const getMoodIcon = (score: number) => {
  if (score >= 75) return <SmilePlus className="w-5 h-5 text-green-500" />;
  if (score >= 50) return <Smile className="w-5 h-5 text-blue-500" />;
  if (score >= 25) return <Meh className="w-5 h-5 text-yellow-500" />;
  return <Frown className="w-5 h-5 text-red-500" />;
};

const getMoodColor = (score: number) => {
  if (score >= 75) return "rgb(34, 197, 94)";
  if (score >= 50) return "rgb(59, 130, 246)";
  if (score >= 25) return "rgb(234, 179, 8)";
  return "rgb(239, 68, 68)";
};

export function MoodHistory({ entries = [] }: MoodHistoryProps) {
  // Sort entries by date
  const sortedEntries = [...entries].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // Prepare data for the chart
  const chartData = {
    labels: sortedEntries.map((entry) =>
      format(new Date(entry.createdAt), "MMM d")
    ).reverse(),
    datasets: [
      {
        label: "Mood Score",
        data: sortedEntries.map((entry) => entry.score).reverse(),
        fill: true,
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        pointBackgroundColor: sortedEntries
          .map((entry) => getMoodColor(entry.score))
          .reverse(),
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `Mood: ${context.raw}/100`,
        },
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        grid: {
          display: true,
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Mood History</CardTitle>
        <CardDescription>Track your emotional journey over time</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="graph" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="graph">Graph View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="graph" className="space-y-4">
            <div className="h-[300px] w-full">
              <Line data={chartData} options={chartOptions} />
            </div>
          </TabsContent>

          <TabsContent value="list">
            <ScrollArea className="h-[400px] w-full pr-4">
              <div className="space-y-4">
                {sortedEntries.map((entry) => (
                  <Card key={entry.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {getMoodIcon(entry.score)}
                          <span className="font-medium">
                            Score: {entry.score}/100
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(entry.createdAt), "PPp")}
                        </p>
                      </div>
                    </div>
                    <p className="mt-2 text-sm">{entry.description}</p>
                    {entry.tags && entry.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {entry.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>

        {entries.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Meh className="h-12 w-12 text-muted-foreground mb-2" />
            <h3 className="font-medium">No mood entries yet</h3>
            <p className="text-sm text-muted-foreground">
              Start tracking your mood to see your history here
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 