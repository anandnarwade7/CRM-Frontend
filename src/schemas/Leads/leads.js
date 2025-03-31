import { z } from "zod";

// Schema for Converting the Sales person Leads
export const salesLeadsSchema = (status, isStatusOpen) => {
  // z.object({
  //   status: z.enum(["COLD", "HOT", "COMPLETED", "REJECTED"], {
  //     message: "Lead Disposal is Required",
  //   }),
  //   note: z.string().min(5, "Note Must be least 5 Characters"),
  //   customFields: z
  //     .array(
  //       z.object({
  //         label: z.string().min(1, "Label is Required"),
  //         value: z.string().min(1, "Value is Required"),
  //       })
  //     )
  //     .optional(),
  // });

  const baseSchema = {
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
  };

  if (status !== "ASSIGNED" || isStatusOpen) {
    return z.object({
      ...baseSchema,
      status: z.enum(["COLD", "HOT", "CONVERTED", "REJECTED"], {
        message: "Lead Disposal is Required",
      }),
    });
  }

  return z.object(baseSchema);
};
