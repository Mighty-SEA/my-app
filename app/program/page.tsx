"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import Link from "next/link";
import { Users, Target, Heart, CheckCircle2 } from "lucide-react";

export default function ProgramPage() {
  const [activeTab, setActiveTab] = useState("all");

  const categories = [
    { id: "all", name: "Semua Kategori" },
    { id: "pendidikan", name: "Pendidikan (Asah)" },
    { id: "sosial", name: "Sosial (Asih)" },
    { id: "kesehatan", name: "Kesehatan (Asuh)" },
  ];

  const activePrograms = [
    {
      id: "asah-1",
      title: "Beasiswa Pintar Silih Asah",
      category: "pendidikan",
      categoryName: "Pendidikan & Literasi",
      image: "/images/program_asah.png",
      description:
        "Pemberian bantuan biaya sekolah penuh, perlengkapan belajar, dan kelas pendampingan karakter bagi anak-anak yatim piatu serta dhuafa agar terhindar dari putus sekolah.",
      targetFund: 150000000,
      raisedFund: 94500000,
      beneficiaries: 120,
      beneficiaryLabel: "Anak Asuh",
    },
    {
      id: "asih-1",
      title: "Pangan Lansia Silih Asih",
      category: "sosial",
      categoryName: "Kesejahteraan Sosial",
      image: "/images/program_asih.png",
      description:
        "Penyaluran paket bahan pokok sehat bulanan dan makanan hangat berkala bagi kakek-nenek hidup mandiri yang kurang mampu serta dhuafa terlantar di pinggiran kota.",
      targetFund: 80000000,
      raisedFund: 68200000,
      beneficiaries: 450,
      beneficiaryLabel: "Lansia Dhuafa",
    },
    {
      id: "asuh-1",
      title: "Pos Sehat Ibu & Anak Silih Asuh",
      category: "kesehatan",
      categoryName: "Kesehatan Masyarakat",
      image: "/images/program_asuh.png",
      description:
        "Penyediaan pos layanan kesehatan keliling, pemeriksaan berkala untuk ibu hamil, imunisasi balita gratis, serta distribusi suplemen gizi guna mencegah stunting.",
      targetFund: 100000000,
      raisedFund: 45000000,
      beneficiaries: 300,
      beneficiaryLabel: "Ibu & Anak",
    },
  ];

  const filteredPrograms =
    activeTab === "all"
      ? activePrograms
      : activePrograms.filter((p) => p.category === activeTab);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(val);
  };

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
              Aksi Nyata & Penyaluran Sosial
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
              Kami menyalurkan dana bantuan secara terarah, terukur, dan transparan melalui program-program rutin yang berkesinambungan bagi masyarakat.
            </p>
          </div>
        </section>

        {/* Programs Listing with Filter */}
        <section className="py-20 bg-white dark:bg-zinc-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`py-2.5 px-6 rounded-full font-bold text-sm transition-all duration-200 border ${
                    activeTab === cat.id
                      ? "bg-brand-emerald-700 text-white border-brand-emerald-700 dark:bg-brand-emerald-600 dark:border-brand-emerald-600 shadow-md"
                      : "bg-zinc-50 dark:bg-zinc-900 text-gray-650 dark:text-gray-400 border-zinc-150 dark:border-zinc-800 hover:border-brand-emerald-500"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Grid display */}
            {filteredPrograms.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPrograms.map((prog) => {
                  const percentage = Math.min(
                    100,
                    Math.round((prog.raisedFund / prog.targetFund) * 100)
                  );

                  return (
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
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        <span className="absolute top-4 left-4 bg-brand-emerald-700 dark:bg-brand-emerald-600 text-white text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full">
                          {prog.categoryName}
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

                        {/* Impact Details */}
                        <div className="flex gap-4 items-center justify-between mt-6 p-3 bg-white dark:bg-zinc-950/60 rounded-2xl border border-zinc-100 dark:border-zinc-900">
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

                        {/* Progress */}
                        <div className="mt-6">
                          <div className="flex justify-between items-end mb-2">
                            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Terkumpul: <strong className="text-brand-emerald-700 dark:text-brand-emerald-400">{formatCurrency(prog.raisedFund)}</strong>
                            </span>
                            <span className="text-sm font-bold text-brand-emerald-800 dark:text-brand-emerald-400">
                              {percentage}%
                            </span>
                          </div>
                          <div className="w-full h-2.5 bg-gray-150 dark:bg-zinc-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-brand-emerald-600 to-brand-amber-500 rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>

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
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">Program pada kategori ini belum aktif.</p>
              </div>
            )}

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
