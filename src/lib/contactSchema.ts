import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.email().max(120),
  message: z.string().min(10).max(2000),
  // Honeypot anti-spam
  website: z.string().optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;
