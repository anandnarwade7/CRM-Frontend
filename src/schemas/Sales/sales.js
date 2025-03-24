import { z } from "zod";

export const userPersonSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  mobile: z
    .string()
    .length(10, "Mobile number must be exactly 10 digits")
    .regex(/^\d+$/, "Only numbers are allowed"),

  password: z.string().min(8, "Password must be at least 8 characters"),
  email: z.string().email("Invalid email address"),
});

// Schema for the form that requires confirmPassword
export const userPersonWithConfirmSchema = userPersonSchema
  .extend({
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 Characters"),
  })
  .refine((data) => data?.password === data?.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });
