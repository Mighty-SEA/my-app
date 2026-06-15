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

    // Format fields to camelCase to match React frontend properties
    const formattedDonations = Array.isArray(donations) ? donations.map((d: any) => ({
      id: d.id,
      name: d.name,
      email: d.email,
      phone: d.phone,
      amount: d.amount,
      program: d.program,
      paymentMethod: d.payment_method || d.paymentMethod,
      status: d.status,
      message: d.message,
      date: d.date,
    })) : [];

    const formattedVolunteers = Array.isArray(volunteers) ? volunteers.map((v: any) => ({
      id: v.id,
      name: v.name,
      email: v.email,
      phone: v.phone,
      interestArea: v.interest_area || v.interestArea,
      status: v.status,
      motivation: v.motivation,
      date: v.date,
    })) : [];

    return NextResponse.json({
      donations: formattedDonations,
      volunteers: formattedVolunteers,
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
