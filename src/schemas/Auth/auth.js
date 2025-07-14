import { z } from "zod";

export const loginSchema = z.object({
  role: z.enum(["SUPER ADMIN", "ADMIN", "SALES", "CRM"], {
    required_error: "Please Select a role",
  }),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
