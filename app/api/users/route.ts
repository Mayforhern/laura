import { NextResponse } from "next/server";
import { db } from "@/lib/db/dbConfig";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { name, email, walletId } = await req.json();

    // Validate input
    if (!walletId) {
      return NextResponse.json(
        { error: "Wallet ID is required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.walletId, walletId));

    if (existingUser.length > 0) {
      return NextResponse.json({ success: true, user: existingUser[0] });
    }

    // Create new user if not exists
    const user = await db.insert(users).values({
      id: crypto.randomUUID(),
      name: name || null,
      email: email || null,
      walletId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Error handling user:", error);
    return NextResponse.json(
      { error: "Failed to handle user request" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const walletId = searchParams.get("walletId");

    if (!walletId) {
      return NextResponse.json(
        { error: "Wallet ID is required" },
        { status: 400 }
      );
    }

    const user = await db
      .select()
      .from(users)
      .where(eq(users.walletId, walletId));

    if (user.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, user: user[0] });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
