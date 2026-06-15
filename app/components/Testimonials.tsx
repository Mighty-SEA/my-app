import { Quote, MessageSquare } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "Mengajar anak-anak asuh di program Silih Asah adalah salah satu keputusan terbaik hidup saya. Melihat binar mata mereka saat memahami materi pelajaran memberikan kepuasan batin yang tidak ternilai dengan materi.",
      name: "Ahmad Fauzi",
      role: "Relawan Pengajar (Silih Asah)",
      avatarInitials: "AF",
      bgClass: "bg-brand-emerald-50/40 dark:bg-brand-emerald-950/20 border-brand-emerald-100 dark:border-brand-emerald-900/40",
      iconColor: "text-brand-emerald-600 dark:text-brand-emerald-400",
    },
    {
      quote:
        "Saya tinggal sendiri dan fisik sudah lemah untuk bekerja berat. Bantuan pangan bulanan dari Dapur Sosial Silih Asih sangat menyambung hidup saya. Semoga Allah membalas kebaikan semua donatur yayasan ini.",
      name: "Ibu Sumiati",
      role: "Penerima Manfaat Lansia (Silih Asih)",
      avatarInitials: "IS",
      bgClass: "bg-red-50/30 dark:bg-red-950/10 border-red-100/60 dark:border-red-900/25",
      iconColor: "text-red-500",
    },
    {
      quote:
        "Melalui Pos Sehat Silih Asuh, kami tidak hanya memeriksa kesehatan fisik balita, tapi juga memberikan penyuluhan nutrisi terpadu pada ibu hamil di desa. Kami ingin memastikan anak-anak kita tumbuh bebas dari stunting.",
      name: "dr. Rina Mariana",
      role: "Relawan Tim Medis (Silih Asuh)",
      avatarInitials: "RM",
      bgClass: "bg-brand-amber-50/40 dark:bg-brand-amber-950/20 border-brand-amber-100 dark:border-brand-amber-900/40",
      iconColor: "text-brand-amber-600 dark:text-brand-amber-500",
    },
  ];

  return (
    <section
      id="testimoni"
      className="py-20 bg-brand-emerald-50/20 dark:bg-zinc-900/30 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-emerald-100/80 text-brand-emerald-800 dark:bg-brand-emerald-950/60 dark:text-brand-emerald-400 mb-3">
            <MessageSquare className="h-3.5 w-3.5" />
            Kisah Dampak & Kebaikan
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mt-2 leading-tight">
            Cerita dari Sahabat & Relawan Kami
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4">
            Dengarkan langsung suara dari mereka yang mendedikasikan tenaga dan mereka yang merasakan dampak langsung program sosial yayasan.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-3xl border bg-white dark:bg-zinc-900 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative ${t.bgClass}`}
            >
              {/* Decorative Quote Icon */}
              <div className="absolute top-6 right-8 opacity-10 dark:opacity-20">
                <Quote className={`h-12 w-12 ${t.iconColor}`} />
              </div>

              {/* Quote Content */}
              <div>
                <p className="text-gray-700 dark:text-gray-300 italic text-sm leading-relaxed mb-6 font-medium relative z-10">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-zinc-800/80">
                {/* Avatar circle */}
                <div className={`h-11 w-11 rounded-full flex items-center justify-center font-bold text-sm shadow-inner ${
                  idx === 0 
                    ? "bg-brand-emerald-100 text-brand-emerald-800 dark:bg-brand-emerald-900 dark:text-brand-emerald-100" 
                    : idx === 1
                    ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                    : "bg-brand-amber-100 text-brand-amber-800 dark:bg-brand-amber-900 dark:text-brand-amber-100"
                }`}>
                  {t.avatarInitials}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
                    {t.name}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
