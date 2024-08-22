import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(4),
  email: z.string().email(),
  username: z.string().min(4),
  password: z.string().min(8),
  role: z.string().default("employee"),
});

export const LoginSchema = z.object({
  username: z.string().min(4),
  password: z.string().min(8),
});
