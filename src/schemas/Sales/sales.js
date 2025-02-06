import { z } from "zod";

export const salesPersonSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  mobileNumber: z
    .string()
    .length(10, "Mobile number must be exactly 10 digits")
    .regex(/^\d+$/, "Only numbers are allowed"),

  password: z.string().min(6, "Password must be at least 6 characters"),
  email: z.string().email("Invalid email address"),
});
