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
export const updateFlatStatusSchema = z.object({
  area: z.string().refine((val) => /^\d+$/.test(val) && parseInt(val) > 0, {
    message: "Area Must be Postive Number",
  }),
  status: z.enum(["Available", "UnAvailable", "Booked"], {
    errorMap: () => ({ message: "Status is required" }),
  }),
});

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
