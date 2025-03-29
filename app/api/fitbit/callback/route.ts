import { NextResponse } from "next/server";
import { connectWearableDevice } from "@/lib/db/actions";
import { PrivyClient } from "@privy-io/server-auth";

const privy = new PrivyClient(
  process.env.NEXT_PUBLIC_PRIVY_APP_ID!,
  process.env.PRIVY_APP_SECRET!
);

export async function GET(request: Request) {
  try {
    // Get the auth token from the Authorization header or cookie
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "") || 
                 request.headers.get("cookie")?.match(/(?<=privy_auth_token=)[^;]*/)?.[0];

    if (!token) {
      console.log("No auth token found");
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Verify the token
    const verifiedClaims = await privy.verifyAuthToken(token);
    const userId = verifiedClaims.userId;

    if (!userId) {
      console.log("Invalid auth token");
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      console.error("Fitbit OAuth error:", error);
      return NextResponse.redirect(new URL("/dashboard?error=fitbit_connection_failed", request.url));
    }

    if (!code) {
      return NextResponse.redirect(new URL("/dashboard?error=no_code", request.url));
    }

    // Exchange code for tokens
    const tokenResponse = await fetch("https://api.fitbit.com/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${process.env.NEXT_PUBLIC_FITBIT_CLIENT_ID}:${process.env.FITBIT_CLIENT_SECRET}`
        ).toString("base64")}`,
      },
      body: new URLSearchParams({
        code,
        grant_type: "authorization_code",
        redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/fitbit/callback`,
      }),
    });

    if (!tokenResponse.ok) {
      console.error("Failed to exchange code for tokens:", await tokenResponse.text());
      return NextResponse.redirect(new URL("/dashboard?error=token_exchange_failed", request.url));
    }

    const tokens = await tokenResponse.json();
    const { access_token, refresh_token } = tokens;

    // Get user profile to get device ID
    const profileResponse = await fetch("https://api.fitbit.com/1/user/-/profile.json", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!profileResponse.ok) {
      console.error("Failed to get user profile:", await profileResponse.text());
      return NextResponse.redirect(new URL("/dashboard?error=profile_fetch_failed", request.url));
    }

    const profile = await profileResponse.json();
    const deviceId = profile.user.encodedId;

    // Save device connection
    await connectWearableDevice({
      userId,
      deviceType: "fitbit",
      deviceId,
      accessToken: access_token,
      refreshToken: refresh_token,
    });

    return NextResponse.redirect(new URL("/dashboard?success=fitbit_connected", request.url));
  } catch (error) {
    console.error("Error in Fitbit callback:", error);
    return NextResponse.redirect(new URL("/dashboard?error=unknown_error", request.url));
  }
} 