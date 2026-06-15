import { NextResponse } from "next/server";
import { dbQuery } from "../../lib/db";

export async function GET() {
  try {
    const settingsRows = await dbQuery("SELECT * FROM settings");
    const settingsMap: Record<string, string> = {};

    if (Array.isArray(settingsRows)) {
      settingsRows.forEach((row: any) => {
        settingsMap[row.key_name] = row.value_text || "";
      });
    }

    return NextResponse.json({
      clientKey: settingsMap["midtrans_client_key"] || "SB-Mid-client-yyyyyyyyy",
      environment: settingsMap["midtrans_environment"] || "sandbox",
    });
  } catch (err: any) {
    return NextResponse.json({
      clientKey: "SB-Mid-client-yyyyyyyyy",
      environment: "sandbox",
    });
  }
}
export const dynamic = "force-dynamic";
