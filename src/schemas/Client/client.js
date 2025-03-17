import { z } from "zod";

export const updateCRMLeadSchema = z.object({
  status: z.enum(["COLD", "HOT", "CONVERTED", "REJECTED"], {
    message: "Status is Required",
  }),
  note: z.string().min(5, "Note Must be least 5 Characters"),
  customFields: z
    .array(
      z.object({
        label: z.string().min(1, "Label is Required"),
        value: z.string().min(1, "Value is Required"),
      })
    )
    .optional(),

  invoiceFile: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.type === "application/pdf", {
      message: "Only PDF Files are allowed for the invoice",
    })
    .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
      message: "Invoice file size must be less than 5MB",
    }),
  receiptFile: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.type === "application/pdf", {
      message: "Only PDF Files are allowed for the Receipt",
    })
    .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
      message: "Receipt file size must be less than 5MB",
    }),
});
