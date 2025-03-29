import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { forums, forumMembers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { PrivyClient } from "@privy-io/server-auth";

const privy = new PrivyClient(
  process.env.NEXT_PUBLIC_PRIVY_APP_ID!,
  process.env.PRIVY_APP_SECRET!
);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const forumId = searchParams.get("id");

    if (forumId) {
      const forum = await db.query.forums.findFirst({
        where: eq(forums.id, forumId),
      });

      if (!forum) {
        return NextResponse.json({ error: "Forum not found" }, { status: 404 });
      }

      return NextResponse.json(forum);
    }

    const allForums = await db.query.forums.findMany();
    return NextResponse.json(allForums);
  } catch (error) {
    console.error("Error fetching forums:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const verifiedClaims = await privy.verifyAuthToken(token);
    const userId = verifiedClaims.userId;

    if (!userId) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const body = await request.json();
    const { name, description, icon, isPrivate, topics } = body;

    const forum = await db.insert(forums).values({
      id: crypto.randomUUID(),
      name,
      description,
      icon,
      isPrivate,
      topics,
    }).returning();

    // Add the creator as an admin member
    await db.insert(forumMembers).values({
      id: crypto.randomUUID(),
      forumId: forum[0].id,
      userId,
      role: "admin",
    });

    return NextResponse.json(forum[0]);
  } catch (error) {
    console.error("Error creating forum:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const verifiedClaims = await privy.verifyAuthToken(token);
    const userId = verifiedClaims.userId;

    if (!userId) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const body = await request.json();
    const { id, name, description, icon, isPrivate, topics } = body;

    // Check if user is admin of the forum
    const member = await db.query.forumMembers.findFirst({
      where: eq(forumMembers.forumId, id) && eq(forumMembers.userId, userId),
    });

    if (!member || member.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const forum = await db.update(forums)
      .set({
        name,
        description,
        icon,
        isPrivate,
        topics,
        updatedAt: new Date(),
      })
      .where(eq(forums.id, id))
      .returning();

    return NextResponse.json(forum[0]);
  } catch (error) {
    console.error("Error updating forum:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer", "");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const verifiedClaims = await privy.verifyAuthToken(token);
    const userId = verifiedClaims.userId;

    if (!userId) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const forumId = searchParams.get("id");

    if (!forumId) {
      return NextResponse.json({ error: "Forum ID is required" }, { status: 400 });
    }

    // Check if user is admin of the forum
    const member = await db.query.forumMembers.findFirst({
      where: eq(forumMembers.forumId, forumId) && eq(forumMembers.userId, userId),
    });

    if (!member || member.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await db.delete(forums).where(eq(forums.id, forumId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting forum:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 