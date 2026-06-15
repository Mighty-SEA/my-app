"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock } from "lucide-react";

export default function KontakPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert("Harap lengkapi nama, email, dan pesan Anda.");
      return;
    }

    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased text-gray-900 dark:text-gray-100 bg-background transition-colors duration-300">
      <Navbar />

      <main className="flex-grow pt-24">
        {/* Banner Title */}
        <section className="relative py-16 bg-brand-emerald-50/40 dark:bg-zinc-900/30 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-emerald-100/30 dark:bg-brand-emerald-950/20 rounded-full blur-3xl -z-10" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <span className="text-brand-amber-600 dark:text-brand-amber-500 font-bold uppercase tracking-wider text-sm">
              Hubungi Kami
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mt-2">
              Sekretariat Yayasan
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
              Hubungi kami jika memiliki pertanyaan seputar donasi, kemitraan, program lapangan, atau pendaftaran relawan sosial.
            </p>
          </div>
        </section>

        {/* Contact Form & Info Grid */}
        <section className="py-20 bg-white dark:bg-zinc-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Column: Contact details & Map */}
              <div className="lg:col-span-5 space-y-8">
                
                {/* Details list */}
                <div className="bg-zinc-50 dark:bg-zinc-900/50 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Kontak Resmi</h3>
                  
                  <ul className="space-y-5">
                    <li className="flex items-start gap-4">
                      <div className="bg-brand-emerald-100/80 dark:bg-brand-emerald-950/40 text-brand-emerald-700 dark:text-brand-emerald-400 p-2.5 rounded-xl shrink-0 mt-0.5">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Kantor Pusat</p>
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-1">
                          Jl. Silih Asih Raya No. 45, Coblong, Kota Bandung, Jawa Barat 40135
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="bg-brand-emerald-100/80 dark:bg-brand-emerald-950/40 text-brand-emerald-700 dark:text-brand-emerald-400 p-2.5 rounded-xl shrink-0 mt-0.5">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Telepon / WhatsApp</p>
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-1">
                          +62 812-3456-7890
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="bg-brand-emerald-100/80 dark:bg-brand-emerald-950/40 text-brand-emerald-700 dark:text-brand-emerald-400 p-2.5 rounded-xl shrink-0 mt-0.5">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Email Layanan</p>
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-1">
                          info@silihasahbihasuh.org
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="bg-brand-emerald-100/80 dark:bg-brand-emerald-950/40 text-brand-emerald-700 dark:text-brand-emerald-400 p-2.5 rounded-xl shrink-0 mt-0.5">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Jam Layanan</p>
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-1">
                          Senin - Jumat | 09.00 - 16.00 WIB
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Map Mockup */}
                <div className="relative h-64 w-full bg-zinc-150 dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-inner border border-zinc-100 dark:border-zinc-800 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-emerald-950/5 via-transparent to-transparent pointer-events-none" />
                  <div className="text-center p-6 space-y-2 relative z-10">
                    <MapPin className="h-10 w-10 text-brand-emerald-600 dark:text-brand-emerald-500 mx-auto animate-bounce" />
                    <p className="text-sm font-bold text-gray-800 dark:text-white">Yayasan Silih Asah Asih Asuh</p>
                    <p className="text-xs text-gray-400">Peta Mockup Lokasi Bandung</p>
                  </div>
                </div>

              </div>

              {/* Right Column: Contact form */}
              <div className="lg:col-span-7 bg-zinc-50 dark:bg-zinc-900 p-8 sm:p-10 rounded-3xl border border-zinc-100 dark:border-zinc-800/80 shadow-md">
                
                {isSuccess ? (
                  <div className="text-center py-12 flex flex-col items-center gap-4 animate-fade-in-up">
                    <div className="h-16 w-16 bg-brand-emerald-100 dark:bg-brand-emerald-950/50 rounded-full flex items-center justify-center text-brand-emerald-600 dark:text-brand-emerald-400">
                      <CheckCircle2 className="h-10 w-10" />
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">Pesan Anda Terkirim!</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-sm">
                        Terima kasih telah menghubungi kami. Tim sekretariat yayasan akan segera membalas email Anda dalam kurun waktu 1-2 hari kerja.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="mt-6 bg-brand-emerald-700 hover:bg-brand-emerald-800 dark:bg-brand-emerald-600 dark:hover:bg-brand-emerald-700 text-white font-semibold py-2.5 px-6 rounded-full shadow-sm"
                    >
                      Kirim Pesan Lain
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in-up">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Kirim Pesan Langsung</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Nama Lengkap</label>
                        <input
                          type="text"
                          required
                          placeholder="Nama Anda"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="block w-full py-2.5 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:ring-2 focus:ring-brand-emerald-500 focus:border-brand-emerald-500 text-gray-900 dark:text-white font-medium text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Email</label>
                        <input
                          type="email"
                          required
                          placeholder="Email Anda"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="block w-full py-2.5 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:ring-2 focus:ring-brand-emerald-500 focus:border-brand-emerald-500 text-gray-900 dark:text-white font-medium text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Subjek Pesan (Opsional)</label>
                      <input
                        type="text"
                        placeholder="Contoh: Kemitraan Program / Pertanyaan Donasi"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="block w-full py-2.5 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:ring-2 focus:ring-brand-emerald-500 focus:border-brand-emerald-500 text-gray-900 dark:text-white font-medium text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Isi Pesan</label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Tuliskan pesan atau pertanyaan Anda di sini..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="block w-full py-2.5 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:ring-2 focus:ring-brand-emerald-500 focus:border-brand-emerald-500 text-gray-900 dark:text-white font-medium text-sm"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 bg-brand-emerald-700 hover:bg-brand-emerald-800 dark:bg-brand-emerald-600 dark:hover:bg-brand-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-md disabled:bg-gray-400 transition-all duration-200"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Mengirim...
                        </span>
                      ) : (
                        <>
                          Kirim Pesan
                          <Send className="h-4 w-4" />
                        </>
                      )}
                    </button>

                  </form>
                )}

              </div>

            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
