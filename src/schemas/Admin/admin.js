import { z } from "zod";

export const adminSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    mobile: z.string().regex(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
    propertyName: z.string().min(2, "Company name is required"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters long"),
    startDate: z.date({ required_error: "Start Date is Required" }),
    endDate: z.date({ required_error: "End Date is Required" }),
  })
  .refine((data) => data?.password === data?.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => data?.startDate < data?.endDate, {
    message: "End date must be after start date",
    path: ["endDate"],
  })
  .refine((data) => data?.startDate.getTime() !== data?.endDate.getTime(), {
    message: "Start Date and End Date cannot be the same",
    path: ["endDate"],
  });
