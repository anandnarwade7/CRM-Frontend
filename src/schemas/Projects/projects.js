import { z } from "zod";

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
