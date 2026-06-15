import { NextResponse } from "next/server";
import { dbQuery } from "../../lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, amount, name, email, phone, program, paymentMethod, message, interestArea, motivation } = body;

    // Handle Volunteer Registration
    if (type === "volunteer") {
      if (!name || !email || !phone || !interestArea) {
        return NextResponse.json(
          { error: "Nama, email, nomor telepon, dan bidang minat wajib diisi." },
          { status: 400 }
        );
      }

      const volunteerId = `VOL-${Date.now()}`;
      await dbQuery(
        "INSERT INTO volunteers (id, name, email, phone, interest_area, status, motivation, date) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())",
        [volunteerId, name, email, phone, interestArea, "PENDING", motivation || ""]
      );

      return NextResponse.json({
        status: "success",
        message: "Pendaftaran relawan berhasil disimpan ke database.",
        id: volunteerId,
      });
    }

    // Default: Handle Donation
    if (!amount || !name || !email || !phone || !program) {
      return NextResponse.json(
        { error: "Parameter donasi tidak lengkap." },
        { status: 400 }
      );
    }

    const orderId = `TRX-${Date.now()}`;
    
    // Fetch Server Key and Environment dynamically from Database
    const serverKeyRows = await dbQuery("SELECT value_text FROM settings WHERE key_name = ?", ["midtrans_server_key"]);
    const serverKey = serverKeyRows && serverKeyRows[0] ? serverKeyRows[0].value_text : "SB-Mid-server-xxxxxxxxx";

    const envRows = await dbQuery("SELECT value_text FROM settings WHERE key_name = ?", ["midtrans_environment"]);
    const isProd = envRows && envRows[0] ? envRows[0].value_text === "production" : false;

    // 1. Save Pending Donation into MySQL Database (Best Practice)
    await dbQuery(
      "INSERT INTO donations (id, name, email, phone, amount, program, payment_method, status, message, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())",
      [
        orderId,
        name,
        email,
        phone,
        amount,
        program === "all" ? "Donasi Umum" : program === "asah" ? "Beasiswa Pintar Silih Asah" : program === "asih" ? "Pangan Lansia Silih Asih" : "Pos Sehat Ibu & Anak Silih Asuh",
        paymentMethod || "QRIS",
        "PENDING",
        message || "",
      ]
    );

    // 2. Call Midtrans Snap API to get Snap Token
    const url = isProd
      ? "https://app.midtrans.com/snap/v1/transactions"
      : "https://app.sandbox.midtrans.com/snap/v1/transactions";
    const authString = Buffer.from(`${serverKey}:`).toString("base64");

    const payload = {
      transaction_details: {
        order_id: orderId,
        gross_amount: amount,
      },
      customer_details: {
        first_name: name,
        email: email,
        phone: phone,
      },
      item_details: [
        {
          id: program,
          price: amount,
          quantity: 1,
          name: `Donasi - ${program}`,
        },
      ],
      credit_card: {
        secure: true,
      },
    };

    // If Server Key is mock key, fallback to mock response for sandbox development
    if (serverKey === "SB-Mid-server-xxxxxxxxx") {
      return NextResponse.json({
        token: `mock-snap-token-${Date.now()}`,
        redirect_url: "https://sandbox.midtrans.com",
        orderId: orderId,
        isMock: true,
      });
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Basic ${authString}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error_messages || "Gagal menghubungi Midtrans." },
        { status: response.status }
      );
    }

    return NextResponse.json({
      token: data.token,
      redirect_url: data.redirect_url,
      orderId: orderId,
      isMock: false,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Terjadi kesalahan internal server." },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("order_id");

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID wajib disertakan." },
        { status: 400 }
      );
    }

    const rows = await dbQuery("SELECT id, name, amount, program, payment_method, status, date FROM donations WHERE id = ?", [orderId]);
    
    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { error: "Transaksi tidak ditemukan." },
        { status: 404 }
      );
    }

    const d = rows[0];
    return NextResponse.json({
      id: d.id,
      name: d.name,
      amount: d.amount,
      program: d.program,
      paymentMethod: d.payment_method,
      status: d.status,
      date: d.date,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Gagal mengambil status transaksi." },
      { status: 500 }
    );
  }
}
