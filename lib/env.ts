import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.string().url().or(z.literal("")).default(""),
  NEXT_PUBLIC_LAUNCHPAD_WS_URL: z.string().url().default("https://dev-api.tradegenius.com")
});

export const env = envSchema.parse({
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  NEXT_PUBLIC_LAUNCHPAD_WS_URL: process.env.NEXT_PUBLIC_LAUNCHPAD_WS_URL
});
