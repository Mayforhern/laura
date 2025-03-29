import { NextResponse } from "next/server";
import { db } from "@/lib/db/dbConfig";
import { wearableDevices } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Get the user's Fitbit device info
    const device = await db.query.wearableDevices.findFirst({
      where: eq(wearableDevices.userId, userId),
    });

    if (!device || device.deviceType !== "fitbit") {
      return NextResponse.json({ error: "Fitbit device not found" }, { status: 404 });
    }

    // Get heart rate data from Fitbit
    const today = new Date();
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const response = await fetch(
      `https://api.fitbit.com/1/user/-/activities/heart/date/${sevenDaysAgo.toISOString().split('T')[0]}/${today.toISOString().split('T')[0]}.json`,
      {
        headers: {
          Authorization: `Bearer ${device.accessToken}`,
        },
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        // Token expired - implement refresh token logic here
        return NextResponse.json({ error: "Token expired" }, { status: 401 });
      }
      return NextResponse.json({ error: "Failed to fetch heart rate data" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data["activities-heart"]);
  } catch (error) {
    console.error("Error fetching heart rate data:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 