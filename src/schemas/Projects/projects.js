import { number, z } from "zod";

// Schema for only Tower Details
export const towerSchema = z.object({
  towerName: z.string().min(1, "Tower name is required"),
  totalFloors: z.coerce
    .number({ required_error: "Total Floors is required" })
    .int("Must be an integer")
    .positive("Must be greater than 0"),
  // .max(20, "Should be Less than 20"),

  flatsPerFloor: z.coerce
    .number({ required_error: "Flats Per Floor is required" })
    .int("Must be an integer")
    .positive("Must be greater than 0"),
  // .max(20, "Should be Less than 20"),

  layoutImage: z.any().refine(
    (file) => {
      if (!file) return true;
      return (
        file instanceof File &&
        file.type.startsWith("image/") &&
        file.size <= 5 * 1024 * 1024
      );
    },
    { message: "Layout image must be a valid image file under 5MB" }
  ),
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

// Schema for updating the flat status
// export const updateFlatStatusSchema = z.object({
//   area: z.string().refine((val) => /^\d+$/.test(val) && parseInt(val) > 0, {
//     message: "Area Must be Postive Number",
//   }),
//   flatType: z.string().refine((val) => /^\d+$/.test(val) && parseInt(val) > 0, {
//     message: "Flat Type Must be Postive Number",
//   }),
//   status: z.enum(["Available", "Booked", "Refugee"], {
//     errorMap: () => ({ message: "Status is required" }),
//   }),
// });

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
  // clientEmail: z.string().email("Valid client email is required").optional(),
};

// Added SALES role schema
const salesFields = {
  // clientEmail: z.string().email("Valid client email is required").optional(),
  clientEmail: z.string(),
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
