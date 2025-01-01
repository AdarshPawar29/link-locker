// Environment variable validation and typing
export const env = {
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
} as const;

// Validation function
export function validateEnv() {
  const required = [
    { key: 'NEXT_PUBLIC_SUPABASE_URL', value: env.supabase.url },
    { key: 'NEXT_PUBLIC_SUPABASE_ANON_KEY', value: env.supabase.anonKey },
  ];

  const missing = required.filter(({ value }) => !value);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing
        .map(({ key }) => key)
        .join(', ')}`
    );
  }
}