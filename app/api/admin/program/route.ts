import { NextResponse } from "next/server";
import { dbQuery } from "../../../lib/db";

// CREATE: Add new program
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, title, target } = body;

    if (!id || !title || target === undefined) {
      return NextResponse.json(
        { error: "ID, Judul, dan Target wajib diisi." },
        { status: 400 }
      );
    }

    // Validate slug ID format (lowercase, no spaces, only alphanumeric and dashes)
    const idRegex = /^[a-z0-9-]+$/;
    if (!idRegex.test(id)) {
      return NextResponse.json(
        { error: "ID Program harus huruf kecil, angka, atau tanda strip saja (misal: beasiswa-anak)." },
        { status: 400 }
      );
    }

    // Check if ID already exists
    const existing = await dbQuery("SELECT id FROM programs WHERE id = ?", [id]);
    if (existing && existing.length > 0) {
      return NextResponse.json(
        { error: "ID Program ini sudah digunakan. Harap gunakan ID lain." },
        { status: 400 }
      );
    }

    const targetVal = parseInt(target);
    if (isNaN(targetVal) || targetVal <= 0) {
      return NextResponse.json(
        { error: "Target harus berupa angka positif." },
        { status: 400 }
      );
    }

    await dbQuery(
      "INSERT INTO programs (id, title, target, raised, is_active) VALUES (?, ?, ?, 0, 1)",
      [id, title, targetVal]
    );

    return NextResponse.json({
      status: "success",
      message: `Program "${title}" berhasil dibuat.`,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Gagal membuat program." },
      { status: 500 }
    );
  }
}

// UPDATE: Modify program title and target
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, title, target } = body;

    if (!id || !title || target === undefined) {
      return NextResponse.json(
        { error: "ID, Judul, dan Target wajib diisi." },
        { status: 400 }
      );
    }

    const targetVal = parseInt(target);
    if (isNaN(targetVal) || targetVal <= 0) {
      return NextResponse.json(
        { error: "Target harus berupa angka positif." },
        { status: 400 }
      );
    }

    await dbQuery(
      "UPDATE programs SET title = ?, target = ? WHERE id = ?",
      [title, targetVal, id]
    );

    return NextResponse.json({
      status: "success",
      message: `Program "${title}" berhasil diperbarui.`,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Gagal memperbarui program." },
      { status: 500 }
    );
  }
}

// DELETE: Remove program or Soft Delete
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID Program wajib disertakan." },
        { status: 400 }
      );
    }

    // Check if the program has any donations or raised funds
    const progRows = await dbQuery("SELECT raised FROM programs WHERE id = ?", [id]);
    if (!progRows || progRows.length === 0) {
      return NextResponse.json(
        { error: "Program tidak ditemukan." },
        { status: 404 }
      );
    }

    const raised = progRows[0].raised;

    if (raised > 0) {
      // Soft Delete: Mark as inactive so historical records are kept
      await dbQuery("UPDATE programs SET is_active = 0 WHERE id = ?", [id]);
      return NextResponse.json({
        status: "success",
        message: "Program dinonaktifkan (Soft Delete) karena sudah memiliki transaksi donasi.",
      });
    } else {
      // Hard Delete: Safe to delete physically from database
      await dbQuery("DELETE FROM programs WHERE id = ?", [id]);
      return NextResponse.json({
        status: "success",
        message: "Program berhasil dihapus secara permanen.",
      });
    }
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Gagal menghapus program." },
      { status: 500 }
    );
  }
}
