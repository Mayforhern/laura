import { db } from "./dbConfig";
import {
  users,
  therapySessions,
  deviceSettings,
  healthMetrics,
  userPreferences,
  chatHistory,
  wearableDevices,
  activities,
  wearableMetrics,
} from "./schema";
import { eq, and, gte, desc, sql } from "drizzle-orm";

export async function createUser(userData: {
  id: string;
  email: string;
  name: string;
  encryptedData: any;
  walletId: string;
  walletAddress: string;
}) {
  return await db.insert(users).values(userData).returning();
}

export async function updateUserPreferences(
  userId: string,
  preferences: Partial<typeof userPreferences.$inferInsert>
) {
  return await db
    .update(userPreferences)
    .set(preferences)
    .where(eq(userPreferences.userId, userId))
    .returning();
}

export async function logHealthMetric(
  userId: string,
  metricType: string,
  value: any
) {
  return await db.insert(healthMetrics).values({
    userId,
    metricType,
    value,
  });
}

export async function scheduleTherapySession(
  userId: string,
  scheduledTime: Date
) {
  return await db.insert(therapySessions).values({
    userId,
    scheduledTime,
    type: "text",
    status: "scheduled",
  });
}

export async function updateDeviceSettings(
  userId: string,
  deviceType: string,
  settings: any
) {
  return await db.insert(deviceSettings).values({
    userId,
    deviceType,
    settings,
  });
}

// Chat History Actions
export async function saveChatMessage({
  userId,
  message,
  role,
  context,
}: {
  userId: string;
  message: string;
  role: "user" | "assistant";
  context?: any;
}) {
  try {
    return await db
      .insert(chatHistory)
      .values({
        userId,
        message,
        role,
        context,
      })
      .returning();
  } catch (error) {
    console.error("Error saving chat message:", error);
    throw error;
  }
}

export async function getChatHistory(userId: string) {
  return await db
    .select()
    .from(chatHistory)
    .where(eq(chatHistory.userId, userId))
    .orderBy(chatHistory.timestamp);
}

// Wearable Device Actions
export async function connectWearableDevice({
  userId,
  deviceType,
  deviceId,
  accessToken,
  refreshToken,
}: {
  userId: string;
  deviceType: string;
  deviceId: string;
  accessToken: string;
  refreshToken: string;
}) {
  return await db
    .insert(wearableDevices)
    .values({
      userId,
      deviceType,
      deviceId,
      accessToken,
      refreshToken,
    })
    .returning();
}

