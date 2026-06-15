import { NextResponse } from "next/server";
import { dbQuery } from "../../../lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "ID dan status wajib diisi." },
        { status: 400 }
      );
    }

    if (status !== "APPROVED" && status !== "REJECTED") {
      return NextResponse.json(
        { error: "Status tidak valid." },
        { status: 400 }
      );
    }

    await dbQuery("UPDATE volunteers SET status = ? WHERE id = ?", [status, id]);

    return NextResponse.json({
      status: "success",
      message: `Status relawan ${id} diperbarui menjadi ${status}.`,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Gagal memperbarui status relawan." },
      { status: 500 }
    );
  }
}
