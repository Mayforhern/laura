import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini only if API key is available
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error("Gemini API key not configured");
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

interface HealthData {
  heartRate?: {
    average: number;
    max: number;
    min: number;
  };
  sleep?: {
    duration: number;
    efficiency: number;
    stages?: {
      deep: number;
      light: number;
      rem: number;
    };
  };
  steps?: number;
  mood?: number;
  activities?: Array<{
    type: string;
    duration?: number;
    completed?: boolean;
    timestamp?: string;
    score?: number;
    note?: string;
  }>;
}

export async function generateHealthInsights(data: HealthData) {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-pro",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      }
    });

    const prompt = `
      As a wellness AI assistant, analyze this health data and provide 3 key insights and recommendations:
      
      Health Data:
      ${JSON.stringify(data, null, 2)}
      
      Please format your response as a JSON array with this structure:
      [
        {
          "title": "Short insight title",
          "description": "Detailed explanation and recommendation",
          "priority": "high/medium/low",
          "category": "sleep/activity/mood/heart-rate"
        }
      ]
      
      Focus on actionable insights that can help improve the user's well-being.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      const parsed = JSON.parse(text);
      if (!Array.isArray(parsed)) {
        throw new Error("Unable to generate health insights at this time");
      }
      return parsed;
    } catch (parseError: any) {
      throw new Error("Unable to generate health insights at this time");
    }
  } catch (error: any) {
    throw new Error("Unable to generate health insights at this time");
  }
}

export async function generateMoodRecommendations(currentMood: number, recentActivities: any[]) {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-pro",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      }
    });

    const prompt = `
      As a wellness AI assistant, provide 3 personalized recommendations based on the user's current mood (${currentMood}/100) 
      and recent activities: ${JSON.stringify(recentActivities)}
      
      Please format your response as a JSON array with this structure:
      [
        {
          "title": "Short recommendation title",
          "description": "Detailed explanation of the recommendation",
          "type": "meditation/exercise/social/creative",
          "duration": "estimated time in minutes"
        }
      ]
      
      Focus on practical, mood-improving activities.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      const parsed = JSON.parse(text);
      if (!Array.isArray(parsed)) {
        throw new Error("Unable to generate mood recommendations at this time");
      }
      return parsed;
    } catch (parseError: any) {
      throw new Error("Unable to generate mood recommendations at this time");
    }
  } catch (error: any) {
    throw new Error("Unable to generate mood recommendations at this time");
  }
}

export async function analyzeSleepPattern(sleepData: any[]) {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-pro",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      }
    });

    const prompt = `
      Analyze this sleep data and provide insights about sleep patterns and quality:
      ${JSON.stringify(sleepData)}
      
      Please format your response as a JSON object with this structure:
      {
        "quality": "good/fair/poor",
        "insights": [
          {
            "title": "Short insight title",
            "description": "Detailed explanation",
            "recommendation": "Specific improvement suggestion"
          }
        ],
        "recommendations": {
          "bedtime": "suggested bedtime",
          "wakeTime": "suggested wake time",
          "improvements": ["list of specific improvements"]
        }
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      const parsed = JSON.parse(text);
      if (typeof parsed !== 'object' || !parsed.quality || !parsed.insights) {
        throw new Error("Unable to analyze sleep patterns at this time");
      }
      return parsed;
    } catch (parseError: any) {
      throw new Error("Unable to analyze sleep patterns at this time");
    }
  } catch (error: any) {
    throw new Error("Unable to analyze sleep patterns at this time");
  }
}

export async function generateExercisePlan(userProfile: any, fitnessGoals: string[]) {
  try {
    if (!genAI) {
      console.warn("Gemini API key not configured, skipping exercise plan generation");
      return null;
    }

    const model = genAI!.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      Create a personalized exercise plan based on this user profile and fitness goals:
      Profile: ${JSON.stringify(userProfile)}
      Goals: ${JSON.stringify(fitnessGoals)}
      
      Please format your response as a JSON object with this structure:
      {
        "weeklyPlan": [
          {
            "day": "Monday",
            "exercises": [
              {
                "name": "exercise name",
                "sets": number,
                "reps": number,
                "duration": "time in minutes",
                "intensity": "low/medium/high",
                "notes": "form tips or modifications"
              }
            ],
            "totalDuration": "time in minutes",
            "focusArea": "cardio/strength/flexibility"
          }
        ],
        "recommendations": {
          "warmup": ["warmup exercises"],
          "cooldown": ["cooldown exercises"],
          "nutrition": ["nutrition tips"],
          "hydration": "daily water intake recommendation"
        }
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Error generating exercise plan:", error);
    return null;
  }
} 