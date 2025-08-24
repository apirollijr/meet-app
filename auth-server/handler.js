/* eslint-env node */
// @ts-nocheck

// handler.js
require("dotenv").config();
const { google } = require("googleapis");

// Read env safely (defaults avoid red squiggles)
const CLIENT_ID = process.env.CLIENT_ID || process.env.GOOGLE_CLIENT_ID || "";
const CLIENT_SECRET =
  process.env.CLIENT_SECRET || process.env.GOOGLE_CLIENT_SECRET || "";
const REDIRECT_URI =
  process.env.REDIRECT_URI || process.env.GOOGLE_REDIRECT_URI || "";
const CALENDAR_ID =
  process.env.CALENDAR_ID || "fullstackwebdev@careerfoundry.com";

const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
};

// Helper: fail fast if required envs are missing
function envGuard() {
  const missing = [];
  if (!CLIENT_ID) missing.push("CLIENT_ID");
  if (!CLIENT_SECRET) missing.push("CLIENT_SECRET");
  if (!REDIRECT_URI) missing.push("REDIRECT_URI");
  if (!CALENDAR_ID) missing.push("CALENDAR_ID");
  if (missing.length) {
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        error: `Missing environment variables: ${missing.join(", ")}`,
      }),
    };
  }
  return null;
}

// ====================
// 1) GET AUTH URL
// ====================
exports.getAuthURL = async () => {
  const bad = envGuard();
  if (bad) return bad;

  try {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
      prompt: "consent",
    });

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ authUrl, redirectUri: REDIRECT_URI }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: err.message }),
    };
  }
};

// ====================
// 2) GET ACCESS TOKEN
// ====================
exports.getAccessToken = async (event) => {
  const bad = envGuard();
  if (bad) return bad;

  // Accept either /api/token/{code} or /api/token?code=...
  const code =
    event?.pathParameters?.code || event?.queryStringParameters?.code;
  if (!code) {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: "Missing authorization code" }),
    };
  }

  try {
    const tokenResponse = await new Promise((resolve, reject) => {
      oAuth2Client.getToken(code, (error, token) => {
        if (error) reject(error);
        else resolve(token);
      });
    });

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        access_token: tokenResponse.access_token,
        expiry_date: tokenResponse.expiry_date,
        token_type: tokenResponse.token_type,
        refresh_token: tokenResponse.refresh_token, // may be undefined
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: err.message }),
    };
  }
};

// ====================
// 3) GET CALENDAR EVENTS
// ====================
exports.getCalendarEvents = async (event) => {
  const bad = envGuard();
  if (bad) return bad;

  // Accept both path-param and query-param for access_token
  const access_token =
    event?.pathParameters?.access_token ||
    event?.queryStringParameters?.access_token;

  if (!access_token) {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: "Missing access_token" }),
    };
  }

  oAuth2Client.setCredentials({ access_token });
  const calendar = google.calendar({ version: "v3" });

  return new Promise((resolve, reject) => {
    calendar.events.list(
      {
        calendarId: CALENDAR_ID,
        auth: oAuth2Client,
        timeMin: new Date().toISOString(),
        singleEvents: true,
        orderBy: "startTime",
      },
      (error, response) => {
        if (error) reject(error);
        else resolve(response);
      }
    );
  })
    .then((results) => ({
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ events: results.data.items }),
    }))
    .catch((err) => ({
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: err.message }),
    }));
};
