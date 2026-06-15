import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import { Award, Compass, Heart, Users, Target } from "lucide-react";

export default function TentangPage() {
  const team = [
    {
      name: "Drs. H. Dadang Hermawan, M.Si.",
      role: "Ketua Dewan Pembina",
      description: "Lebih dari 15 tahun mengabdi di bidang pemberdayaan masyarakat Jawa Barat.",
    },
    {
      name: "Siti Rahmawati, S.Sos.",
      role: "Ketua Umum Yayasan",
      description: "Fokus pada penguatan kurikulum pendidikan alternatif anak prasejahtera.",
    },
    {
      name: "dr. Ahmad Gunawan",
      role: "Direktur Program Medis (Silih Asuh)",
      description: "Mendedikasikan karir medisnya untuk menuntaskan stunting dan kesehatan ibu hamil.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased text-gray-900 dark:text-gray-100 bg-background transition-colors duration-300">
      <Navbar />

      <main className="flex-grow pt-24">
        {/* Banner Title */}
        <section className="relative py-20 bg-brand-emerald-50/40 dark:bg-zinc-900/30 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-emerald-100/30 dark:bg-brand-emerald-950/20 rounded-full blur-3xl -z-10" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <span className="text-brand-amber-600 dark:text-brand-amber-500 font-bold uppercase tracking-wider text-sm">
              Tentang Kami
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mt-2">
              Profil Yayasan
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
              Mengenal lebih dekat sejarah, visi, misi, dan tim yang menggerakkan roda kepedulian sosial di Yayasan Silih Asah Silih Asih Silih Asuh.
            </p>
          </div>
        </section>

        {/* History & Philosophy */}
        <section className="py-20 bg-white dark:bg-zinc-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Image */}
              <div className="lg:col-span-5 relative w-full h-[350px] sm:h-[450px] rounded-3xl overflow-hidden shadow-xl border border-gray-150 dark:border-zinc-800">
                <Image
                  src="/images/hero_community.png"
                  alt="Masyarakat Yayasan"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Right Column: Narrative */}
              <div className="lg:col-span-7 space-y-6">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Sejarah & Nilai Dasar Kami
                </h2>
                <p className="text-gray-600 dark:text-gray-450 leading-relaxed">
                  Yayasan **Silih Asah Silih Asih Silih Asuh** didirikan sebagai wadah pengabdian sosial non-komersial berlandaskan falsafah hidup Sunda. Filosofi ini mengajarkan pentingnya keselarasan hubungan antar-manusia melalui tindakan saling mendidik, saling mengasihi, dan saling mengasuh.
                </p>
                <p className="text-gray-600 dark:text-gray-455 leading-relaxed">
                  Berawal dari perkumpulan kecil sukarelawan di Bandung yang membagikan buku bacaan dan makanan kepada anak-anak jalanan, kami kini berkembang menjadi yayasan resmi berbadan hukum yang mendampingi ribuan keluarga prasejahtera di berbagai pelosok daerah.
                </p>

                {/* Core Pillars breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-100 dark:border-zinc-900">
                  <div className="flex flex-col gap-1.5">
                    <span className="font-bold text-brand-emerald-700 dark:text-brand-emerald-400">Silih Asah</span>
                    <span className="text-xs text-gray-500">Mencerdaskan kehidupan melalui pendidikan berkualitas dan pelatihan keahlian.</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="font-bold text-red-650 dark:text-red-400">Silih Asih</span>
                    <span className="text-xs text-gray-500">Menumbuhkan rasa cinta kasih lewat santunan dan pemenuhan pangan sandang pangan.</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="font-bold text-brand-amber-600 dark:text-brand-amber-500">Silih Asuh</span>
                    <span className="text-xs text-gray-500">Menjaga dan membimbing moral serta kesehatan berkelanjutan.</span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-20 bg-brand-emerald-50/20 dark:bg-zinc-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              
              {/* Vision Card */}
              <div className="bg-white dark:bg-zinc-900 p-8 sm:p-10 rounded-3xl shadow-md border border-gray-100 dark:border-zinc-800/80 space-y-4">
                <div className="bg-brand-emerald-100 dark:bg-brand-emerald-950/40 text-brand-emerald-700 dark:text-brand-emerald-450 p-3 rounded-2xl w-fit">
                  <Compass className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Visi Kami</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                  Menjadi lembaga sosial terpercaya yang mandiri dalam mewujudkan masyarakat Indonesia yang cerdas (Asah), penuh kasih sayang (Asih), dan sehat sejahtera (Asuh) berdasarkan nilai kekeluargaan dan kejujuran.
                </p>
              </div>

              {/* Mission Card */}
              <div className="bg-white dark:bg-zinc-900 p-8 sm:p-10 rounded-3xl shadow-md border border-gray-100 dark:border-zinc-800/80 space-y-4">
                <div className="bg-brand-amber-100 dark:bg-brand-amber-950/30 text-brand-amber-600 dark:text-brand-amber-500 p-3 rounded-2xl w-fit">
                  <Target className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Misi Kami</h3>
                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-450">
                  <li className="flex items-start gap-2">
                    <span className="h-2 w-2 rounded-full bg-brand-emerald-600 shrink-0 mt-1.5" />
                    <span>Menyelenggarakan program beasiswa sekolah dan pemberdayaan literasi untuk anak kurang mampu.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-2 w-2 rounded-full bg-brand-emerald-600 shrink-0 mt-1.5" />
                    <span>Menyalurkan bantuan pangan bergizi berkala dan dukungan darurat untuk warga terpinggirkan.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-2 w-2 rounded-full bg-brand-emerald-600 shrink-0 mt-1.5" />
                    <span>Membangun pos kesehatan keliling dan memberikan bimbingan moral untuk anak masa depan bangsa.</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-20 bg-white dark:bg-zinc-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-brand-emerald-700 dark:text-brand-emerald-400 font-bold uppercase tracking-wider text-sm">
                Struktur Pengurus
              </span>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                Tokoh di Balik Yayasan
              </h2>
              <p className="text-gray-650 dark:text-gray-400 mt-3">
                Para profesional dan pegiat kemanusiaan yang berdedikasi mengawal keutuhan transparansi dan kesuksesan program sosial.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((t, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800 text-center flex flex-col justify-between"
                >
                  <div className="flex flex-col items-center">
                    <div className="h-16 w-16 rounded-full bg-brand-emerald-100 dark:bg-brand-emerald-950/40 flex items-center justify-center font-bold text-brand-emerald-800 dark:text-brand-emerald-400 text-xl shadow-inner mb-4">
                      {t.name.split(" ").slice(1, 3).map(n => n[0]).join("") || "Y"}
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">{t.name}</h3>
                    <p className="text-xs text-brand-amber-600 dark:text-brand-amber-500 font-bold uppercase tracking-widest mt-1">
                      {t.role}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 leading-relaxed max-w-xs">
                      {t.description}
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
