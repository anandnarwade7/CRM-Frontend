import { z } from "zod";

export const updateCRMLeadSchema = z.object({
  status: z.enum(["COLD", "HOT", "CONVERTED", "REJECTED"], {
    message: "Status is Required",
  }),
  // note: z.string().min(5, "Note Must be least 5 Characters"),
  dueDate: z.date({ required_error: "Reminder Date is Required" }),
  customFields: z
    .array(
      z.object({
        label: z.string().min(1, "Label is Required"),
        value: z.string().min(1, "Value is Required"),
      })
    )
    .optional(),
});

// export const fileUploadSchema = z.object({
//   agreementFile: z
//     .any()
//     .refine((file) => file instanceof File, {
//       message: "Agreement file is required",
//     })
//     .refine((file) => file instanceof File && file.type === "application/pdf", {
//       message: "Agreement file must be a PDF",
//     })
//     .refine((file) => file instanceof File && file.size <= 5 * 1024 * 1024, {
//       message: "Agreement file size must be less than 5MB",
//     }),
//   stampDutyFile: z
//     .any()
//     .refine((file) => file instanceof File, {
//       message: "Stamp Duty file is required",
//     })
//     .refine((file) => file instanceof File && file.type === "application/pdf", {
//       message: "Stamp Duty file must be a PDF",
//     })
//     .refine((file) => file instanceof File && file.size <= 5 * 1024 * 1024, {
//       message: "Stamp Duty file size must be less than 5MB",
//     }),
//   tdsDocFile: z
//     .any()
//     .refine((file) => file instanceof File, {
//       message: "TDS file is required",
//     })
//     .refine((file) => file instanceof File && file.type === "application/pdf", {
//       message: "TDS file must be a PDF",
//     })
//     .refine((file) => file instanceof File && file.size <= 5 * 1024 * 1024, {
//       message: "TDS file size must be less than 5MB",
//     }),
//   bankSanctionFile: z
//     .any()
//     .refine((file) => file instanceof File, {
//       message: "Bank Sanction file is required",
//     })
//     .refine((file) => file instanceof File && file.type === "application/pdf", {
//       message: "Bank Sanction file must be a PDF",
//     })
//     .refine((file) => file instanceof File && file.size <= 5 * 1024 * 1024, {
//       message: "Bank Sanction file size must be less than 5MB",
//     }),
// });

export const eventRowSchema = z.object({
  event: z.string().min(1, "Event name is required"),
  percentage: z.string().refine((val) => !isNaN(val) && parseFloat(val) >= 0, {
    message: "Percentage must be a valid positive number",
  }),
  basePrice: z.string().refine((val) => /^\d+$/.test(val), {
    message: "Base Price must be an integer",
  }),
  gst: z.string().refine((val) => !isNaN(val) && parseFloat(val) >= 0, {
    message: "GST must be a valid positive number",
  }),

  invoiceDate: z.date({ required_error: "Invoice Date is required" }),
  dueDate: z.date({ required_error: "Due Date is required" }),
  paymentDate: z.date({ required_error: "Payment Date is required" }),
  paidBy: z.enum(["self", "bank"]),

  statusReport: z.any().refine((file) => !!file, {
    message: "Status Report file is required",
  }),
  architectLetter: z.any().refine((file) => !!file, {
    message: "Architect Letter file is required",
  }),
  invoice: z.any().refine((file) => !!file, {
    message: "Invoice file is required",
  }),
  receipt: z.any().refine((file) => !!file, {
    message: "Receipt file is required",
  }),
});
