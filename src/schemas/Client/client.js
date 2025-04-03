import { z } from "zod";

export const updateCRMLeadSchema = z.object({
  status: z.enum(["COLD", "HOT", "CONVERTED", "REJECTED"], {
    message: "Status is Required",
  }),
  note: z.string().min(5, "Note Must be least 5 Characters"),
  dueDate: z.date({ required_error: "Reminder Date is Required" }).optional(),
  customFields: z
    .array(
      z.object({
        label: z.string().min(1, "Label is Required"),
        value: z.string().min(1, "Value is Required"),
      })
    )
    .optional(),
});

export const fileUploadSchema = z.object({
  agreementFile: z
    .any()
    .refine((file) => file instanceof File, {
      message: "Agreement file is required",
    })
    .refine((file) => file instanceof File && file.type === "application/pdf", {
      message: "Agreement file must be a PDF",
    })
    .refine((file) => file instanceof File && file.size <= 5 * 1024 * 1024, {
      message: "Agreement file size must be less than 5MB",
    }),
  stampDutyFile: z
    .any()
    .refine((file) => file instanceof File, {
      message: "Stamp Duty file is required",
    })
    .refine((file) => file instanceof File && file.type === "application/pdf", {
      message: "Stamp Duty file must be a PDF",
    })
    .refine((file) => file instanceof File && file.size <= 5 * 1024 * 1024, {
      message: "Stamp Duty file size must be less than 5MB",
    }),
  tdsDocFile: z
    .any()
    .refine((file) => file instanceof File, {
      message: "TDS file is required",
    })
    .refine((file) => file instanceof File && file.type === "application/pdf", {
      message: "TDS file must be a PDF",
    })
    .refine((file) => file instanceof File && file.size <= 5 * 1024 * 1024, {
      message: "TDS file size must be less than 5MB",
    }),
  bankSanctionFile: z
    .any()
    .refine((file) => file instanceof File, {
      message: "Bank Sanction file is required",
    })
    .refine((file) => file instanceof File && file.type === "application/pdf", {
      message: "Bank Sanction file must be a PDF",
    })
    .refine((file) => file instanceof File && file.size <= 5 * 1024 * 1024, {
      message: "Bank Sanction file size must be less than 5MB",
    }),
});
