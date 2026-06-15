import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Gift } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="tentang"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-brand-emerald-50/50 via-white to-transparent dark:from-brand-emerald-950/20 dark:via-zinc-950 dark:to-transparent"
    >
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-brand-emerald-200/40 dark:bg-brand-emerald-900/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-brand-amber-200/30 dark:bg-brand-amber-900/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left animate-fade-in-up">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-brand-emerald-100 text-brand-emerald-800 dark:bg-brand-emerald-950 dark:text-brand-emerald-300 w-fit">
              Yayasan Non-Komersial & Sosial
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-gray-900 dark:text-white">
              Menabur Kebaikan, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-emerald-700 to-brand-amber-600 dark:from-brand-emerald-500 dark:to-brand-amber-500">
                Menumbuhkan Harapan
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl leading-relaxed">
              Selamat datang di **Yayasan Silih Asah Silih Asih Silih Asuh**. Berlandaskan nilai kekeluargaan, kepedulian sosial, dan dedikasi kemanusiaan, kami berkomitmen mendampingi masyarakat prasejahtera untuk tumbuh berdikari melalui pendidikan, bantuan sosial, dan pengasuhan moral.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Link
                href="/donasi"
                className="flex items-center justify-center gap-2 bg-brand-emerald-700 hover:bg-brand-emerald-800 dark:bg-brand-emerald-600 dark:hover:bg-brand-emerald-700 text-white font-semibold py-3.5 px-8 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
              >
                <Gift className="h-5 w-5" />
                Salurkan Donasi
              </Link>
              <Link
                href="/program"
                className="flex items-center justify-center gap-2 border border-gray-300 dark:border-zinc-800 hover:border-brand-emerald-500 hover:bg-brand-emerald-50/20 dark:hover:bg-zinc-900/50 text-gray-700 dark:text-gray-300 font-semibold py-3.5 px-8 rounded-full transition-all duration-200"
              >
                Pelajari Program
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-gray-100 dark:border-zinc-900 mt-6">
              <div>
                <p className="text-3xl font-extrabold text-brand-emerald-800 dark:text-brand-emerald-400">
                  5,000+
                </p>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Penerima Manfaat
                </p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-brand-emerald-800 dark:text-brand-emerald-400">
                  25+
                </p>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Program Aktif
                </p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-brand-emerald-800 dark:text-brand-emerald-400">
                  180+
                </p>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Relawan Terlatih
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Image Card */}
          <div className="lg:col-span-5 relative w-full h-[350px] sm:h-[450px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-white/20 dark:border-zinc-800/30 group">
            <Image
              src="/images/hero_community.png"
              alt="Yayasan Silih Asah Silih Asih Silih Asuh Community"
              fill
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Soft overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
            
            {/* Card Info Overlay */}
            <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border border-white/20 shadow-xl">
              <p className="text-xs font-bold text-brand-amber-600 dark:text-brand-amber-500 uppercase tracking-wide">
                Aksi Nyata
              </p>
              <p className="text-base font-bold text-gray-900 dark:text-white mt-1">
                "Kemanusiaan sejati adalah saat kita bisa mengasah pikiran, mengasihi sesama, dan mengasuh masa depan bersama."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
