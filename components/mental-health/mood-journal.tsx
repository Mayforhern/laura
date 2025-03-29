"use client";

import React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Sun, Cloud, CloudRain, CloudLightning } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

interface MoodEntry {
  id: string;
  moodScore: number;
  description: string;
  moodNote: string;
  createdAt: string;
}

interface MoodJournalProps {
  onSave: (entry: MoodEntry) => void;
  entries: MoodEntry[];
}

export function MoodJournal({ onSave, entries }: MoodJournalProps) {
  const [moodScore, setMoodScore] = useState(50);
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const moodIcons = {
    excellent: Sun,
    good: Cloud,
    fair: CloudRain,
    poor: CloudLightning,
  };

  const getMoodCategory = (value: number) => {
    if (value >= 75) return "excellent";
    if (value >= 50) return "good";
    if (value >= 25) return "fair";
    return "poor";
  };

  const moodCategory = getMoodCategory(moodScore);
  const MoodIcon = moodIcons[moodCategory as keyof typeof moodIcons];

  const moodTags = ["Happy", "Sad", "Anxious", "Energetic", "Tired", "Stressed"];

  const handleSave = async () => {
    if (!description.trim()) {
      toast({
        title: "Error",
        description: "Please write something about your mood",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      onSave({
        id: "",
        moodScore,
        description: description.trim(),
        moodNote: selectedTags.join(", "),
        createdAt: new Date().toISOString(),
      });

      setDescription("");
      setSelectedTags([]);
      setMoodScore(50);
      
      toast({
        title: "Success",
        description: "Entry saved",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>How are you feeling today?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <MoodIcon className="w-8 h-8" />
            <Slider
              value={[moodScore]}
              onValueChange={([value]) => setMoodScore(value)}
              max={100}
              step={1}
              className="flex-1"
            />
          </div>
          <Textarea
            placeholder="Write about your mood..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[100px]"
          />
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Add mood tags
            </label>
            <div className="flex flex-wrap gap-2">
              {moodTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/90"
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <Button
            onClick={handleSave}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Saving..." : "Save Entry"}
          </Button>
        </CardContent>
      </Card>

      {entries.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-start justify-between p-4 border rounded-lg"
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      {React.createElement(moodIcons[getMoodCategory(entry.moodScore) as keyof typeof moodIcons], {
                        className: "w-5 h-5"
                      })}
                      <span className="font-medium">
                        {getMoodCategory(entry.moodScore)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {entry.description}
                    </p>
                    {entry.moodNote && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {entry.moodNote.split(", ").map((tag, i) => (
                          <Badge
                            key={i}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {new Date(entry.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 