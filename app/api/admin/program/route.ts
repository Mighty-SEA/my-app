import { NextResponse } from "next/server";
import { dbQuery } from "../../../lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, target } = body;

    if (!id || target === undefined) {
      return NextResponse.json(
        { error: "ID dan target wajib diisi." },
        { status: 400 }
      );
    }

    const targetVal = parseInt(target);
    if (isNaN(targetVal) || targetVal <= 0) {
      return NextResponse.json(
        { error: "Target harus merupakan angka positif yang valid." },
        { status: 400 }
      );
    }

    await dbQuery("UPDATE programs SET target = ? WHERE id = ?", [targetVal, id]);

    return NextResponse.json({
      status: "success",
      message: `Target program ${id} berhasil diperbarui menjadi ${targetVal}.`,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Gagal memperbarui target program." },
      { status: 500 }
    );
  }
}