// Activity Management
export async function createActivity({
  userId,
  type,
  name,
  description,
  duration,
  moodScore,
  moodNote,
}: {
  userId: string;
  type: string;
  name: string;
  description?: string;
  duration?: number;
  moodScore?: number;
  moodNote?: string;
}) {
  try {
    return await db.insert(activities).values({
      userId,
      type,
      name,
      description,
      duration,
      moodScore,
      moodNote,
      timestamp: new Date(),
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error("Error creating activity:", error);
    throw error;
  }
}

export async function updateActivityStatus({
  activityId,
  status,
  completedAt,
}: {
  activityId: string;
  status: string;
  completedAt?: Date;
}) {
  return await db
    .update(activities)
    .set({ status, completedAt })
    .where(eq(activities.id, activityId))
    .returning();
}

export async function getTodaysActivities(userId: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return await db
    .select()
    .from(activities)
    .where(
      and(eq(activities.userId, userId), gte(activities.scheduledFor, today))
    )
    .orderBy(activities.scheduledFor);
}

export async function getLatestHealthMetrics(userId: string) {
  return await db
    .select()
    .from(wearableMetrics)
    .where(eq(wearableMetrics.userId, userId))
    .orderBy(desc(wearableMetrics.timestamp))
    .limit(1)
    .then((results) => results[0] || null);
}

export async function getAllTherapySessions(userId: string) {
  try {
    console.log("Getting sessions for userId:", userId);
    const sessions = await db
      .select({
        id: therapySessions.id,
        userId: therapySessions.userId,
        type: therapySessions.type,
        status: therapySessions.status,
        scheduledTime: therapySessions.scheduledTime,
        summary: therapySessions.summary,
        // Only select title if it exists
        // title: therapySessions.title,
      })
      .from(therapySessions)
      .where(eq(therapySessions.userId, userId))
      .orderBy(desc(therapySessions.scheduledTime));

    console.log("Found sessions:", sessions);
    return sessions;
  } catch (error) {
    console.error("Error getting therapy sessions:", error);
    throw error;
  }
}

export async function createTherapySession({
  userId,
  type,
}: {
  userId: string;
  type: string;
}) {
  try {
    const session = await db
      .insert(therapySessions)
      .values({
        userId,
        type,
        status: "in_progress",
        scheduledTime: new Date(),
        // Add initial title
        title: `New Session - ${new Date().toLocaleString()}`,
      })
      .returning();

    return session;
  } catch (error) {
    console.error("Failed to create therapy session:", error);
    throw error;
  }
}

export async function updateTherapySession(
  sessionId: string,
  data: {
    title?: string;
    summary?: string;
    status?: string;
  }
) {
  try {
    const session = await db
      .update(therapySessions)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(therapySessions.id, sessionId))
      .returning();

    return session;
  } catch (error) {
    console.error("Failed to update therapy session:", error);
    throw error;
  }
}

export async function getSessionChatHistory(sessionId: string) {
  try {
    return await db
      .select()
      .from(chatHistory)
      .where(sql`${chatHistory.context}->>'sessionId' = ${sessionId}`)
      .orderBy(chatHistory.timestamp);
  } catch (error) {
    console.error("Error getting session chat history:", error);
    throw error;
  }
}

export async function getUserActivities(userId: string, days: number = 7) {
  try {
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - days);

    return await db
      .select()
      .from(activities)
      .where(
        and(eq(activities.userId, userId), gte(activities.timestamp, daysAgo))
      )
      .orderBy(desc(activities.timestamp));
  } catch (error) {
    console.error("Error getting user activities:", error);
    throw error;
  }
}

// Add this function to save mood data
export async function saveMoodData({
  userId,
  mood,
  note,
}: {
  userId: string;
  mood: number;
  note: string;
}) {
  return await db.insert(activities).values({
    userId,
    type: "mood",
    name: "Mood Entry",
    description: note,
    moodScore: mood,
    moodNote: note,
    timestamp: new Date(),
    completed: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}

export async function logActivity(data: {
  userId: string;
  type: string;
  name: string;
  description: string | null;
  completed: boolean;
  duration: number | null;
  moodScore: number | null;
  moodNote: string | null;
}) {
  // Your database insertion logic here
  // This should insert the activity into your database
  // Return the created activity
}

// Get connected devices for a user
export async function getConnectedDevices(userId: string) {
  try {
    const devices = await db
      .select({
        id: wearableDevices.id,
        deviceType: wearableDevices.deviceType,
        deviceId: wearableDevices.deviceId,
        lastSynced: wearableDevices.lastSynced,
        settings: wearableDevices.settings,
      })
      .from(wearableDevices)
      .where(eq(wearableDevices.userId, userId));

    // Get the latest metrics for each device
    const devicesWithMetrics = await Promise.all(
      devices.map(async (device) => {
        const latestMetrics = await db
          .select()
          .from(wearableMetrics)
          .where(eq(wearableMetrics.deviceId, device.id))
          .orderBy(desc(wearableMetrics.timestamp))
          .limit(1);

        return {
          ...device,
          metrics: latestMetrics[0]?.value || null,
          status: device.lastSynced && 
            new Date().getTime() - new Date(device.lastSynced).getTime() < 24 * 60 * 60 * 1000 
            ? "connected" 
            : "disconnected"
        };
      })
    );

    return devicesWithMetrics;
  } catch (error) {
    console.error("Error getting connected devices:", error);
    throw error;
  }
}
