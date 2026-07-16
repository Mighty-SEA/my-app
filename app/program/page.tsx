"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function ProgramPage() {
  const activePrograms = [
    {
      id: "asah-1",
      title: "Berbagi kepada Anak Yatim",
      image: "/images/WhatsApp Image 2026-07-14 at 16.32.15.png",
      description:
        "Menyalurkan bantuan berupa biaya sekolah, perlengkapan belajar, dan pendampingan karakter bagi anak-anak yatim piatu agar tetap mendapatkan pendidikan dan masa depan yang layak.",
    },
    {
      id: "asih-1",
      title: "Donasi untuk Lansia",
      image: "/images/WhatsApp Image 2026-07-14 at 16.32.58.png",
      description:
        "Memberikan donasi berupa paket bahan pokok sehat bulanan dan makanan hangat berkala kepada para lansia yang hidup mandiri dalam keterbatasan dan membutuhkan perhatian kita.",
    },
    {
      id: "asuh-1",
      title: "Berbagi kepada Masyarakat yang Membutuhkan",
      image: "/images/WhatsApp Image 2026-07-14 at 16.31.33.png",
      description:
        "Menjangkau masyarakat yang membutuhkan melalui layanan kesehatan keliling, imunisasi gratis, distribusi suplemen gizi, serta bantuan sembako bagi keluarga prasejahtera.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased text-gray-900 dark:text-gray-100 bg-background transition-colors duration-300">
      <Navbar />

      <main className="flex-grow pt-24">
        {/* Banner Title */}
        <section className="relative py-20 bg-brand-emerald-50/40 dark:bg-zinc-900/30 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-amber-100/20 dark:bg-brand-amber-950/10 rounded-full blur-3xl -z-10" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <span className="text-brand-emerald-700 dark:text-brand-emerald-400 font-bold uppercase tracking-wider text-sm">
              Program Kemanusiaan
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mt-2">
              Aksi Nyata &amp; Penyaluran Sosial
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
              Kami menyalurkan dana bantuan secara terarah, terukur, dan transparan melalui program-program rutin yang berkesinambungan bagi masyarakat.
            </p>
          </div>
        </section>

        {/* Programs Listing */}
        <section className="py-20 bg-white dark:bg-zinc-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Grid display */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activePrograms.map((prog, idx) => (
                <div
                  key={prog.id}
                  className="bg-zinc-50 dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-zinc-100 dark:border-zinc-800/80 transition-all duration-300 group flex flex-col h-full"
                >
                  {/* Image */}
                  <div className="relative h-60 w-full overflow-hidden">
                    <Image
                      src={prog.image}
                      alt={prog.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={idx < 3}
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-brand-emerald-700 dark:group-hover:text-brand-emerald-500 transition-colors duration-200">
                      {prog.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-3 leading-relaxed flex-1">
                      {prog.description}
                    </p>



                    {/* CTA button */}
                    <div className="mt-8 pt-4 border-t border-gray-100 dark:border-zinc-800/85">
                      <Link
                        href="/donasi"
                        className="flex items-center justify-center gap-2 w-full bg-zinc-900 hover:bg-brand-emerald-700 dark:bg-zinc-800 dark:hover:bg-brand-emerald-600 text-white font-semibold py-3 px-4 rounded-xl shadow-sm hover:shadow transition-all duration-200"
                      >
                        <Heart className="h-4.5 w-4.5 fill-current" />
                        Dukung Program
                      </Link>
                    </div>

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
