import Image from "next/image";
import { Heart } from "lucide-react";

export default function Programs() {
  const activePrograms = [
    {
      id: "asah",
      title: "Berbagi kepada Anak Yatim",
      image: "/images/WhatsApp Image 2026-07-14 at 16.32.15.png",
      description:
        "Menyalurkan bantuan berupa biaya sekolah, perlengkapan belajar, dan pendampingan karakter bagi anak-anak yatim piatu agar tetap mendapatkan pendidikan dan masa depan yang layak.",
    },
    {
      id: "asih",
      title: "Donasi untuk Lansia",
      image: "/images/WhatsApp Image 2026-07-14 at 16.32.58.png",
      description:
        "Memberikan donasi berupa paket bahan pokok sehat bulanan dan makanan hangat berkala kepada para lansia yang hidup mandiri dalam keterbatasan dan membutuhkan perhatian kita.",
    },
    {
      id: "asuh",
      title: "Berbagi kepada Masyarakat yang Membutuhkan",
      image: "/images/WhatsApp Image 2026-07-14 at 16.31.33.png",
      description:
        "Menjangkau masyarakat yang membutuhkan melalui layanan kesehatan keliling, imunisasi gratis, distribusi suplemen gizi, serta bantuan sembako bagi keluarga prasejahtera.",
    },
  ];

  return (
    <section
      id="program"
      className="py-20 bg-brand-emerald-50/20 dark:bg-zinc-900/30 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <span className="text-brand-emerald-700 dark:text-brand-emerald-400 font-bold uppercase tracking-wider text-sm">
              Aksi Nyata Kami
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mt-2 leading-tight">
              Program Kemanusiaan yang Sedang Berjalan
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-3">
              Salurkan kepedulian Anda untuk mendukung program sosial berkelanjutan kami. Seluruh dana disalurkan secara transparan untuk pembangunan masyarakat.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex-shrink-0">
            <a
              href="#donasi"
              className="inline-flex items-center gap-2 text-brand-emerald-700 hover:text-brand-emerald-800 dark:text-brand-emerald-400 dark:hover:text-brand-emerald-300 font-semibold text-sm group"
            >
              Lihat Laporan Transparansi
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </a>
          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {activePrograms.map((prog, idx) => (
            <div
              key={prog.id}
              className="bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-100 dark:border-zinc-800/80 transition-all duration-300 group flex flex-col h-full"
            >
              {/* Program Image */}
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



                {/* Card Button */}
                <div className="mt-8 pt-4 border-t border-gray-100 dark:border-zinc-800/80">
                  <a
                    href="#donasi"
                    className="flex items-center justify-center gap-2 w-full bg-zinc-900 hover:bg-brand-emerald-700 dark:bg-zinc-800 dark:hover:bg-brand-emerald-600 text-white font-semibold py-3 px-4 rounded-xl shadow-sm hover:shadow transition-all duration-200"
                  >
                    <Heart className="h-4.5 w-4.5 fill-current" />
                    Dukung Program Ini
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
