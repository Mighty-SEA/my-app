export interface Donation {
  id: string;
  name: string;
  email: string;
  phone: string;
  amount: number;
  program: string;
  paymentMethod: string;
  status: "SUCCESS" | "PENDING" | "FAILED";
  date: string;
  message?: string;
}

export interface Volunteer {
  id: string;
  name: string;
  email: string;
  phone: string;
  interestArea: "asah" | "asih" | "asuh";
  status: "APPROVED" | "PENDING" | "REJECTED";
  date: string;
  motivation?: string;
}

export interface ProgramStats {
  id: string;
  title: string;
  target: number;
  raised: number;
}

export const initialDonations: Donation[] = [
  {
    id: "TRX-10924",
    name: "Budi Santoso",
    email: "budi.santoso@gmail.com",
    phone: "08123456789",
    amount: 250000,
    program: "Beasiswa Pintar Silih Asah",
    paymentMethod: "QRIS / GoPay",
    status: "SUCCESS",
    date: "2026-06-15 11:24",
    message: "Semoga lancar beasiswanya untuk anak-anak asuh.",
  },
  {
    id: "TRX-10923",
    name: "Siti Aminah",
    email: "siti.aminah@yahoo.com",
    phone: "08567890123",
    amount: 100000,
    program: "Pangan Lansia Silih Asih",
    paymentMethod: "Transfer Bank BCA",
    status: "SUCCESS",
    date: "2026-06-15 09:15",
  },
  {
    id: "TRX-10922",
    name: "Hendra Wijaya",
    email: "hendra.w@gmail.com",
    phone: "08789012345",
    amount: 500000,
    program: "Pos Sehat Ibu & Anak Silih Asuh",
    paymentMethod: "Transfer Bank Mandiri",
    status: "PENDING",
    date: "2026-06-14 20:30",
    message: "Untuk program kesehatan stunting.",
  },
  {
    id: "TRX-10921",
    name: "Dewi Lestari",
    email: "dewi.l@outlook.com",
    phone: "08212345678",
    amount: 50000,
    program: "Donasi Umum",
    paymentMethod: "QRIS / GoPay",
    status: "SUCCESS",
    date: "2026-06-14 15:45",
  },
  {
    id: "TRX-10920",
    name: "Rian Hidayat",
    email: "rian.h@gmail.com",
    phone: "08198765432",
    amount: 1000000,
    program: "Beasiswa Pintar Silih Asah",
    paymentMethod: "Transfer Bank BCA",
    status: "FAILED",
    date: "2026-06-13 10:10",
  },
];

export const initialVolunteers: Volunteer[] = [
  {
    id: "VOL-001",
    name: "Rizky Ramadhan",
    email: "rizky.r@gmail.com",
    phone: "08122334455",
    interestArea: "asah",
    status: "PENDING",
    date: "2026-06-15 08:30",
    motivation: "Saya mahasiswa keguruan dan ingin mengabdi mengajarkan matematika dasar bagi anak jalanan.",
  },
  {
    id: "VOL-002",
    name: "Dr. Farhan Syah",
    email: "farhan.syah@klinik.co.id",
    phone: "08134455667",
    interestArea: "asuh",
    status: "APPROVED",
    date: "2026-06-14 11:20",
    motivation: "Ingin berkontribusi sebagai tim medis posyandu bulanan.",
  },
  {
    id: "VOL-003",
    name: "Indah Permata",
    email: "indah.p@gmail.com",
    phone: "08577788990",
    interestArea: "asih",
    status: "APPROVED",
    date: "2026-06-12 16:45",
    motivation: "Siap membantu mengemas dan mendistribusikan sembako lansia.",
  },
];

export const initialPrograms: ProgramStats[] = [
  {
    id: "asah",
    title: "Beasiswa Pintar Silih Asah",
    target: 150000000,
    raised: 94500000,
  },
  {
    id: "asih",
    title: "Pangan Lansia Silih Asih",
    target: 80000000,
    raised: 68200000,
  },
  {
    id: "asuh",
    title: "Pos Sehat Ibu & Anak Silih Asuh",
    target: 100000000,
    raised: 45000000,
  },
];
