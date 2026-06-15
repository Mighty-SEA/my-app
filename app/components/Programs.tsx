import Image from "next/image";
import { Users, Target, Heart } from "lucide-react";

export default function Programs() {
  const activePrograms = [
    {
      id: "asah",
      title: "Beasiswa Pintar Silih Asah",
      category: "Pendidikan & Literasi",
      image: "/images/program_asah.png",
      description:
        "Pemberian bantuan biaya sekolah penuh, perlengkapan belajar, dan kelas pendampingan karakter bagi anak-anak yatim piatu serta dhuafa agar terhindar dari putus sekolah.",
      targetFund: 150000000,
      raisedFund: 94500000,
      beneficiaries: 120,
      beneficiaryLabel: "Anak Asuh",
    },
    {
      id: "asih",
      title: "Pangan Lansia Silih Asih",
      category: "Kesejahteraan Sosial",
      image: "/images/program_asih.png",
      description:
        "Penyaluran paket bahan pokok sehat bulanan dan makanan hangat berkala bagi kakek-nenek hidup mandiri yang kurang mampu serta dhuafa terlantar di pinggiran kota.",
      targetFund: 80000000,
      raisedFund: 68200000,
      beneficiaries: 450,
      beneficiaryLabel: "Lansia Dhuafa",
    },
    {
      id: "asuh",
      title: "Pos Sehat Ibu & Anak Silih Asuh",
      category: "Kesehatan Masyarakat",
      image: "/images/program_asuh.png",
      description:
        "Penyediaan pos layanan kesehatan keliling, pemeriksaan berkala untuk ibu hamil, imunisasi balita gratis, serta distribusi suplemen gizi guna mencegah stunting.",
      targetFund: 100000000,
      raisedFund: 45000000,
      beneficiaries: 300,
      beneficiaryLabel: "Ibu & Anak",
    },
  ];

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(val);
  };

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
          {activePrograms.map((prog) => {
            const percentage = Math.min(
              100,
              Math.round((prog.raisedFund / prog.targetFund) * 100)
            );

            return (
              <div
                key={prog.id}
                className="bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-100 dark:border-zinc-800/80 transition-all duration-300 group flex flex-col h-full"
              >
                {/* Program Image & Category Badge */}
                <div className="relative h-60 w-full overflow-hidden">
                  <Image
                    src={prog.image}
                    alt={prog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 bg-brand-emerald-700 dark:bg-brand-emerald-600 text-white text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-md">
                    {prog.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-brand-emerald-700 dark:group-hover:text-brand-emerald-500 transition-colors duration-200">
                    {prog.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-3 leading-relaxed flex-1">
                    {prog.description}
                  </p>

                  {/* Impact quick info */}
                  <div className="flex gap-4 items-center justify-between mt-6 p-3 bg-zinc-50 dark:bg-zinc-950/60 rounded-2xl border border-zinc-100 dark:border-zinc-900">
                    <div className="flex items-center gap-2">
                      <div className="bg-brand-emerald-100/80 dark:bg-brand-emerald-950/40 p-1.5 rounded-lg text-brand-emerald-700 dark:text-brand-emerald-400">
                        <Users className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Penerima</p>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">
                          {prog.beneficiaries} {prog.beneficiaryLabel}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="bg-brand-amber-100/80 dark:bg-brand-amber-950/40 p-1.5 rounded-lg text-brand-amber-600 dark:text-brand-amber-500">
                        <Target className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Target Dana</p>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">
                          {formatCurrency(prog.targetFund)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Funding Progress */}
                  <div className="mt-6">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Terkuumpul: <strong className="text-brand-emerald-700 dark:text-brand-emerald-400">{formatCurrency(prog.raisedFund)}</strong>
                      </span>
                      <span className="text-sm font-bold text-brand-emerald-800 dark:text-brand-emerald-400">
                        {percentage}%
                      </span>
                    </div>
                    {/* Progress Bar Container */}
                    <div className="w-full h-2.5 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-brand-emerald-600 to-brand-amber-500 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>

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
            );
          })}
        </div>
      </div>
    </section>
  );
}
