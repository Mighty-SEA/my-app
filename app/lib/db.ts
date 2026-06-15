import mysql from "mysql2/promise";
import { initialDonations, initialVolunteers, initialPrograms, Donation, Volunteer, ProgramStats } from "../admin/mockData";
import fs from "fs";
import path from "path";

let pool: mysql.Pool | null = null;
let isFallbackActive = false;

// In-memory fallback mock storage (active if DB connection fails)
let mockDonations = [...initialDonations];
let mockVolunteers = [...initialVolunteers];
let mockPrograms = [...initialPrograms];
const FALLBACK_FILE = path.join(process.cwd(), "fallback_settings.json");

function getFallbackSettings() {
  try {
    if (fs.existsSync(FALLBACK_FILE)) {
      const data = fs.readFileSync(FALLBACK_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Gagal membaca berkas pengaturan fallback:", err);
  }
  return [
    { key_name: "midtrans_server_key", value_text: "SB-Mid-server-xxxxxxxxx" },
    { key_name: "midtrans_client_key", value_text: "SB-Mid-client-yyyyyyyyy" },
    { key_name: "midtrans_environment", value_text: "sandbox" },
  ];
}

function saveFallbackSettings(settings: any[]) {
  try {
    fs.writeFileSync(FALLBACK_FILE, JSON.stringify(settings, null, 2), "utf-8");
  } catch (err) {
    console.error("Gagal menulis berkas pengaturan fallback:", err);
  }
}

let initPromise: Promise<void> | null = null;

async function initializeDatabase() {
  try {
    const host = process.env.MYSQL_HOST;
    const user = process.env.MYSQL_USER;
    const password = process.env.MYSQL_PASSWORD;
    const database = process.env.MYSQL_DATABASE;
    const port = parseInt(process.env.MYSQL_PORT || "3306");

    // Only attempt database connection if credentials are set
    if (host && user && database) {
      // 1. Ensure the database itself exists on the server
      const tempConn = await mysql.createConnection({ host, user, password, port });
      await tempConn.query(`CREATE DATABASE IF NOT EXISTS \`${database}\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
      await tempConn.end();
      console.log(`[MySQL] Database \`${database}\` verified/created successfully.`);

      // 2. Initialize connection pool
      pool = mysql.createPool({
        host,
        user,
        password,
        database,
        port,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });

      // 3. Run auto-migrations (create tables and seed data)
      const schemaPath = path.join(process.cwd(), "schema.sql");
      if (fs.existsSync(schemaPath)) {
        const sqlContent = fs.readFileSync(schemaPath, "utf-8");
        const statements = sqlContent
          .split(/;\s*$/m)
          .map(s => s.trim())
          .filter(s => s.length > 0);

        for (const statement of statements) {
          // Skip DB selection and creation commands in migration loop
          if (statement.toLowerCase().startsWith("create database") || statement.toLowerCase().startsWith("use ")) {
            continue;
          }
          try {
            await pool.query(statement);
          } catch (err: any) {
            console.error(`[MySQL Migration Error] Statement failed:`, statement.substring(0, 80), "Error:", err.message);
          }
        }
        
        // Ensure the is_active column exists on the programs table in case it was created earlier
        try {
          await pool.query("ALTER TABLE programs ADD COLUMN is_active TINYINT NOT NULL DEFAULT 1");
          console.log("[MySQL Migration] Column `is_active` verified/added to `programs` table.");
        } catch (alterErr: any) {
          // Ignore ER_DUP_FIELDNAME (1060) - column already exists
          if (alterErr.errno !== 1060 && alterErr.code !== "ER_DUP_FIELDNAME") {
            console.error("[MySQL Migration Alter Error]:", alterErr.message);
          }
        }

        console.log("[MySQL Migration] Auto-migration and seeding completed successfully.");
      }
      console.log("[MySQL] Connection pool initialized successfully.");
    } else {
      isFallbackActive = true;
      console.warn("[MySQL] Credentials not found. Using local fallback file settings.");
    }
  } catch (error) {
    isFallbackActive = true;
    console.error("[MySQL] Failed to initialize connection pool. Using fallback. Error:", error);
  }
}

// Start database initialization eagerly on startup
initPromise = initializeDatabase();

export async function dbQuery(sql: string, params: any[] = []): Promise<any> {
  // Wait for database initialization & migrations to complete
  if (initPromise) {
    await initPromise;
  }

  // If pool exists, try to query database
  if (pool && !isFallbackActive) {
    try {
      const [results] = await pool.execute(sql, params);
      return results;
    } catch (err) {
      console.error("[MySQL Query Error] Falling back to local mock data. Query:", sql, "Error:", err);
      // Do not crash the app, temporarily toggle fallback
      isFallbackActive = true;
    }
  }

  // FALLBACK LOGIC: Mock Database Queries
  // This executes standard SQL patterns in memory for seamless development
  const sqlLower = sql.toLowerCase().trim();

  // 1. SELECT donations
  if (sqlLower.startsWith("select") && sqlLower.includes("donations")) {
    // Check if filtering by ID
    if (sqlLower.includes("where id =") || sqlLower.includes("where id = ?")) {
      const id = params[0];
      return mockDonations.filter(d => d.id === id);
    }
    return mockDonations;
  }

  // 2. SELECT volunteers
  if (sqlLower.startsWith("select") && sqlLower.includes("volunteers")) {
    return mockVolunteers;
  }

  // 3. SELECT programs
  if (sqlLower.startsWith("select") && sqlLower.includes("programs")) {
    if (sqlLower.includes("is_active = 1") || sqlLower.includes("is_active = ?")) {
      return mockPrograms.filter(p => p.isActive === 1 || p.isActive === undefined);
    }
    return mockPrograms;
  }

  // 4. INSERT INTO donations
  if (sqlLower.startsWith("insert into donations")) {
    // INSERT INTO donations (id, name, email, phone, amount, program, payment_method, status, message, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    const newDonation: Donation = {
      id: params[0],
      name: params[1],
      email: params[2],
      phone: params[3],
      amount: params[4],
      program: params[5],
      paymentMethod: params[6],
      status: params[7],
      message: params[8],
      date: new Date().toISOString().slice(0, 19).replace('T', ' '),
    };
    mockDonations = [newDonation, ...mockDonations];
    return { affectedRows: 1, insertId: params[0] };
  }

  // 5. INSERT INTO volunteers
  if (sqlLower.startsWith("insert into volunteers")) {
    // INSERT INTO volunteers (id, name, email, phone, interest_area, status, motivation, date) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
    const newVol: Volunteer = {
      id: params[0],
      name: params[1],
      email: params[2],
      phone: params[3],
      interestArea: params[4] as any,
      status: params[5] as any,
      motivation: params[6],
      date: new Date().toISOString().slice(0, 19).replace('T', ' '),
    };
    mockVolunteers = [newVol, ...mockVolunteers];
    return { affectedRows: 1, insertId: params[0] };
  }

  // 6. UPDATE donations status
  if (sqlLower.startsWith("update donations set status =") || sqlLower.includes("update donations")) {
    // UPDATE donations SET status = ? WHERE id = ?
    // OR UPDATE donations SET status = ?, payment_method = ? WHERE id = ?
    const status = params[0];
    const paymentMethod = params.length === 3 ? params[1] : undefined;
    const id = params.length === 3 ? params[2] : params[1];
    mockDonations = mockDonations.map(d => {
      if (d.id === id) {
        return {
          ...d,
          status: status as any,
          ...(paymentMethod ? { paymentMethod } : {}),
        };
      }
      return d;
    });
    return { affectedRows: 1 };
  }

  // 7. UPDATE volunteers status
  if (sqlLower.startsWith("update volunteers set status =") || sqlLower.includes("update volunteers")) {
    // UPDATE volunteers SET status = ? WHERE id = ?
    const status = params[0];
    const id = params[1];
    mockVolunteers = mockVolunteers.map(v => (v.id === id ? { ...v, status: status as any } : v));
    return { affectedRows: 1 };
  }

  // 8. UPDATE programs target, raised, title, or is_active
  if (sqlLower.startsWith("update programs") && sqlLower.includes("title =") && sqlLower.includes("target =")) {
    // UPDATE programs SET title = ?, target = ? WHERE id = ?
    const title = params[0];
    const target = params[1];
    const id = params[2];
    mockPrograms = mockPrograms.map(p => (p.id === id ? { ...p, title, target } : p));
    return { affectedRows: 1 };
  }

  if (sqlLower.startsWith("update programs") && sqlLower.includes("is_active =")) {
    // UPDATE programs SET is_active = ? WHERE id = ?
    const isActive = params[0];
    const id = params[1];
    mockPrograms = mockPrograms.map(p => (p.id === id ? { ...p, isActive } : p));
    return { affectedRows: 1 };
  }

  if (sqlLower.startsWith("update programs set target =") || sqlLower.includes("target = ?")) {
    // UPDATE programs SET target = ? WHERE id = ?
    const target = params[0];
    const id = params[1];
    mockPrograms = mockPrograms.map(p => (p.id === id ? { ...p, target: target } : p));
    return { affectedRows: 1 };
  }

  if (sqlLower.includes("raised = raised + ?") || sqlLower.includes("raised = raised +")) {
    // UPDATE programs SET raised = raised + ? WHERE id = ?
    const amount = params[0];
    const id = params[1];
    mockPrograms = mockPrograms.map(p => (p.id === id ? { ...p, raised: p.raised + amount } : p));
    return { affectedRows: 1 };
  }

  // 8b. INSERT INTO programs
  if (sqlLower.startsWith("insert into programs")) {
    // INSERT INTO programs (id, title, target, raised, is_active) VALUES (?, ?, ?, 0, 1)
    const newProg: ProgramStats = {
      id: params[0],
      title: params[1],
      target: params[2],
      raised: 0,
      isActive: 1,
    };
    if (!mockPrograms.some(p => p.id === newProg.id)) {
      mockPrograms.push(newProg);
    }
    return { affectedRows: 1 };
  }

  // 8c. DELETE FROM programs
  if (sqlLower.startsWith("delete from programs")) {
    const id = params[0];
    mockPrograms = mockPrograms.filter(p => p.id !== id);
    return { affectedRows: 1 };
  }

  // 9. SELECT settings
  if (sqlLower.startsWith("select") && sqlLower.includes("settings")) {
    const currentSettings = getFallbackSettings();
    if (sqlLower.includes("where key_name = ?") || sqlLower.includes("where key_name =")) {
      const key = params[0];
      return currentSettings.filter((s: any) => s.key_name === key);
    }
    return currentSettings;
  }

  // 10. UPDATE settings
  if (sqlLower.startsWith("update settings") || sqlLower.includes("update settings set")) {
    const val = params[0];
    const key = params[1];
    let currentSettings = getFallbackSettings();
    let found = false;
    currentSettings = currentSettings.map((s: any) => {
      if (s.key_name === key) {
        found = true;
        return { ...s, value_text: val };
      }
      return s;
    });
    if (!found) {
      currentSettings.push({ key_name: key, value_text: val });
    }
    saveFallbackSettings(currentSettings);
    return { affectedRows: 1 };
  }

  return [];
}
