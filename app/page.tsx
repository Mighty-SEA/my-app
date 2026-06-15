import Link from "next/link";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Philosophy from "./components/Philosophy";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import { HeartHandshake, GraduationCap, ShieldAlert, Sparkles, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans antialiased text-gray-900 dark:text-gray-100 bg-background transition-colors duration-300">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />

        {/* Philosophy Section */}
        <Philosophy />

        {/* Highlight Section: Ajak Bergabung (CTA) */}
        <section className="py-20 relative bg-brand-emerald-950 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] opacity-10 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-emerald-800/40 rounded-full blur-3xl -z-10" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center gap-6">
            <div className="bg-brand-amber-500/20 text-brand-amber-400 p-3.5 rounded-full w-fit shadow-inner">
              <HeartHandshake className="h-8 w-8" />
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight max-w-3xl">
              Bersama, Kita Bisa Menciptakan Perubahan Nyata
            </h2>
            
            <p className="text-gray-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              Setiap rupiah yang Anda donasikan dan setiap detik yang Anda luangkan sebagai relawan sangat berharga untuk memotong rantai kemiskinan dan memberikan masa depan yang lebih baik bagi anak-anak Indonesia.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full justify-center sm:w-auto">
              <Link
                href="/donasi"
                className="bg-brand-amber-500 hover:bg-brand-amber-600 text-gray-950 font-bold py-3.5 px-8 rounded-full shadow-lg transition-all duration-200 text-center"
              >
                Salurkan Donasi Anda
              </Link>
              <Link
                href="/donasi"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/25 font-bold py-3.5 px-8 rounded-full transition-all duration-200 text-center"
              >
                Daftar Relawan
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <Testimonials />
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
