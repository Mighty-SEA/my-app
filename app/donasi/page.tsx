import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DonationForm from "../components/DonationForm";
import { HelpCircle, ShieldAlert, BadgeCheck } from "lucide-react";


export default function DonasiPage() {
  const faqs = [
    {
      q: "Bagaimana cara menyalurkan donasi?",
      a: "Anda dapat memilih nominal donasi di formulir di bawah ini, memilih metode pembayaran (Transfer Bank Mandiri/BCA atau QRIS/Gopay), lalu mengirimkan rencana donasi. Petunjuk nomor rekening transfer akan ditampilkan setelah Anda menekan kirim.",
    },
    {
      q: "Apakah seluruh dana donasi disalurkan ke masyarakat?",
      a: "Ya. Sebagai lembaga non-komersial, 100% donasi publik dialokasikan langsung untuk mendanai program sosial (Silih Asah, Silih Asih, Silih Asuh). Seluruh biaya operasional staf ditanggung secara mandiri oleh dewan pembina yayasan.",
    },
    {
      q: "Bagaimana transparansi pelaporan dana?",
      a: "Setiap bulan, kami mempublikasikan laporan keuangan resmi berisi rincian dana masuk dan penyaluran lengkap dengan foto-foto serah terima bantuan di situs web ini dan akun media sosial resmi yayasan.",
    },
    {
      q: "Apakah saya bisa mendaftar menjadi relawan tanpa pengalaman?",
      a: "Tentu. Kami menerima relawan dari berbagai latar belakang. Tim internal kami akan memberikan sesi pembekalan singkat (briefing/pelatihan) sebelum Anda diturunkan dalam aksi lapangan bidang pendidikan, sosial, atau kesehatan.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased text-gray-900 dark:text-gray-100 bg-background transition-colors duration-300">
      <Navbar />

      <main className="flex-grow pt-24">
        {/* Banner Title */}
        <section className="relative py-16 bg-brand-emerald-50/40 dark:bg-zinc-900/30 overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-brand-emerald-100/20 dark:bg-brand-emerald-950/10 rounded-full blur-3xl -z-10" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <span className="text-brand-amber-600 dark:text-brand-amber-500 font-bold uppercase tracking-wider text-sm">
              Ikut Berkontribusi
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mt-2">
              Salurkan Kepedulian Anda
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
              Setiap partisipasi Anda—baik berupa donasi dana maupun sumbangan tenaga sebagai relawan—adalah lentera harapan bagi masa depan mereka.
            </p>
          </div>
        </section>

        {/* Donation Form integration */}
        <DonationForm />

        {/* Trust/Transparency indicators */}
        <section className="py-12 bg-zinc-50 dark:bg-zinc-900/40 border-y border-zinc-100 dark:border-zinc-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center gap-3">
                <div className="bg-brand-emerald-100 dark:bg-brand-emerald-950/40 text-brand-emerald-700 dark:text-brand-emerald-400 p-3.5 rounded-full">
                  <BadgeCheck className="h-6 w-6" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white">Transparansi Bulanan</h4>
                <p className="text-xs text-gray-500 max-w-xs leading-relaxed">Penyusunan laporan dana masuk dan dana terpakai diumumkan secara terbuka untuk menjaga integritas.</p>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="bg-brand-emerald-100 dark:bg-brand-emerald-950/40 text-brand-emerald-700 dark:text-brand-emerald-400 p-3.5 rounded-full">
                  <ShieldAlert className="h-6 w-6" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white">Alokasi Sasaran Nyata</h4>
                <p className="text-xs text-gray-500 max-w-xs leading-relaxed">Donasi disalurkan langsung sesuai bidang alokasi yang Anda pilih untuk penerima manfaat prasejahtera.</p>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="bg-brand-emerald-100 dark:bg-brand-emerald-950/40 text-brand-emerald-700 dark:text-brand-emerald-400 p-3.5 rounded-full">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white">Keamanan Transaksi</h4>
                <p className="text-xs text-gray-500 max-w-xs leading-relaxed">Metode pembayaran resmi dengan verifikasi instan guna menjamin dana terdistribusi dengan aman.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-20 bg-white dark:bg-zinc-950">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-brand-amber-600 dark:text-brand-amber-500 font-bold uppercase tracking-wider text-sm">
                Tanya Jawab
              </span>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-2">
                Pertanyaan yang Sering Diajukan
              </h2>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 flex gap-4 items-start"
                >
                  <div className="bg-brand-emerald-100/80 dark:bg-brand-emerald-950/40 text-brand-emerald-700 dark:text-brand-emerald-400 p-2 rounded-xl shrink-0 mt-0.5">
                    <HelpCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-gray-900 dark:text-white leading-snug">
                      {faq.q}
                    </h3>
                    <p className="text-sm text-gray-650 dark:text-gray-400 mt-2.5 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
