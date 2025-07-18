import { number, z } from "zod";

const fileValidation = z.any().refine(
  (file) => {
    if (!file) return true;
    return (
      file instanceof File &&
      file.type.startsWith("image/") &&
      file.size <= 5 * 1024 * 1024
    );
  },
  { message: "Layout image must be a valid image file under 5MB" }
);

// Custom layout schema
const customLayoutSchema = z
  .object({
    name: z.string().min(1, "Custom layout name is required"),
    // file: fileValidation.refine((file) => file instanceof File, {
    //   message: "Custom layout image is required",
    // }),
    file: z.any().refine(
      (file) => {
        if (!file) return false;
        return (
          file instanceof File &&
          file.type.startsWith("image/") &&
          file.size <= 5 * 1024 * 1024
        );
      },
      {
        message: "Custom layout image is required and must be under 5MB",
      }
    ),
  })
  .nullable()
  .optional();

// Schema for only Tower Details
export const towerSchema = z.object({
  towerName: z.string().min(1, "Tower name is required"),
  totalFloors: z.coerce
    .number({ required_error: "Total Floors is required" })
    .int("Must be an integer")
    .positive("Must be greater than 0"),

  flatsPerFloor: z.coerce
    .number({ required_error: "Flats Per Floor is required" })
    .int("Must be an integer")
    .positive("Must be greater than 0"),

  // Layout image fields
  oddImage: fileValidation,
  evenImage: fileValidation,
  groundImage: fileValidation,
  customLayout: customLayoutSchema,

  // Legacy field for backward compatibility
  layoutImage: fileValidation.nullable().optional(),
});

// Schema for whole Inventory
export const createInventorySchema = z.object({
  propertyName: z.string().min(1, "Property Name is required"),
  address: z.string().min(1, "Address is required"),
  totalTower: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Total towers must be a positive number",
    }),
  towers: z.array(towerSchema),
});

// Reusable schema fields
const adminFields = {
  area: z.string().refine((val) => /^\d+$/.test(val) && parseInt(val) > 0, {
    message: "Area must be a positive number",
  }),
  flatType: z.string().refine((val) => /^\d+$/.test(val) && parseInt(val) > 0, {
    message: "Flat Type must be a positive number",
  }),
};

const crmFields = {
  clientEmail: z.string().min(1, "Please select a client"),
};

// Added SALES role schema
const salesFields = {
  clientEmail: z.string().min(1, "Please select a client"),
};

// Common for all roles
const commonFields = {
  status: z.enum(["Available", "Sold", "Booked", "Refugee"], {
    errorMap: () => ({ message: "Status is required" }),
  }),
  flatInfo: z.string().optional(),
};

/**
 * Dynamic schema generator based on user role
 */
export const updateFlatStatusSchema = (userRole) => {
  if (userRole === "ADMIN") {
    return z.object({
      ...commonFields,
      ...adminFields,
    });
  }

  if (userRole === "CRM") {
    return z.object({
      ...commonFields,
      ...crmFields,
    });
  }

  if (userRole === "SALES") {
    return z.object({
      ...commonFields,
      ...salesFields,
    });
  }

  // Default: only validate status
  return z.object({
    ...commonFields,
  });
};

// Schema for updating sq. ft. area will required as per initialstate areas
export const updateSqFtSchema = z.object({
  tower: z.string().min(1, "Tower is Required"),
  areas: z
    .array(
      z.object({
        id: z.number(),
        flatNumber: z.number(),
        flatType: z
          .string()
          .nonempty("Flat Type is required")
          .refine(
            (val) => {
              const num = Number(val);

              if (isNaN(num) || num <= 0 || num > 6) {
                return false;
              }

              const decimalPart = val.split(".")[1];
              if (decimalPart && decimalPart.length > 1) {
                return false;
              }
              return true;
            },
            {
              message:
                "Flat Type must be a positive number and not greater than 6",
            }
          ),
        status: z.string(),
        flatSize: z
          .string()
          .nonempty("Area is required")
          .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
            message: "Area must be a valid number greater than 0",
          }),
      })
    )
    .min(1),
});
