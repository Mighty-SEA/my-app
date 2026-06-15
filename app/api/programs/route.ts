import { NextResponse } from "next/server";
import { dbQuery } from "../../lib/db";

export async function GET() {
  try {
    const programs = await dbQuery("SELECT id, title FROM programs WHERE is_active = 1");
    return NextResponse.json(programs);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Gagal mengambil daftar program." },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
