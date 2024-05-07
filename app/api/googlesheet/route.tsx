import { google } from "googleapis";
import { NextResponse, NextRequest } from "next/server";

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
  scopes: [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/spreadsheets",
  ],
});

const sheets = google.sheets({
  auth,
  version: "v4",
});

export async function GET(request: NextRequest) {
  const range = request.nextUrl.searchParams.get("range")!;
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range,
  });
  return NextResponse.json({ data: response.data });
}

export async function POST(request: NextRequest) {
  const range = request.nextUrl.searchParams.get("range")!;
  try {
    const body = await request.json();
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [body],
        ],
      },
    });
    return NextResponse.json({ data: response.data });
  } catch (e) {
    return NextResponse.json({ data: "500 error" });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const range = request.nextUrl.searchParams.get("range")!;
    const body = await request.json();
    const response = await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: range,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [body],
        ],
      },
    });
    return NextResponse.json({ data: response});
  } catch (e) {
    return NextResponse.json({ data: "500 error" });
  }
}
