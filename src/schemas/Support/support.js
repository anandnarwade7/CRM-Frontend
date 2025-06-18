import { z } from "zod";

export const supportSchema = z.object({
  //   name: z.string().min(1, "Name is required"),
  //   phoneNumber: z.string().min(10, "Phone number is required"),
  //   email: z.string().email("Invalid email address"),
  //   department: z.string().min(1, "Department is required"),
  //   message: z.string().min(10, "Message must be at least 10 characters"),
  query: z.string().min(1, "Query is required"),
  description: z.string().min(1, "Description is required"),
});
