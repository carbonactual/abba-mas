export async function GET() {
  const checks = {
    openai: Boolean(process.env.OPENAI_API_KEY),
    gemini: Boolean(process.env.GEMINI_API_KEY),
    supabaseUrl: Boolean(process.env.SUPABASE_URL),
    supabaseAnon: Boolean(process.env.SUPABASE_ANON_KEY),
    supabaseService: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY)
  };

  return Response.json({
    status: "ABBA MAS online",
    environment: checks,
    note: "Values are hidden.",
    timestamp: new Date().toISOString()
  });
}
