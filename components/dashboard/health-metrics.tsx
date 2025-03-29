"use client";

import { useEffect, useState } from "react";
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
} from "chart.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface HealthMetricsProps {
  userId: string;
}

export function HealthMetrics({ userId }: HealthMetricsProps) {
  const [loading, setLoading] = useState(true);
  const [heartRateData, setHeartRateData] = useState<any>(null);
  const [sleepData, setSleepData] = useState<any>(null);
  const [stepsData, setStepsData] = useState<any>(null);

  useEffect(() => {
    const fetchHealthData = async () => {
      try {
        // Fetch heart rate data
        const heartRateResponse = await fetch(`/api/health/heart-rate?userId=${userId}`);
        const heartRate = await heartRateResponse.json();

        // Fetch sleep data
        const sleepResponse = await fetch(`/api/health/sleep?userId=${userId}`);
        const sleep = await sleepResponse.json();

        // Fetch steps data
        const stepsResponse = await fetch(`/api/health/steps?userId=${userId}`);
        const steps = await stepsResponse.json();

        setHeartRateData({
          labels: heartRate.map((d: any) => new Date(d.timestamp).toLocaleDateString()),
          datasets: [{
            label: 'Heart Rate (BPM)',
            data: heartRate.map((d: any) => d.value),
            borderColor: 'rgb(255, 99, 132)',
            tension: 0.1
          }]
        });

        setSleepData({
          labels: sleep.map((d: any) => new Date(d.timestamp).toLocaleDateString()),
          datasets: [{
            label: 'Sleep Duration (hours)',
            data: sleep.map((d: any) => d.duration / 3600000), // Convert ms to hours
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        });

        setStepsData({
          labels: steps.map((d: any) => new Date(d.timestamp).toLocaleDateString()),
          datasets: [{
            label: 'Steps',
            data: steps.map((d: any) => d.value),
            borderColor: 'rgb(153, 102, 255)',
            tension: 0.1
          }]
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching health data:", error);
        setLoading(false);
      }
    };

    fetchHealthData();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Health Dashboard</h2>
      <Tabs defaultValue="heart-rate" className="w-full">
        <TabsList>
          <TabsTrigger value="heart-rate">Heart Rate</TabsTrigger>
          <TabsTrigger value="sleep">Sleep</TabsTrigger>
          <TabsTrigger value="steps">Steps</TabsTrigger>
        </TabsList>

        <TabsContent value="heart-rate">
          <Card>
            <CardHeader>
              <CardTitle>Heart Rate Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              {heartRateData && <Line data={heartRateData} />}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sleep">
          <Card>
            <CardHeader>
              <CardTitle>Sleep Duration</CardTitle>
            </CardHeader>
            <CardContent>
              {sleepData && <Line data={sleepData} />}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="steps">
          <Card>
            <CardHeader>
              <CardTitle>Daily Steps</CardTitle>
            </CardHeader>
            <CardContent>
              {stepsData && <Line data={stepsData} />}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 