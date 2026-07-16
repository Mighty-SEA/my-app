import { BookOpen, Heart, Users } from "lucide-react";

export default function Philosophy() {
  const pillars = [
    {
      title: "Silih Asah",
      slogan: "Saling Mengasah Pikiran & Potensi",
      description:
        "Berfokus pada berbagi kepada anak yatim melalui bantuan pendidikan, perlengkapan belajar, dan pendampingan karakter agar mereka tumbuh cerdas dan berdikari.",
      details: [
        "Berbagi kepada Anak Yatim",
        "Bantuan Biaya Sekolah",
        "Pendampingan Karakter",
      ],
      icon: BookOpen,
      colorClass: "bg-brand-emerald-50 text-brand-emerald-700 dark:bg-brand-emerald-950/40 dark:text-brand-emerald-400",
      accentBorder: "group-hover:border-brand-emerald-500",
      iconContainer: "bg-brand-emerald-100/80 dark:bg-brand-emerald-900/40",
    },
    {
      title: "Silih Asih",
      slogan: "Saling Mengasihi & Membantu Sesama",
      description:
        "Mewujudkan kepedulian melalui donasi untuk lansia yang hidup dalam keterbatasan, menyalurkan paket pangan bergizi, bantuan sosial, dan santunan kasih sayang.",
      details: [
        "Donasi untuk Lansia",
        "Paket Pangan Bergizi Bulanan",
        "Santunan & Bantuan Darurat",
      ],
      icon: Heart,
      colorClass: "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400",
      accentBorder: "group-hover:border-red-500",
      iconContainer: "bg-red-100/80 dark:bg-red-900/30",
    },
    {
      title: "Silih Asuh",
      slogan: "Saling Mengasuh & Membimbing",
      description:
        "Menjangkau masyarakat yang membutuhkan melalui layanan kesehatan keliling, imunisasi gratis, distribusi suplemen gizi, serta bantuan bagi keluarga prasejahtera.",
      details: [
        "Berbagi kepada Masyarakat",
        "Layanan Kesehatan Keliling",
        "Bantuan Sembako Keluarga",
      ],
      icon: Users,
      colorClass: "bg-brand-amber-50 text-brand-amber-700 dark:bg-brand-amber-950/30 dark:text-brand-amber-400",
      accentBorder: "group-hover:border-brand-amber-500",
      iconContainer: "bg-brand-amber-100/80 dark:bg-brand-amber-900/30",
    },
  ];

  return (
    <section
      id="filosofi"
      className="py-20 bg-white dark:bg-zinc-950 transition-colors duration-300 relative"
    >
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-amber-600 dark:text-brand-amber-500 font-bold uppercase tracking-wider text-sm">
            Filosofi & Pilar Utama
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mt-2 leading-tight">
            Tiga Nilai Luhur yang Menggerakkan Kami
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4 text-lg">
            Terinspirasi dari nilai budaya luhur Nusantara, kami bergerak dengan tiga kekuatan utama untuk membangun masyarakat yang lebih mandiri dan penuh kasih.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className={`group relative flex flex-col justify-between p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-b-4 ${pillar.accentBorder}`}
              >
                <div>
                  {/* Icon Header */}
                  <div className={`flex items-center justify-center w-14 h-14 rounded-2xl mb-6 shadow-md transition-transform duration-300 group-hover:scale-110 ${pillar.iconContainer}`}>
                    <Icon className="h-7 w-7" />
                  </div>

                  {/* Title & Slogan */}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {pillar.title}
                  </h3>
                  <p className="text-sm font-semibold text-brand-amber-600 dark:text-brand-amber-500 mb-4 uppercase tracking-wide">
                    {pillar.slogan}
                  </p>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                </div>

                {/* Bullets List */}
                <div className="border-t border-zinc-200/60 dark:border-zinc-800/80 pt-5 mt-auto">
                  <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest block mb-3">
                    Program Terkait:
                  </span>
                  <ul className="space-y-2">
                    {pillar.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 font-medium">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-emerald-600 dark:bg-brand-emerald-500" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
