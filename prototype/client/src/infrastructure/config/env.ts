function requireEnv(key: string, fallback: string): string {
  const val = (import.meta.env as Record<string, string | undefined>)[key]
  return val ?? fallback
}

export const env = {
  apiUrl: requireEnv('VITE_API_URL', 'http://localhost:3000/api'),
  wsUrl: requireEnv('VITE_WS_URL', 'ws://localhost:3000'),
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
} as const

export type Env = typeof env
