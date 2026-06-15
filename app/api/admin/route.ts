import { NextResponse } from "next/server";
import { dbQuery } from "../../lib/db";

export async function GET() {
  try {
    // Fetch all donations
    const donations = await dbQuery("SELECT * FROM donations ORDER BY date DESC");

    // Fetch all volunteers
    const volunteers = await dbQuery("SELECT * FROM volunteers ORDER BY date DESC");

    // Fetch all programs
    const programs = await dbQuery("SELECT * FROM programs");

    // Fetch all settings
    const settingsRows = await dbQuery("SELECT * FROM settings");
    const settingsMap: Record<string, string> = {};
    if (Array.isArray(settingsRows)) {
      settingsRows.forEach((row: any) => {
        settingsMap[row.key_name] = row.value_text || "";
      });
    }

    return NextResponse.json({
      donations,
      volunteers,
      programs,
      settings: settingsMap,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Gagal memproses data admin." },
      { status: 500 }
    );
  }
}
