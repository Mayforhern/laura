import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { chatRooms, chatRoomMembers } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { PrivyClient } from "@privy-io/server-auth";

const privy = new PrivyClient(
  process.env.NEXT_PUBLIC_PRIVY_APP_ID!,
  process.env.PRIVY_APP_SECRET!
);

// Get all chat rooms or a specific room
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const roomId = searchParams.get("roomId");

    if (roomId) {
      const room = await db.query.chatRooms.findFirst({
        where: eq(chatRooms.id, roomId),
      });

      if (!room) {
        return NextResponse.json(
          { error: "Room not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(room);
    }

    const rooms = await db.query.chatRooms.findMany({
      orderBy: (rooms, { desc }) => [desc(rooms.memberCount)],
    });

    return NextResponse.json(rooms);
  } catch (error) {
    console.error("Error fetching chat rooms:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Create a new chat room
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

    const { name, description, icon, isPrivate } = await request.json();

    if (!name || !description || !icon) {
      return NextResponse.json(
        { error: "Name, description, and icon are required" },
        { status: 400 }
      );
    }

    const room = await db.insert(chatRooms).values({
      id: crypto.randomUUID(),
      name,
      description,
      icon,
      isPrivate: isPrivate || false,
      memberCount: 1,
    }).returning();

    // Add creator as admin member
    await db.insert(chatRoomMembers).values({
      id: crypto.randomUUID(),
      roomId: room[0].id,
      userId,
      role: "admin",
    });

    return NextResponse.json(room[0]);
  } catch (error) {
    console.error("Error creating chat room:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Join a chat room
export async function PUT(request: Request) {
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

    const { roomId } = await request.json();

    if (!roomId) {
      return NextResponse.json(
        { error: "Room ID is required" },
        { status: 400 }
      );
    }

    // Check if room exists
    const room = await db.query.chatRooms.findFirst({
      where: eq(chatRooms.id, roomId),
    });

    if (!room) {
      return NextResponse.json(
        { error: "Room not found" },
        { status: 404 }
      );
    }

    // Check if user is already a member
    const existingMember = await db.query.chatRoomMembers.findFirst({
      where: and(
        eq(chatRoomMembers.userId, userId),
        eq(chatRoomMembers.roomId, roomId)
      ),
    });

    if (existingMember) {
      return NextResponse.json(
        { error: "Already a member of this room" },
        { status: 400 }
      );
    }

    // Add user as member
    await db.insert(chatRoomMembers).values({
      id: crypto.randomUUID(),
      roomId,
      userId,
      role: "member",
    });

    // Increment member count
    await db
      .update(chatRooms)
      .set({ memberCount: room.memberCount + 1 })
      .where(eq(chatRooms.id, roomId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error joining chat room:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 