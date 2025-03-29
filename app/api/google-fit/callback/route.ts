import { NextResponse } from "next/server";
import { connectWearableDevice } from "@/lib/db/actions";
import { PrivyClient } from "@privy-io/server-auth";

const privy = new PrivyClient(
  process.env.NEXT_PUBLIC_PRIVY_APP_ID!,
  process.env.PRIVY_APP_SECRET!
);

export async function GET(request: Request) {
  console.log("Google Fit callback received");
  
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const error = searchParams.get("error");
    const state = searchParams.get("state");

    console.log("Search params:", {
      code: code ? "present" : "missing",
      error,
      state: state ? "present" : "missing"
    });

    if (error) {
      console.error("Google Fit OAuth error:", error);
      return NextResponse.redirect(new URL("/dashboard?error=google_fit_connection_failed&details=" + error, request.url));
    }

    if (!code) {
      return NextResponse.redirect(new URL("/dashboard?error=no_code", request.url));
    }

    if (!state) {
      return NextResponse.redirect(new URL("/dashboard?error=no_state", request.url));
    }

    // Parse the state parameter to get the Privy token
    let token;
    try {
      const stateData = JSON.parse(state);
      token = stateData.token;
    } catch (e) {
      console.error("Failed to parse state:", e);
      return NextResponse.redirect(new URL("/dashboard?error=invalid_state", request.url));
    }

    if (!token) {
      console.log("No auth token found in state");
      return NextResponse.redirect(new URL("/dashboard?error=no_auth_token_in_state", request.url));
    }

    // Verify the token
    const verifiedClaims = await privy.verifyAuthToken(token);
    const userId = verifiedClaims.userId;
    console.log("User ID from token:", userId);

    if (!userId) {
      console.log("Invalid auth token, redirecting to dashboard");
      return NextResponse.redirect(new URL("/dashboard?error=invalid_auth_token", request.url));
    }

    // Exchange code for tokens
    console.log("Exchanging code for tokens...");
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/google-fit/callback`,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error("Failed to exchange code for tokens:", errorText);
      return NextResponse.redirect(new URL("/dashboard?error=token_exchange_failed&details=" + encodeURIComponent(errorText), request.url));
    }

    const tokens = await tokenResponse.json();
    console.log("Received tokens:", {
      access_token: tokens.access_token ? "present" : "missing",
      refresh_token: tokens.refresh_token ? "present" : "missing"
    });

    const { access_token, refresh_token } = tokens;

    // Get user's data sources to verify connection
    console.log("Fetching data sources...");
    const dataSourcesResponse = await fetch("https://www.googleapis.com/fitness/v1/users/me/dataSources", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!dataSourcesResponse.ok) {
      const errorText = await dataSourcesResponse.text();
      console.error("Failed to get data sources:", errorText);
      return NextResponse.redirect(new URL("/dashboard?error=data_sources_fetch_failed&details=" + encodeURIComponent(errorText), request.url));
    }

    const dataSources = await dataSourcesResponse.json();
    const deviceId = dataSources.dataSource?.[0]?.dataStreamId || `google-fit-${userId}`;
    console.log("Device ID:", deviceId);

    // Save device connection
    console.log("Saving device connection...");
    await connectWearableDevice({
      userId,
      deviceType: "google_fit",
      deviceId,
      accessToken: access_token,
      refreshToken: refresh_token,
    });

    console.log("Connection successful, redirecting to dashboard");
    return NextResponse.redirect(new URL("/dashboard?success=google_fit_connected", request.url));
  } catch (error) {
    console.error("Error in Google Fit callback:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.redirect(new URL("/dashboard?error=unknown_error&details=" + encodeURIComponent(errorMessage), request.url));
  }
} 