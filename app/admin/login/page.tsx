"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, AlertCircle, Heart } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // If already logged in, skip login
    const isLoggedIn = localStorage.getItem("admin_logged_in") === "true";
    if (isLoggedIn) {
      router.push("/admin/dashboard");
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Harap lengkapi semua bidang.");
      return;
    }

    setIsSubmitting(true);

    // Simulate validation
    setTimeout(() => {
      if (username === "admin" && password === "admin123") {
        localStorage.setItem("admin_logged_in", "true");
        router.push("/admin/dashboard");
      } else {
        setError("Kredensial salah. Gunakan admin / admin123");
        setIsSubmitting(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-brand-emerald-50/50 to-white dark:from-zinc-950 dark:to-zinc-900 transition-colors duration-300 p-4">
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-brand-emerald-200/40 dark:bg-brand-emerald-950/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-brand-amber-200/30 dark:bg-brand-amber-950/10 rounded-full blur-3xl -z-10" />

      <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl shadow-xl overflow-hidden p-8 sm:p-10 transition-all duration-300">
        
        {/* Header */}
        <div className="text-center space-y-2 mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
            <div className="bg-brand-emerald-600 dark:bg-brand-emerald-700 p-1.5 rounded-full text-white shadow-sm">
              <Heart className="h-5 w-5 fill-current" />
            </div>
            <span className="font-extrabold text-sm tracking-widest text-brand-emerald-950 dark:text-brand-emerald-100 uppercase">
              Silih Asah Silih Asih Silih Asuh
            </span>
          </Link>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">Admin Panel</h1>
          <p className="text-xs text-gray-500">Masuk untuk mengelola donasi dan relawan sosial.</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 text-red-700 dark:text-red-400 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="h-4.5 w-4.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1.5 tracking-wider">Nama Pengguna (Username)</label>
            <div className="relative rounded-xl shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <User className="h-4.5 w-4.5" />
              </div>
              <input
                type="text"
                required
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:ring-2 focus:ring-brand-emerald-500 focus:border-brand-emerald-500 text-gray-900 dark:text-white font-medium text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1.5 tracking-wider">Kata Sandi (Password)</label>
            <div className="relative rounded-xl shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Lock className="h-4.5 w-4.5" />
              </div>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:ring-2 focus:ring-brand-emerald-500 focus:border-brand-emerald-500 text-gray-900 dark:text-white font-medium text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-brand-emerald-700 hover:bg-brand-emerald-800 dark:bg-brand-emerald-600 dark:hover:bg-brand-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition-all duration-200 disabled:bg-gray-400"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Memverifikasi...
              </span>
            ) : (
              "Masuk Sekarang"
            )}
          </button>
        </form>

        {/* Back Link */}
        <div className="text-center mt-6">
          <Link href="/" className="text-xs text-gray-450 hover:text-brand-emerald-600 dark:hover:text-brand-emerald-400 transition-colors duration-200">
            ← Kembali ke Beranda
          </Link>
        </div>

      </div>
    </div>
  );
}
