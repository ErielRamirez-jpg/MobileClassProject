export const env = {

  supabaseUrl: (process.env.EXPO_PUBLIC_SUPABASE_URL || "")
    .replace("/rest/v1/", "")
    .replace(/\/$/, ""),
    
  supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "",
};