import { z } from "zod";

const envSchema = z.object({
  VITE_API_URL: z.string().url(),
});

export function loadEnv(env: Record<string, string | undefined>) {
  const result = envSchema.safeParse(env);
  if (!result.success) {
    throw new Error(`loadEnv error: ${result.error.errors}`);
  }
  return result.data;
}

export const ENV = loadEnv(import.meta.env);
