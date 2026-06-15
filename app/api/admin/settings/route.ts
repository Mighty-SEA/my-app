import { NextResponse } from "next/server";
import { dbQuery } from "../../../lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { serverKey, clientKey, environment } = body;

    if (serverKey === undefined || clientKey === undefined || environment === undefined) {
      return NextResponse.json(
        { error: "Kredensial Midtrans tidak lengkap." },
        { status: 400 }
      );
    }

    if (environment !== "sandbox" && environment !== "production") {
      return NextResponse.json(
        { error: "Environment tidak valid." },
        { status: 400 }
      );
    }

    // Update keys in database
    await dbQuery("UPDATE settings SET value_text = ? WHERE key_name = ?", [serverKey, 'midtrans_server_key']);
    await dbQuery("UPDATE settings SET value_text = ? WHERE key_name = ?", [clientKey, 'midtrans_client_key']);
    await dbQuery("UPDATE settings SET value_text = ? WHERE key_name = ?", [environment, 'midtrans_environment']);

    return NextResponse.json({
      status: "success",
      message: "Pengaturan API Midtrans berhasil diperbarui di database.",
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Gagal menyimpan pengaturan." },
      { status: 500 }
    );
  }
}
