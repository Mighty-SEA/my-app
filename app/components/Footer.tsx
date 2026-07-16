import Link from "next/link";
import { Heart, Mail, Phone, MapPin, Globe } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="kontak" className="bg-zinc-950 text-gray-400 pt-16 pb-8 border-t border-zinc-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-zinc-900">
          
          {/* Logo & Description */}
          <div className="md:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-2 w-fit">
              <div className="bg-brand-emerald-700 p-2 rounded-full text-white shadow-md">
                <Heart className="h-5 w-5 fill-current" />
              </div>
              <div>
                <span className="font-bold text-lg text-white tracking-tight block leading-tight">
                  Silih Asah Silih Asih Silih Asuh
                </span>
                <span className="text-xs text-brand-amber-500 font-semibold uppercase tracking-wider block">
                  SA 3
                </span>
              </div>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
              Lembaga non-komersial yang terdaftar secara resmi di Kementerian Hukum dan HAM Republik Indonesia untuk berbakti di bidang kemanusiaan, sosial, pendidikan, dan kesehatan.
            </p>
            <div className="text-xs text-gray-600">
              No. Kemenkumham: AHU-0012345.AH.01.04.Tahun 2026
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider">Tautan Cepat</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-brand-emerald-400 transition-colors duration-200">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/tentang" className="hover:text-brand-emerald-400 transition-colors duration-200">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/program" className="hover:text-brand-emerald-400 transition-colors duration-200">
                  Program Aksi
                </Link>
              </li>
              <li>
                <Link href="/donasi" className="hover:text-brand-emerald-400 transition-colors duration-200">
                  Salurkan Donasi
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="hover:text-brand-emerald-400 transition-colors duration-200">
                  Hubungi Kami
                </Link>
              </li>
              <li className="pt-2 border-t border-zinc-900 mt-2">
                <Link href="/admin/login" className="text-xs text-gray-500 hover:text-brand-emerald-400 transition-colors duration-200 font-semibold">
                  Portal Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Programs */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider">Pilar Aksi Sosial</h3>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-emerald-500" />
                <Link href="/program" className="hover:text-brand-emerald-400 transition-colors duration-200">
                  Silih Asah - Pendidikan & Mentor
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                <Link href="/program" className="hover:text-brand-emerald-400 transition-colors duration-200">
                  Silih Asih - Pangan & Sosial
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-amber-500" />
                <Link href="/program" className="hover:text-brand-emerald-400 transition-colors duration-200">
                  Silih Asuh - Kesehatan & Asuhan
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact info */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider">Hubungi Kami</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-5 w-5 text-brand-emerald-500 shrink-0 mt-0.5" />
                <span className="text-gray-500">
                  Kp Kadu Nenggang Desa Pasir Huni Kecamatan Cimaung
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4.5 w-4.5 text-brand-emerald-500" />
                <span>+62 821 2161 3359</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4.5 w-4.5 text-brand-emerald-500" />
                <span>silihasahsilihasihsilihasuh@gmail.com</span>
              </li>
            </ul>

            {/* Social Media Links */}
            <div className="flex gap-4.5 pt-4">
              <a href="#" className="p-2 rounded-full bg-zinc-900 text-gray-400 hover:text-white hover:bg-brand-emerald-700 transition-all duration-200" aria-label="Facebook">
                <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="#" className="p-2 rounded-full bg-zinc-900 text-gray-400 hover:text-white hover:bg-brand-emerald-700 transition-all duration-200" aria-label="Instagram">
                <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a href="#" className="p-2 rounded-full bg-zinc-900 text-gray-400 hover:text-white hover:bg-brand-emerald-700 transition-all duration-200" aria-label="Youtube">
                <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/>
                  <polygon points="10 15 15 12 10 9 10 15"/>
                </svg>
              </a>
              <a href="#" className="p-2 rounded-full bg-zinc-900 text-gray-400 hover:text-white hover:bg-brand-emerald-700 transition-all duration-200" aria-label="Website">
                <Globe className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-xs text-gray-600">
          <p>
            © {currentYear} Yayasan Silih Asah Silih Asih Silih Asuh. Seluruh hak cipta dilindungi.
          </p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <Link href="/admin/login" className="hover:underline text-gray-500">Portal Admin</Link>
            <a href="#" className="hover:underline">Kebijakan Privasi</a>
            <a href="#" className="hover:underline">Syarat & Ketentuan</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
