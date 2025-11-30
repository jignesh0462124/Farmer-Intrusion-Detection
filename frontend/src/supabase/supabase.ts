// src/supabase/supabase.ts
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Always end up with a plain string (never undefined)
const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL ?? "").trim();

// Prefer VITE_SUPABASE_KEY, fall back to VITE_SUPABASE_ANON_KEY if needed
const supabaseAnonKey = (
  import.meta.env.VITE_SUPABASE_KEY ??
  import.meta.env.VITE_SUPABASE_ANON_KEY ??
  ""
).trim();

if (!supabaseUrl) {
  throw new Error(
    "Missing VITE_SUPABASE_URL. Add it to your .env (VITE_SUPABASE_URL=...) and restart the dev server."
  );
}

if (!supabaseAnonKey) {
  throw new Error(
    "Missing VITE_SUPABASE_KEY or VITE_SUPABASE_ANON_KEY. Add your anon key to .env and restart the dev server."
  );
}

export const supabase: SupabaseClient = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);
