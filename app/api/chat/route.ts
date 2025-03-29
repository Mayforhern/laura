import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { chatMessages, chatRooms, chatRoomMembers } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { PrivyClient } from "@privy-io/server-auth";

const privy = new PrivyClient(
  process.env.NEXT_PUBLIC_PRIVY_APP_ID!,
  process.env.PRIVY_APP_SECRET!
);

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const verifiedClaims = await privy.verifyAuthToken(token);
    const userId = verifiedClaims.userId;

    if (!userId) {
      return NextResponse.json(
        { error: "Invalid authentication" },
        { status: 401 }
      );
    }

    const { roomId, content } = await request.json();

    if (!roomId || !content) {
      return NextResponse.json(
        { error: "Room ID and message content are required" },
        { status: 400 }
      );
    }

    // Check if user is a member of the room
    const membership = await db.query.chatRoomMembers.findFirst({
      where: and(
        eq(chatRoomMembers.userId, userId),
        eq(chatRoomMembers.roomId, roomId)
      ),
    });

    if (!membership) {
      return NextResponse.json(
        { error: "You must be a member of this room to send messages" },
        { status: 403 }
      );
    }

    // Send message
    const message = await db.insert(chatMessages).values({
      id: crypto.randomUUID(),
      roomId,
      userId,
      content,
    }).returning();

    // Update user's last seen time
    await db
      .update(chatRoomMembers)
      .set({ lastSeen: new Date() })
      .where(and(
        eq(chatRoomMembers.userId, userId),
        eq(chatRoomMembers.roomId, roomId)
      ));

    return NextResponse.json(message[0]);
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const roomId = searchParams.get("roomId");

    if (!roomId) {
      return NextResponse.json(
        { error: "Room ID is required" },
        { status: 400 }
      );
    }

    const chatHistory = await db.query.chatMessages.findMany({
      where: eq(chatMessages.roomId, roomId),
      orderBy: (messages, { asc }) => [asc(messages.createdAt)],
      limit: 50,
    });

    return NextResponse.json(chatHistory);
  } catch (error) {
    console.error("Error fetching chat messages:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
