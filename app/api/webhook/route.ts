import { NextResponse } from "next/server";
import crypto from "crypto";
import { dbQuery } from "../../lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      transaction_status,
      order_id,
      payment_type,
      gross_amount,
      signature_key,
      status_code,
    } = body;

    // Fetch Midtrans Server Key dynamically from Database for security validation
    const serverKeyRows = await dbQuery("SELECT value_text FROM settings WHERE key_name = ?", ["midtrans_server_key"]);
    const serverKey = serverKeyRows && serverKeyRows[0] ? serverKeyRows[0].value_text : "SB-Mid-server-xxxxxxxxx";

    // Verify Midtrans Signature Key
    const payloadToHash = `${order_id}${status_code}${gross_amount}${serverKey}`;
    const calculatedSignature = crypto
      .createHash("sha512")
      .update(payloadToHash)
      .digest("hex");

    if (serverKey !== "SB-Mid-server-xxxxxxxxx" && calculatedSignature !== signature_key) {
      return NextResponse.json(
        { error: "Tanda tangan keamanan tidak valid (Invalid Signature Key)." },
        { status: 403 }
      );
    }

    // Determine final status
    let finalStatus = "PENDING";
    if (transaction_status === "capture" || transaction_status === "settlement") {
      finalStatus = "SUCCESS";
    } else if (
      transaction_status === "deny" ||
      transaction_status === "cancel" ||
      transaction_status === "expire"
    ) {
      finalStatus = "FAILED";
    } else if (transaction_status === "pending") {
      finalStatus = "PENDING";
    }

    // 1. Get donation status before updating (to prevent double-counting)
    const existing = await dbQuery("SELECT status, program, amount FROM donations WHERE id = ?", [order_id]);
    const previousStatus = existing && existing[0] ? existing[0].status : null;
    const programName = existing && existing[0] ? existing[0].program : null;
    const donationAmount = existing && existing[0] ? existing[0].amount : 0;

    // 2. Update status and payment method in MySQL Database
    await dbQuery("UPDATE donations SET status = ?, payment_method = ? WHERE id = ?", [finalStatus, payment_type || "Midtrans", order_id]);

    // 3. If transitioning to SUCCESS and previous status was not SUCCESS, update Program Raised Fund
    if (finalStatus === "SUCCESS" && previousStatus !== "SUCCESS" && programName && donationAmount > 0) {
      // Map program name to ID
      let programId = "all";
      if (programName.includes("Asah")) {
        programId = "asah";
      } else if (programName.includes("Asih")) {
        programId = "asih";
      } else if (programName.includes("Asuh")) {
        programId = "asuh";
      }

      if (programId !== "all") {
        await dbQuery("UPDATE programs SET raised = raised + ? WHERE id = ?", [donationAmount, programId]);
        console.log(`[Database Update] Added ${donationAmount} to program ${programId}`);
      }
    }

    console.log(`[Midtrans Webhook & DB] Order: ${order_id} | Status: ${finalStatus} | Previous: ${previousStatus}`);

    return NextResponse.json({
      status: "success",
      message: "Webhook processed and synced to MySQL successfully",
      orderId: order_id,
      paymentStatus: finalStatus,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Gagal memproses webhook." },
      { status: 500 }
    );
  }
}
