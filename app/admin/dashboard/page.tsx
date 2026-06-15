"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Gift,
  Users,
  Briefcase,
  Settings,
  LogOut,
  TrendingUp,
  DollarSign,
  UserCheck,
  Heart,
  Search,
  CheckCircle,
  Clock,
  XCircle,
  Edit2,
  Lock,
} from "lucide-react";
import {
  Donation,
  Volunteer,
  ProgramStats,
} from "../mockData";

export default function AdminDashboard() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "donations" | "volunteers" | "programs" | "settings">("overview");

  // State bindings for MySQL data
  const [donations, setDonations] = useState<Donation[]>([]);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [programs, setPrograms] = useState<ProgramStats[]>([]);

  // Search/Filters
  const [donationFilter, setDonationFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Edit Program Modal State
  const [editingProgram, setEditingProgram] = useState<ProgramStats | null>(null);
  const [newTargetInput, setNewTargetInput] = useState("");

  // Settings credentials state
  const [midtransServerKey, setMidtransServerKey] = useState("SB-Mid-server-xxxxxxxxx");
  const [midtransClientKey, setMidtransClientKey] = useState("SB-Mid-client-yyyyyyyyy");
  const [midtransEnv, setMidtransEnv] = useState("sandbox");

  const fetchDashboardData = async () => {
    try {
      const res = await fetch("/api/admin");
      const data = await res.json();
      if (res.ok) {
        setDonations(data.donations || []);
        setVolunteers(data.volunteers || []);
        setPrograms(data.programs || []);
        if (data.settings) {
          setMidtransServerKey(data.settings.midtrans_server_key || "");
          setMidtransClientKey(data.settings.midtrans_client_key || "");
          setMidtransEnv(data.settings.midtrans_environment || "sandbox");
        }
      }
    } catch (err) {
      console.error("Gagal mengambil data dasbor:", err);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    // Authentication guard check
    const isLoggedIn = localStorage.getItem("admin_logged_in") === "true";
    if (!isLoggedIn) {
      router.push("/admin/login");
    } else {
      fetchDashboardData();
    }
  }, [router]);

  if (!isMounted) return null;

  // Actions
  const handleLogout = () => {
    localStorage.removeItem("admin_logged_in");
    router.push("/admin/login");
  };

  const handleVolunteerStatus = async (id: string, nextStatus: "APPROVED" | "REJECTED") => {
    try {
      const res = await fetch("/api/admin/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: nextStatus }),
      });
      if (res.ok) {
        fetchDashboardData();
      } else {
        alert("Gagal memperbarui status relawan.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditProgram = (prog: ProgramStats) => {
    setEditingProgram(prog);
    setNewTargetInput(prog.target.toString());
  };

  const handleSaveProgramTarget = async () => {
    if (!editingProgram) return;
    const nextVal = parseInt(newTargetInput);
    if (isNaN(nextVal) || nextVal <= 0) {
      alert("Harap masukkan nominal target yang valid.");
      return;
    }
    
    try {
      const res = await fetch("/api/admin/program", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingProgram.id, target: nextVal }),
      });
      if (res.ok) {
        setEditingProgram(null);
        fetchDashboardData();
      } else {
        alert("Gagal memperbarui target program.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveSettings = async () => {
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serverKey: midtransServerKey,
          clientKey: midtransClientKey,
          environment: midtransEnv,
        }),
      });
      if (res.ok) {
        alert("Pengaturan API Midtrans berhasil disimpan ke database!");
        fetchDashboardData();
      } else {
        const data = await res.json();
        alert(data.error || "Gagal menyimpan pengaturan.");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menyimpan pengaturan.");
    }
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(val);
  };

  // Calculations
  const totalFunds = donations
    .filter(d => d.status === "SUCCESS")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const pendingFunds = donations
    .filter(d => d.status === "PENDING")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const successCount = donations.filter(d => d.status === "SUCCESS").length;
  const volunteerApprovedCount = volunteers.filter(v => v.status === "APPROVED").length;

  const filteredDonations = donations
    .filter(d => {
      if (donationFilter === "all") return true;
      return d.status === donationFilter.toUpperCase();
    })
    .filter(d => {
      if (!searchQuery) return true;
      return d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.id.toLowerCase().includes(searchQuery.toLowerCase());
    });

  return (
    <div className="min-h-screen flex bg-zinc-100 dark:bg-zinc-950 font-sans transition-colors duration-300">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 flex flex-col justify-between p-6 shrink-0 z-20">
        <div className="space-y-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-brand-emerald-600 p-2 rounded-full text-white">
              <Heart className="h-5 w-5 fill-current" />
            </div>
            <div>
              <span className="font-extrabold text-sm text-gray-900 dark:text-white uppercase tracking-wider block">
                SA3 Admin
              </span>
              <span className="text-[10px] text-gray-400 font-bold uppercase block leading-none">
                Yayasan Sosial
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="space-y-1.5">
            {[
              { id: "overview", label: "Ringkasan", icon: LayoutDashboard },
              { id: "donations", label: "Donatur (Midtrans)", icon: Gift },
              { id: "volunteers", label: "Relawan", icon: Users },
              { id: "programs", label: "Manajemen Program", icon: Briefcase },
              { id: "settings", label: "Pengaturan API", icon: Settings },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-brand-emerald-700 text-white shadow-md"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-950 dark:text-gray-400 dark:hover:bg-zinc-800/50 dark:hover:text-white"
                  }`}
                >
                  <Icon className="h-4.5 w-4.5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 py-3 px-4 rounded-xl text-sm font-semibold text-red-650 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/20 transition-all duration-200"
        >
          <LogOut className="h-4.5 w-4.5" />
          Keluar (Logout)
        </button>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header bar */}
        <header className="h-16 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between px-8 z-10">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">
            {activeTab === "overview" && "Dasbor Ringkasan"}
            {activeTab === "donations" && "Manajemen Transaksi Donasi"}
            {activeTab === "volunteers" && "Pendaftaran Relawan Sosial"}
            {activeTab === "programs" && "Sasaran Target Program"}
            {activeTab === "settings" && "Konfigurasi Gateway Midtrans"}
          </h2>

          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-brand-emerald-100 text-brand-emerald-800 dark:bg-brand-emerald-950/60 dark:text-brand-emerald-400 border border-brand-emerald-200 dark:border-brand-emerald-800">
              Sistem Aktif
            </span>
            <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-zinc-800 flex items-center justify-center font-bold text-xs">
              AD
            </div>
          </div>
        </header>

        {/* Scrollable Panel content */}
        <main className="flex-1 p-8 overflow-y-auto">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-8 animate-fade-in-up">
              
              {/* Stat Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Donasi Sukses</span>
                    <div className="p-2 rounded-xl bg-brand-emerald-50 dark:bg-brand-emerald-950/40 text-brand-emerald-700 dark:text-brand-emerald-450">
                      <DollarSign className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                    {formatCurrency(totalFunds)}
                  </h3>
                  <p className="text-[10px] text-gray-400 font-semibold uppercase">{successCount} Transaksi Berhasil</p>
                </div>

                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Donasi Tertunda (Pending)</span>
                    <div className="p-2 rounded-xl bg-brand-amber-50 dark:bg-brand-amber-950/30 text-brand-amber-600 dark:text-brand-amber-500">
                      <Clock className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                    {formatCurrency(pendingFunds)}
                  </h3>
                  <p className="text-[10px] text-gray-400 font-semibold uppercase">Menunggu Pembayaran Midtrans</p>
                </div>

                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Relawan Disetujui</span>
                    <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400">
                      <UserCheck className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                    {volunteerApprovedCount} <span className="text-sm text-gray-400 font-normal">Orang</span>
                  </h3>
                  <p className="text-[10px] text-gray-400 font-semibold uppercase">Dari {volunteers.length} Pendaftar</p>
                </div>

                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Target Ketercapaian</span>
                    <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/20 text-purple-700 dark:text-purple-400">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                    63%
                  </h3>
                  <p className="text-[10px] text-gray-400 font-semibold uppercase">Rata-rata Pendanaan Aktif</p>
                </div>
              </div>

              {/* Chart & Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* SVG Chart Block */}
                <div className="lg:col-span-2 bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 dark:text-white">Tren Donasi Bulanan</h4>
                    <p className="text-xs text-gray-400">Statistik dana terhimpun per bulan tahun 2026 (dalam Juta Rp)</p>
                  </div>
                  
                  {/* SVG Chart Representation */}
                  <div className="h-60 w-full relative mt-6">
                    <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
                      {/* Grid lines */}
                      <line x1="0" y1="50" x2="500" y2="50" stroke="#f1f5f9" strokeWidth="1" className="dark:stroke-zinc-800" />
                      <line x1="0" y1="100" x2="500" y2="100" stroke="#f1f5f9" strokeWidth="1" className="dark:stroke-zinc-800" />
                      <line x1="0" y1="150" x2="500" y2="150" stroke="#f1f5f9" strokeWidth="1" className="dark:stroke-zinc-800" />
                      
                      {/* Chart Line */}
                      <path
                        d="M 20 180 Q 100 130 180 140 T 340 70 T 480 30"
                        fill="none"
                        stroke="#16a34a"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                      {/* Area Fill */}
                      <path
                        d="M 20 180 Q 100 130 180 140 T 340 70 T 480 30 L 480 200 L 20 200 Z"
                        fill="url(#grad)"
                        opacity="0.1"
                      />
                      
                      {/* Gradients */}
                      <defs>
                        <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#16a34a" />
                          <stop offset="100%" stopColor="#16a34a" stopOpacity="0" />
                        </linearGradient>
                      </defs>

                      {/* Dots on points */}
                      <circle cx="20" cy="180" r="5" fill="#16a34a" />
                      <circle cx="180" cy="140" r="5" fill="#16a34a" />
                      <circle cx="340" cy="70" r="5" fill="#16a34a" />
                      <circle cx="480" cy="30" r="5" fill="#16a34a" />
                    </svg>
                    
                    {/* Month Labels */}
                    <div className="flex justify-between text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-2 px-2">
                      <span>Jan</span>
                      <span>Mar</span>
                      <span>Mei</span>
                      <span>Jun (Aksi)</span>
                    </div>
                  </div>
                </div>

                {/* Recent volunteers applications */}
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 dark:text-white">Pendaftar Relawan Terbaru</h4>
                    <p className="text-xs text-gray-400 mb-4">Pengajuan masuk dalam 48 jam terakhir</p>
                    
                    <div className="space-y-4">
                      {volunteers.slice(0, 2).map((v) => (
                        <div key={v.id} className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-950/60 rounded-xl border border-zinc-100 dark:border-zinc-900">
                          <div className="h-9 w-9 rounded-full bg-brand-emerald-100 dark:bg-brand-emerald-950/40 text-brand-emerald-700 dark:text-brand-emerald-450 flex items-center justify-center font-bold text-xs">
                            {v.name.split(" ").map(n => n[0]).join("")}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold text-gray-900 dark:text-white truncate">{v.name}</p>
                            <p className="text-[10px] text-gray-400 capitalize">{v.interestArea === "asah" ? "Silih Asah (Pendidikan)" : v.interestArea === "asih" ? "Silih Asih (Sosial)" : "Silih Asuh (Kesehatan)"}</p>
                          </div>
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                            v.status === "PENDING" ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"
                          }`}>
                            {v.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab("volunteers")}
                    className="mt-6 w-full text-center text-xs font-bold text-brand-emerald-700 hover:text-brand-emerald-800 dark:text-brand-emerald-400 transition-colors duration-200"
                  >
                    Lihat Semua Relawan →
                  </button>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: DONATIONS LIST */}
          {activeTab === "donations" && (
            <div className="space-y-6 animate-fade-in-up">
              
              {/* Filter controls */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-gray-200 dark:border-zinc-800">
                <div className="relative w-full sm:w-80">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Search className="h-4.5 w-4.5" />
                  </div>
                  <input
                    type="text"
                    placeholder="Cari ID transaksi atau nama..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-gray-900 dark:text-white focus:ring-1 focus:ring-brand-emerald-500 focus:border-brand-emerald-500 text-xs font-medium"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Status Bayar:</span>
                  <div className="flex rounded-lg border border-gray-200 dark:border-zinc-800 overflow-hidden bg-zinc-50 dark:bg-zinc-950 p-1">
                    {[
                      { id: "all", label: "Semua" },
                      { id: "success", label: "Sukses" },
                      { id: "pending", label: "Pending" },
                      { id: "failed", label: "Gagal" },
                    ].map(f => (
                      <button
                        key={f.id}
                        onClick={() => setDonationFilter(f.id)}
                        className={`text-xs font-bold px-3 py-1 rounded-md transition-all duration-200 ${
                          donationFilter === f.id
                            ? "bg-brand-emerald-700 text-white shadow-sm"
                            : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Donations Grid Table */}
              <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-zinc-50 dark:bg-zinc-950/80 border-b border-gray-200 dark:border-zinc-850 text-xs font-bold text-gray-400 uppercase tracking-widest">
                        <th className="py-4 px-6">ID Transaksi</th>
                        <th className="py-4 px-6">Donatur</th>
                        <th className="py-4 px-6">Nominal</th>
                        <th className="py-4 px-6">Program Pilihan</th>
                        <th className="py-4 px-6">Metode</th>
                        <th className="py-4 px-6">Status</th>
                        <th className="py-4 px-6">Waktu</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-150 dark:divide-zinc-800/80 text-xs font-medium text-gray-700 dark:text-gray-300">
                      {filteredDonations.length > 0 ? (
                        filteredDonations.map((d) => (
                          <tr key={d.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-850/30 transition-colors">
                            <td className="py-4.5 px-6 font-mono text-brand-emerald-700 dark:text-brand-emerald-450 font-bold">{d.id}</td>
                            <td className="py-4.5 px-6">
                              <div>
                                <p className="font-bold text-gray-900 dark:text-white">{d.name}</p>
                                <p className="text-[10px] text-gray-450 mt-0.5">{d.email}</p>
                              </div>
                            </td>
                            <td className="py-4.5 px-6 font-extrabold text-gray-900 dark:text-white">
                              {formatCurrency(d.amount)}
                            </td>
                            <td className="py-4.5 px-6 font-semibold">{d.program}</td>
                            <td className="py-4.5 px-6 text-gray-500 uppercase">{d.paymentMethod}</td>
                            <td className="py-4.5 px-6">
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                d.status === "SUCCESS"
                                  ? "bg-green-100 text-green-800 dark:bg-green-950/50 dark:text-green-400"
                                  : d.status === "PENDING"
                                  ? "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-400"
                                  : "bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-400"
                              }`}>
                                {d.status === "SUCCESS" && <CheckCircle className="h-3 w-3" />}
                                {d.status === "PENDING" && <Clock className="h-3 w-3" />}
                                {d.status === "FAILED" && <XCircle className="h-3 w-3" />}
                                {d.status}
                              </span>
                            </td>
                            <td className="py-4.5 px-6 text-gray-450">{d.date}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="py-12 text-center text-gray-400 font-bold">
                            Tidak ada data transaksi yang cocok.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: VOLUNTEERS */}
          {activeTab === "volunteers" && (
            <div className="space-y-6 animate-fade-in-up">
              
              <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-zinc-50 dark:bg-zinc-950/80 border-b border-gray-200 dark:border-zinc-850 text-xs font-bold text-gray-400 uppercase tracking-widest">
                        <th className="py-4 px-6">Pendaftar</th>
                        <th className="py-4 px-6">Kontak</th>
                        <th className="py-4 px-6">Minat Bidang</th>
                        <th className="py-4 px-6">Motivasi</th>
                        <th className="py-4 px-6">Status</th>
                        <th className="py-4 px-6">Aksi Persetujuan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-150 dark:divide-zinc-800/80 text-xs font-medium text-gray-700 dark:text-gray-300">
                      {volunteers.map((v) => (
                        <tr key={v.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-850/30 transition-colors">
                          <td className="py-5 px-6">
                            <div>
                              <p className="font-bold text-gray-900 dark:text-white">{v.name}</p>
                              <p className="text-[10px] text-gray-400 mt-0.5">Terdaftar: {v.date}</p>
                            </div>
                          </td>
                          <td className="py-5 px-6">
                            <p>{v.email}</p>
                            <p className="text-gray-400 mt-0.5">{v.phone}</p>
                          </td>
                          <td className="py-5 px-6 font-semibold capitalize text-brand-emerald-700 dark:text-brand-emerald-400">
                            {v.interestArea === "asah" && "Silih Asah (Pendidikan)"}
                            {v.interestArea === "asih" && "Silih Asih (Sosial)"}
                            {v.interestArea === "asuh" && "Silih Asuh (Kesehatan)"}
                          </td>
                          <td className="py-5 px-6 max-w-xs truncate text-gray-400" title={v.motivation}>
                            {v.motivation || "-"}
                          </td>
                          <td className="py-5 px-6">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              v.status === "APPROVED"
                                ? "bg-green-100 text-green-800 dark:bg-green-950/50 dark:text-green-400"
                                : v.status === "PENDING"
                                ? "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-400"
                                : "bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-400"
                            }`}>
                              {v.status}
                            </span>
                          </td>
                          <td className="py-5 px-6">
                            {v.status === "PENDING" ? (
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleVolunteerStatus(v.id, "APPROVED")}
                                  className="bg-brand-emerald-700 hover:bg-brand-emerald-800 text-white font-bold py-1.5 px-3 rounded-lg text-[10px] shadow-sm transition-all duration-200"
                                >
                                  Terima
                                </button>
                                <button
                                  onClick={() => handleVolunteerStatus(v.id, "REJECTED")}
                                  className="bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-300 font-bold py-1.5 px-3 rounded-lg text-[10px] transition-all duration-200"
                                >
                                  Tolak
                                </button>
                              </div>
                            ) : (
                              <span className="text-gray-400 italic text-[11px]">Selesai ditinjau</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: PROGRAMS */}
          {activeTab === "programs" && (
            <div className="space-y-6 animate-fade-in-up">
              
              <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-gray-150 dark:border-zinc-850 flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 dark:text-white">Daftar Program & Target Pendanaan</h4>
                    <p className="text-xs text-gray-400">Atur besaran target dana penggalangan secara langsung.</p>
                  </div>
                </div>

                <div className="divide-y divide-gray-150 dark:divide-zinc-800/80">
                  {programs.map((p) => {
                    const percentage = Math.min(
                      100,
                      Math.round((p.raised / p.target) * 100)
                    );

                    return (
                      <div key={p.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:bg-zinc-50/50 dark:hover:bg-zinc-850/10 transition-colors">
                        <div className="min-w-0 flex-1 space-y-1">
                          <h5 className="font-bold text-gray-900 dark:text-white text-sm">{p.title}</h5>
                          <p className="text-xs text-gray-400">
                            Terkumpul: <strong className="text-brand-emerald-700 dark:text-brand-emerald-450">{formatCurrency(p.raised)}</strong> dari target <strong className="text-gray-600 dark:text-gray-300">{formatCurrency(p.target)}</strong>
                          </p>
                          {/* Progress bar */}
                          <div className="w-full max-w-md mt-2">
                            <div className="flex justify-between text-[10px] font-bold text-gray-400 mb-1">
                              <span>Kemajuan</span>
                              <span>{percentage}%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-brand-emerald-600 rounded-full"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => handleEditProgram(p)}
                          className="flex items-center gap-2 border border-gray-200 dark:border-zinc-800 hover:border-brand-emerald-500 hover:bg-brand-emerald-50/20 text-gray-700 dark:text-gray-300 font-bold py-2 px-4 rounded-xl text-xs shadow-sm transition-all duration-200 self-start sm:self-center"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                          Ubah Target
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Edit Modal (Popup Overlay in dashboard) */}
              {editingProgram && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in-up">
                  <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 max-w-md w-full shadow-2xl space-y-6">
                    <div>
                      <h4 className="font-bold text-lg text-gray-900 dark:text-white">Ubah Target Pendanaan</h4>
                      <p className="text-xs text-gray-400 mt-1">{editingProgram.title}</p>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Target Baru (Rp)</label>
                      <input
                        type="number"
                        value={newTargetInput}
                        onChange={(e) => setNewTargetInput(e.target.value)}
                        className="block w-full py-2.5 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-gray-900 dark:text-white font-semibold text-sm"
                      />
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={handleSaveProgramTarget}
                        className="flex-1 bg-brand-emerald-700 hover:bg-brand-emerald-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow-sm transition-all duration-200"
                      >
                        Simpan Perubahan
                      </button>
                      <button
                        onClick={() => setEditingProgram(null)}
                        className="flex-1 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-750 text-gray-700 dark:text-gray-300 font-bold py-2.5 px-4 rounded-xl text-xs transition-all duration-200"
                      >
                        Batal
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 5: SETTINGS */}
          {activeTab === "settings" && (
            <div className="space-y-6 max-w-2xl animate-fade-in-up">
              
              <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-gray-200 dark:border-zinc-800 shadow-sm space-y-6">
                <div className="flex items-center gap-3">
                  <div className="bg-brand-amber-500/20 text-brand-amber-500 p-2.5 rounded-xl">
                    <Lock className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-base">Kredensial API Midtrans</h4>
                    <p className="text-xs text-gray-450">Hubungkan dasbor ini dengan akun merchant Midtrans Anda.</p>
                  </div>
                </div>

                <div className="space-y-4 border-t border-gray-100 dark:border-zinc-900 pt-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Environment</label>
                    <select
                      value={midtransEnv}
                      onChange={(e) => setMidtransEnv(e.target.value)}
                      className="block w-full py-2.5 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-gray-900 dark:text-white font-semibold text-xs focus:ring-1 focus:ring-brand-emerald-500 focus:border-brand-emerald-500"
                    >
                      <option value="sandbox">Sandbox (Pengujian / Demo)</option>
                      <option value="production">Production (Live Pembayaran Riil)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Midtrans Client Key</label>
                    <input
                      type="text"
                      value={midtransClientKey}
                      onChange={(e) => setMidtransClientKey(e.target.value)}
                      className="block w-full py-2.5 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-gray-900 dark:text-white font-mono text-xs focus:ring-1 focus:ring-brand-emerald-500 focus:border-brand-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Midtrans Server Key</label>
                    <input
                      type="password"
                      value={midtransServerKey}
                      onChange={(e) => setMidtransServerKey(e.target.value)}
                      className="block w-full py-2.5 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-gray-900 dark:text-white font-mono text-xs focus:ring-1 focus:ring-brand-emerald-500 focus:border-brand-emerald-500"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={handleSaveSettings}
                    className="bg-brand-emerald-700 hover:bg-brand-emerald-800 text-white font-bold py-2.5 px-6 rounded-xl text-xs shadow-sm transition-all duration-200"
                  >
                    Simpan Pengaturan
                  </button>
                </div>
              </div>

            </div>
          )}

        </main>
      </div>
    </div>
  );
}
