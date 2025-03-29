import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { posts, comments, postLikes, forumMembers } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { PrivyClient } from "@privy-io/server-auth";

const privy = new PrivyClient(
  process.env.NEXT_PUBLIC_PRIVY_APP_ID!,
  process.env.PRIVY_APP_SECRET!
);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const forumId = searchParams.get("forumId");
    const topic = searchParams.get("topic");
    const postId = searchParams.get("id");

    if (postId) {
      const post = await db.query.posts.findFirst({
        where: eq(posts.id, postId),
      });

      if (!post) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
      }

      return NextResponse.json(post);
    }

    const allPosts = await db.query.posts.findMany({
      where: and(
        forumId ? eq(posts.forumId, forumId) : undefined,
        topic ? eq(posts.topic, topic) : undefined
      ),
    });

    return NextResponse.json(allPosts);
  } catch (error) {
    console.error("Error fetching posts:", error);
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
    const { forumId, title, content, topic, tags, isPrivate } = body;

    // Check if user is a member of the forum
    const member = await db.query.forumMembers.findFirst({
      where: and(
        eq(forumMembers.forumId, forumId),
        eq(forumMembers.userId, userId)
      ),
    });

    if (!member) {
      return NextResponse.json({ error: "Not a member of this forum" }, { status: 403 });
    }

    const post = await db.insert(posts).values({
      id: crypto.randomUUID(),
      forumId,
      userId,
      title,
      content,
      topic,
      tags,
      isPrivate,
    }).returning();

    return NextResponse.json(post[0]);
  } catch (error) {
    console.error("Error creating post:", error);
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
    const { id, title, content, topic, tags, isPrivate } = body;

    const post = await db.query.posts.findFirst({
      where: eq(posts.id, id),
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    if (post.userId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const updatedPost = await db.update(posts)
      .set({
        title,
        content,
        topic,
        tags,
        isPrivate,
        updatedAt: new Date(),
      })
      .where(eq(posts.id, id))
      .returning();

    return NextResponse.json(updatedPost[0]);
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
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

    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("id");

    if (!postId) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
    }

    const post = await db.query.posts.findFirst({
      where: eq(posts.id, postId),
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    if (post.userId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await db.delete(posts).where(eq(posts.id, postId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 