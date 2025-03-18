import { z } from "zod";

export const adminSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  mobileNumber: z
    .string()
    .regex(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
  companyName: z.string().min(2, "Company name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});
