import { z } from "zod";

// Schema for Converting the Sales person Leads
export const salesLeadsSchema = z.object({
  status: z.enum(["COLD", "WARM", "HOT"], {
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
    .max(3, "You can only add up to 3 custom fields")
    .optional(),
});
