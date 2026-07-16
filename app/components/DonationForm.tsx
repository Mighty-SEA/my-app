"use client";

import { useState, useEffect } from "react";
import { Gift, Users, CreditCard, ChevronRight, CheckCircle2, ShieldCheck } from "lucide-react";

const loadSnapScript = (clientKey: string, environment: string): Promise<boolean> => {
  return new Promise((resolve) => {
    if ((window as any).snap) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    const isProd = environment === "production";
    script.src = isProd
      ? "https://app.midtrans.com/snap/snap.js"
      : "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", clientKey);
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function DonationForm() {
  const [formType, setFormType] = useState<"donate" | "volunteer">("donate");

  useEffect(() => {
    // Eagerly fetch settings and load Snap SDK script to prevent popup blocker
    const initSnap = async () => {
      try {
        const settingsRes = await fetch("/api/settings");
        const settingsData = await settingsRes.json();
        await loadSnapScript(settingsData.clientKey, settingsData.environment);
      } catch (err) {
        console.error("Gagal menginisialisasi naskah Midtrans Snap:", err);
      }
    };
    initSnap();

    // Fetch active programs for donation select dropdown
    const fetchPrograms = async () => {
      try {
        const res = await fetch("/api/programs");
        if (res.ok) {
          const data = await res.json();
          setAvailablePrograms(data);
        }
      } catch (err) {
        console.error("Gagal mengambil program aktif:", err);
      }
    };
    fetchPrograms();

    // Check if redirected back from Midtrans with transaction params
    const checkRedirectStatus = async () => {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const orderIdParam = params.get("order_id");

        if (orderIdParam) {
          try {
            const res = await fetch(`/api/donasi?order_id=${orderIdParam}`);
            if (res.ok) {
              const data = await res.json();
              setCreatedOrderId(data.id);
              setAmount(data.amount);
              setProgram(data.program);
              setPaymentStatusText(data.status);
              setIsSuccess(true);
            }
          } catch (err) {
            console.error("Gagal memuat status redirect donasi:", err);
          }
        }
      }
    };
    checkRedirectStatus();
  }, []);
  const [amount, setAmount] = useState<number>(100000);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [createdOrderId, setCreatedOrderId] = useState("");
  const [snapToken, setSnapToken] = useState("");
  const [paymentStatusText, setPaymentStatusText] = useState("");

  // Form Fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [program, setProgram] = useState("all");
  const [paymentMethod, setPaymentMethod] = useState("QRIS (Midtrans)");
  const [message, setMessage] = useState("");
  const [interestArea, setInterestArea] = useState("asah");
  const [availablePrograms, setAvailablePrograms] = useState<any[]>([]);
  const [showMockModal, setShowMockModal] = useState(false);
  const [isMockPaying, setIsMockPaying] = useState(false);
  const [mockPaymentType, setMockPaymentType] = useState<"qris" | "bank_transfer">("qris");

  const amountPresets = [50000, 100000, 250000, 500000];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !phone) {
      alert("Harap lengkapi nama, email, dan nomor telepon Anda.");
      return;
    }

    setIsSubmitting(true);

    if (formType === "volunteer") {
      try {
        const res = await fetch("/api/donasi", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "volunteer",
            name,
            email,
            phone,
            interestArea,
            motivation: message,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Gagal mendaftar relawan.");
        }

        setIsSubmitting(false);
        setIsSuccess(true);
      } catch (err: any) {
        setError(err.message || "Terjadi kesalahan koneksi server.");
        setIsSubmitting(false);
      }
      return;
    }

    // Donation Midtrans integration
    try {
      const selectedAmount = customAmount ? parseInt(customAmount.replace(/\D/g, "")) || 0 : amount;
      const res = await fetch("/api/donasi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: selectedAmount,
          name,
          email,
          phone,
          program,
          paymentMethod,
          message,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Gagal membuat transaksi.");
      }

      setCreatedOrderId(data.orderId);
      setSnapToken(data.token);

      if (data.isManual) {
        setPaymentStatusText("PENDING");
        setIsSubmitting(false);
        setIsSuccess(true);
        return;
      }

      if (data.isMock) {
        setShowMockModal(true);
        setIsSubmitting(false);
        return;
      }

      // Trigger Snap Modal using eagerly loaded window.snap
      const snap = (window as any).snap;
      if (snap) {
        snap.pay(data.token, {
          onSuccess: function (result: any) {
            setPaymentStatusText("SUCCESS");
            setIsSubmitting(false);
            setIsSuccess(true);
          },
          onPending: function (result: any) {
            setPaymentStatusText("PENDING");
            setIsSubmitting(false);
            setIsSuccess(true);
          },
          onError: function (result: any) {
            alert("Pembayaran gagal diproses oleh Midtrans.");
            setIsSubmitting(false);
          },
          onClose: function () {
            alert("Anda menutup halaman pembayaran sebelum selesai.");
            setPaymentStatusText("PENDING (Closed)");
            setIsSubmitting(false);
            setIsSuccess(true);
          },
        });
      } else {
        // Fallback to fetch and load dynamically if not eagerly loaded
        try {
          const settingsRes = await fetch("/api/settings");
          const settingsData = await settingsRes.json();
          const loaded = await loadSnapScript(settingsData.clientKey, settingsData.environment);
          const snapObj = (window as any).snap;
          if (loaded && snapObj) {
            snapObj.pay(data.token, {
              onSuccess: () => {
                setPaymentStatusText("SUCCESS");
                setIsSubmitting(false);
                setIsSuccess(true);
              },
              onPending: () => {
                setPaymentStatusText("PENDING");
                setIsSubmitting(false);
                setIsSuccess(true);
              },
              onError: () => {
                alert("Pembayaran gagal.");
                setIsSubmitting(false);
              },
              onClose: () => {
                setPaymentStatusText("PENDING (Closed)");
                setIsSubmitting(false);
                setIsSuccess(true);
              },
            });
          } else {
            window.open(data.redirect_url, "_blank");
            setPaymentStatusText("PENDING (Redirected)");
            setIsSubmitting(false);
            setIsSuccess(true);
          }
        } catch (err) {
          window.open(data.redirect_url, "_blank");
          setPaymentStatusText("PENDING (Redirected)");
          setIsSubmitting(false);
          setIsSuccess(true);
        }
      }
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan koneksi server.");
      setIsSubmitting(false);
    }
  };

  const handleSimulatePayment = async () => {
    setIsMockPaying(true);
    try {
      await fetch("/api/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transaction_status: "settlement",
          order_id: createdOrderId,
          payment_type: mockPaymentType === "qris" ? "gopay" : "bank_transfer",
          gross_amount: selectedAmount,
          status_code: "200",
        }),
      });

      setPaymentStatusText("SUCCESS");
      setIsMockPaying(false);
      setShowMockModal(false);
      setIsSuccess(true);
    } catch (err) {
      console.error("Gagal melakukan simulasi pembayaran:", err);
      setIsMockPaying(false);
      setShowMockModal(false);
      setIsSuccess(true);
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setError("");
    setCreatedOrderId("");
    setSnapToken("");
    setPaymentStatusText("");
    setIsSuccess(false);
    setAmount(100000);
    setCustomAmount("");
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(val);
  };

  const selectedAmount = customAmount ? parseInt(customAmount.replace(/\D/g, "")) || 0 : amount;

  return (
    <section
      id="donasi"
      className="py-20 bg-white dark:bg-zinc-950 transition-colors duration-300 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-amber-100/20 dark:bg-brand-amber-950/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-emerald-100/20 dark:bg-brand-emerald-950/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Form Container */}
        <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-xl rounded-3xl overflow-hidden transition-all duration-300">
          
          {/* Tab Headers */}
          <div className="flex border-b border-gray-100 dark:border-zinc-800">
            <button
              onClick={() => {
                setFormType("donate");
                setIsSuccess(false);
              }}
              className={`flex-1 py-5 px-6 font-bold text-base flex items-center justify-center gap-2 transition-all duration-200 ${
                formType === "donate"
                  ? "bg-white dark:bg-zinc-900 text-brand-emerald-700 dark:text-brand-emerald-400 border-b-2 border-brand-emerald-700 dark:border-brand-emerald-400"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              <Gift className="h-5 w-5" />
              Donatur Finansial
            </button>
            <button
              onClick={() => {
                setFormType("volunteer");
                setIsSuccess(false);
              }}
              className={`flex-1 py-5 px-6 font-bold text-base flex items-center justify-center gap-2 transition-all duration-200 ${
                formType === "volunteer"
                  ? "bg-white dark:bg-zinc-900 text-brand-emerald-700 dark:text-brand-emerald-400 border-b-2 border-brand-emerald-700 dark:border-brand-emerald-400"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              <Users className="h-5 w-5" />
              Gabung Relawan
            </button>
          </div>

          <div className="p-8 sm:p-10">
            {isSuccess ? (
              /* Success Screen */
              <div className="text-center py-10 flex flex-col items-center gap-5 animate-fade-in-up">
                <div className="h-20 w-20 bg-brand-emerald-100 dark:bg-brand-emerald-950/50 rounded-full flex items-center justify-center text-brand-emerald-600 dark:text-brand-emerald-400 shadow-md">
                  <CheckCircle2 className="h-12 w-12" />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                    {formType === "donate"
                      ? (paymentStatusText.includes("SUCCESS") ? "Donasi Berhasil!" : "Menunggu Pembayaran")
                      : "Terima Kasih telah Mendaftar!"}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-md mx-auto text-sm leading-relaxed">
                    {formType === "donate"
                      ? (paymentStatusText.includes("SUCCESS")
                          ? `Terima kasih! Donasi Anda sebesar ${formatCurrency(selectedAmount)} telah berhasil kami terima.`
                          : paymentMethod.startsWith("Transfer Manual")
                            ? `Donasi Anda sebesar ${formatCurrency(selectedAmount)} telah terdaftar. Silakan ikuti petunjuk transfer di bawah ini.`
                            : `Donasi Anda sebesar ${formatCurrency(selectedAmount)} telah terdaftar. Silakan selesaikan pembayaran Anda di portal Midtrans.`)
                      : `Pendaftaran Anda sebagai relawan bidang ${
                          interestArea === "asah" ? "Silih Asah (Pendidikan)" : interestArea === "asih" ? "Silih Asih (Bantuan Sosial)" : "Silih Asuh (Kesehatan)"
                        } telah diterima. Kami akan segera menghubungi Anda.`}
                  </p>
                </div>

                {formType === "donate" && (
                  /* Transaction Detail Box */
                  <div className="w-full max-w-md bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 text-left mt-4 shadow-sm space-y-4">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-zinc-900 pb-2">Detail Transaksi</p>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">ID Transaksi:</span>
                        <span className="font-mono font-bold text-brand-emerald-700 dark:text-brand-emerald-450">{createdOrderId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Status Pembayaran:</span>
                        <span className={`font-bold uppercase ${
                          paymentStatusText.includes("SUCCESS") ? "text-green-600" : "text-amber-500"
                        }`}>{paymentStatusText}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Metode Pembayaran:</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{paymentMethod === "Midtrans" ? "Midtrans Gateway" : paymentMethod}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Alokasi Program:</span>
                        <span className="font-semibold text-gray-900 dark:text-white max-w-[200px] truncate text-right">
                          {program === "all" ? "Donasi Umum" : program === "asah" ? "Berbagi kepada Anak Yatim" : program === "asih" ? "Donasi untuk Lansia" : program === "asuh" ? "Berbagi kepada Masyarakat" : program}
                        </span>
                      </div>
                      <div className="border-t border-gray-150 dark:border-zinc-900 pt-3 flex justify-between items-center">
                        <span className="text-gray-500 font-medium">Jumlah Donasi:</span>
                        <span className="text-lg font-extrabold text-brand-amber-600 dark:text-brand-amber-500">{formatCurrency(selectedAmount)}</span>
                      </div>
                    </div>

                    {/* Manual Bank Account details if manual transfer selected */}
                    {paymentMethod.startsWith("Transfer Manual") && (
                      <div className="mt-4 p-4 bg-brand-emerald-50/50 dark:bg-brand-emerald-950/20 border border-brand-emerald-100 dark:border-brand-emerald-900/30 rounded-xl space-y-3">
                        <p className="text-xs font-bold text-brand-emerald-800 dark:text-brand-emerald-400 uppercase tracking-wider">Petunjuk Transfer</p>
                        <div className="text-xs text-gray-650 dark:text-gray-400 space-y-2">
                          <p>Silakan lakukan transfer sebesar <strong className="text-gray-950 dark:text-white">{formatCurrency(selectedAmount)}</strong> ke rekening berikut:</p>
                          <div className="p-3 bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-850 font-semibold space-y-1 text-gray-950 dark:text-white">
                            {paymentMethod.includes("BCA") ? (
                              <>
                                <p>Bank: <span className="text-brand-emerald-700 dark:text-brand-emerald-400">BCA</span></p>
                                <p>No. Rekening: <span className="font-mono text-base tracking-wider text-brand-amber-600">0353123456</span></p>
                                <p className="text-[10px] font-normal text-gray-400">a/n Yayasan Silih Asah Silih Asih Silih Asuh</p>
                              </>
                            ) : (
                              <>
                                <p>Bank: <span className="text-brand-emerald-700 dark:text-brand-emerald-400">Mandiri</span></p>
                                <p>No. Rekening: <span className="font-mono text-base tracking-wider text-brand-amber-600">1310012345678</span></p>
                                <p className="text-[10px] font-normal text-gray-400">a/n Yayasan Silih Asah Silih Asih Silih Asuh</p>
                              </>
                            )}
                          </div>
                          <p className="text-[10px] text-gray-500">Setelah transfer, mohon konfirmasi bukti transfer dengan menekan tombol WhatsApp di bawah ini.</p>
                        </div>
                        <a
                          href={`https://wa.me/6282121613359?text=Halo%20Yayasan%20SA3%2C%20saya%20ingin%20mengonfirmasi%20donasi%20manual%20saya.%0A%0AID%20Donasi%3A%20${createdOrderId}%0ANama%3A%20${name}%0ANominal%3A%20${formatCurrency(selectedAmount)}%0AMetode%3A%20${paymentMethod}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center gap-1.5 bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow-sm hover:shadow transition-all duration-200"
                        >
                          Konfirmasi via WhatsApp
                        </a>
                      </div>
                    )}

                    {!paymentStatusText.includes("SUCCESS") && snapToken && !paymentMethod.startsWith("Transfer Manual") && (
                      <button
                        type="button"
                        onClick={async () => {
                          let snap = (window as any).snap;
                          if (!snap) {
                            const settingsRes = await fetch("/api/settings");
                            const settingsData = await settingsRes.json();
                            await loadSnapScript(settingsData.clientKey, settingsData.environment);
                            snap = (window as any).snap;
                          }
                          if (snap) {
                            snap.pay(snapToken, {
                              onSuccess: () => setPaymentStatusText("SUCCESS"),
                              onPending: () => setPaymentStatusText("PENDING"),
                              onError: () => alert("Pembayaran gagal."),
                            });
                          } else {
                            alert("Gagal memuat sistem pembayaran Midtrans.");
                          }
                        }}
                        className="w-full mt-3 bg-brand-amber-500 hover:bg-brand-amber-650 text-gray-950 font-bold py-2.5 px-4 rounded-xl text-xs shadow-sm hover:shadow transition-all duration-200"
                      >
                        Bayar Sekarang (Buka Snap Pop-up)
                      </button>
                    )}
                  </div>
                )}

                <button
                  onClick={handleReset}
                  className="mt-6 bg-brand-emerald-700 hover:bg-brand-emerald-800 dark:bg-brand-emerald-600 dark:hover:bg-brand-emerald-700 text-white font-semibold py-3 px-8 rounded-full shadow-md transition-all duration-200"
                >
                  Kembali
                </button>
              </div>
            ) : (
              /* Main Form */
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {error && (
                  <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 text-red-700 dark:text-red-400 text-xs font-semibold">
                    {error}
                  </div>
                )}
                
                {/* Form Type 1: Donation */}
                {formType === "donate" && (
                  <div className="space-y-6 animate-fade-in-up">
                    {/* Amount Presets */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-3">
                        Pilih Nominal Donasi
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {amountPresets.map((preset) => (
                          <button
                            key={preset}
                            type="button"
                            onClick={() => {
                              setAmount(preset);
                              setCustomAmount("");
                            }}
                            className={`py-3 px-4 rounded-xl font-bold text-sm transition-all duration-200 border text-center ${
                              amount === preset && !customAmount
                                ? "bg-brand-emerald-700 text-white border-brand-emerald-700 dark:bg-brand-emerald-600 dark:border-brand-emerald-600"
                                : "bg-white dark:bg-zinc-950 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-zinc-800 hover:border-brand-emerald-500"
                            }`}
                          >
                            {formatCurrency(preset)}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Custom Amount */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                        Atau Nominal Kustom (Rp)
                      </label>
                      <div className="relative rounded-xl shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <span className="text-gray-500 font-semibold sm:text-sm">Rp</span>
                        </div>
                        <input
                          type="text"
                          pattern="[0-9]*"
                          placeholder="Contoh: 150000"
                          value={customAmount}
                          onChange={(e) => {
                            setCustomAmount(e.target.value);
                            setAmount(0);
                          }}
                          className="block w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:ring-2 focus:ring-brand-emerald-500 focus:border-brand-emerald-500 text-gray-900 dark:text-white font-medium"
                        />
                      </div>
                    </div>

                    {/* Program Selector */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                        Pilih Alokasi Program Donasi
                      </label>
                      <select
                        value={program}
                        onChange={(e) => setProgram(e.target.value)}
                        className="block w-full py-3 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:ring-2 focus:ring-brand-emerald-500 focus:border-brand-emerald-500 text-gray-900 dark:text-white font-medium"
                      >
                        <option value="all">Donasi Umum (Didistribusikan ke semua program)</option>
                        {availablePrograms.map((p) => (
                          <option key={p.id} value={p.id}>{p.title}</option>
                        ))}
                      </select>
                    </div>

                    {/* Payment Method Selector */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                        Pilih Metode Pembayaran
                      </label>
                      <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="block w-full py-3 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:ring-2 focus:ring-brand-emerald-500 focus:border-brand-emerald-500 text-gray-900 dark:text-white font-medium"
                      >
                        <option value="QRIS (Midtrans)">QRIS / E-Wallet (Otomatis via Midtrans)</option>
                        <option value="Transfer Bank BCA">Transfer Bank BCA (Konfirmasi Manual)</option>
                        <option value="Transfer Bank Mandiri">Transfer Bank Mandiri (Konfirmasi Manual)</option>
                      </select>
                    </div>


                  </div>
                )}

                {/* Form Type 2: Volunteer */}
                {formType === "volunteer" && (
                  <div className="space-y-6 animate-fade-in-up">
                    {/* Area of Interest */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                        Pilih Bidang Minat Kerelawanan
                      </label>
                      <select
                        value={interestArea}
                        onChange={(e) => setInterestArea(e.target.value)}
                        className="block w-full py-3 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:ring-2 focus:ring-brand-emerald-500 focus:border-brand-emerald-500 text-gray-900 dark:text-white font-medium"
                      >
                        <option value="asah">Silih Asah - Pengajar/Mentor Edukasi</option>
                        <option value="asih">Silih Asih - Pendistribusi Logistik & Pangan</option>
                        <option value="asuh">Silih Asuh - Medis/Penyuluh Kesehatan/Konselor</option>
                      </select>
                    </div>

                    {/* Volunteer Message */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                        Motivasi / Keahlian Khusus (Opsional)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Ceritakan singkat motivasi Anda bergabung atau keahlian khusus yang Anda miliki..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="block w-full py-3 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:ring-2 focus:ring-brand-emerald-500 focus:border-brand-emerald-500 text-gray-900 dark:text-white font-medium"
                      />
                    </div>
                  </div>
                )}

                {/* Contact Fields (Shared) */}
                <div className="border-t border-gray-100 dark:border-zinc-800/80 pt-6 space-y-4">
                  <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                    Informasi Kontak
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Nama Lengkap</label>
                      <input
                        type="text"
                        required
                        placeholder="Nama Lengkap Anda"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="block w-full py-2.5 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:ring-2 focus:ring-brand-emerald-500 focus:border-brand-emerald-500 text-gray-900 dark:text-white font-medium text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Email</label>
                      <input
                        type="email"
                        required
                        placeholder="Alamat Email Anda"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full py-2.5 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:ring-2 focus:ring-brand-emerald-500 focus:border-brand-emerald-500 text-gray-900 dark:text-white font-medium text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Nomor Telepon / WhatsApp</label>
                    <input
                      type="tel"
                      required
                      placeholder="Contoh: 081234567890"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="block w-full py-2.5 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:ring-2 focus:ring-brand-emerald-500 focus:border-brand-emerald-500 text-gray-900 dark:text-white font-medium text-sm"
                    />
                  </div>

                  {formType === "donate" && (
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Pesan / Doa Terbaik (Opsional)</label>
                      <textarea
                        rows={2}
                        placeholder="Tuliskan doa atau pesan dukungan Anda..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="block w-full py-2.5 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:ring-2 focus:ring-brand-emerald-500 focus:border-brand-emerald-500 text-gray-900 dark:text-white font-medium text-sm"
                      />
                    </div>
                  )}
                </div>

                {/* Secure Trust Info */}
                <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                  <ShieldCheck className="h-4.5 w-4.5 text-brand-emerald-600" />
                  <span>Sistem terlindungi. Seluruh laporan penyaluran diumumkan secara transparan tiap bulan.</span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-brand-emerald-700 hover:bg-brand-emerald-800 dark:bg-brand-emerald-600 dark:hover:bg-brand-emerald-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl disabled:bg-gray-400"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Memproses...
                    </span>
                  ) : (
                    <>
                      {formType === "donate" ? "Bayar Donasi" : "Daftar Relawan Sekarang"}
                      <ChevronRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Mock Midtrans Snap Simulation Modal */}
      {showMockModal && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-2xl overflow-hidden animate-scale-in">
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-emerald-700 to-brand-emerald-600 dark:from-brand-emerald-800 dark:to-brand-emerald-700 p-6 text-white text-center">
              <h4 className="font-extrabold text-lg">Simulasi Midtrans Sandbox</h4>
              <p className="text-xs text-brand-emerald-200 mt-1">Pembayaran Instan & Otomatis Terintegrasi Web</p>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 text-gray-900 dark:text-gray-150">
              <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-900 space-y-3">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>ID Transaksi:</span>
                  <span className="font-mono font-bold">{createdOrderId}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Donatur:</span>
                  <span className="font-semibold text-gray-800 dark:text-white">{name}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Alokasi Program:</span>
                  <span className="font-semibold text-gray-800 dark:text-white">
                    {program === "all" ? "Donasi Umum" : program === "asah" ? "Berbagi kepada Anak Yatim" : program === "asih" ? "Donasi untuk Lansia" : "Berbagi kepada Masyarakat yang Membutuhkan"}
                  </span>
                </div>
                <div className="border-t border-zinc-200/60 dark:border-zinc-900 pt-3 flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Total Tagihan:</span>
                  <span className="text-xl font-extrabold text-brand-amber-600 dark:text-brand-amber-500">{formatCurrency(selectedAmount)}</span>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Pilih Metode Pembayaran Simulasi</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setMockPaymentType("qris")}
                    className={`p-3.5 rounded-xl border font-bold text-xs flex flex-col items-center gap-2 transition-all ${
                      mockPaymentType === "qris"
                        ? "bg-brand-emerald-50/50 border-brand-emerald-500 text-brand-emerald-700 dark:bg-brand-emerald-950/20 dark:border-brand-emerald-450 dark:text-brand-emerald-400"
                        : "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800"
                    }`}
                  >
                    <svg className="h-6 w-6 text-brand-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <rect x="7" y="7" width="3" height="3" />
                      <rect x="14" y="7" width="3" height="3" />
                      <rect x="7" y="14" width="3" height="3" />
                      <rect x="14" y="14" width="3" height="3" />
                    </svg>
                    <span>Instant QRIS / GoPay</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMockPaymentType("bank_transfer")}
                    className={`p-3.5 rounded-xl border font-bold text-xs flex flex-col items-center gap-2 transition-all ${
                      mockPaymentType === "bank_transfer"
                        ? "bg-brand-emerald-50/50 border-brand-emerald-500 text-brand-emerald-700 dark:bg-brand-emerald-950/20 dark:border-brand-emerald-450 dark:text-brand-emerald-400"
                        : "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800"
                    }`}
                  >
                    <CreditCard className="h-6 w-6 text-brand-emerald-600" />
                    <span>Virtual Account Bank</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="bg-zinc-50 dark:bg-zinc-900/60 p-6 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-col gap-3">
              <button
                type="button"
                onClick={handleSimulatePayment}
                disabled={isMockPaying}
                className="w-full flex items-center justify-center gap-2 bg-brand-emerald-700 hover:bg-brand-emerald-800 text-white font-bold py-3 px-4 rounded-xl text-sm shadow-md transition-all duration-200 disabled:bg-gray-400"
              >
                {isMockPaying ? (
                  <span className="flex items-center gap-1.5">
                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Memverifikasi Pembayaran...
                  </span>
                ) : (
                  <>
                    <span>Bayar Sekarang (Otomatis)</span>
                    <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowMockModal(false);
                  setPaymentStatusText("PENDING");
                  setIsSuccess(true);
                }}
                className="w-full text-center text-xs font-bold text-gray-500 hover:text-gray-700 dark:text-gray-450 dark:hover:text-gray-300 py-1"
              >
                Batal / Bayar Nanti
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
