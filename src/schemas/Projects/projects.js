import { z } from "zod";

export const createInventorySchema = z
  .object({
    propertyName: z.string().min(1, "Property Name is required"),
    address: z.string().min(1, "Address is required"),
    totalTower: z.preprocess(
      (val) => Number(val),
      z.number().min(1, "Total Tower is required")
    ),
    towers: z.array(
      z.object({
        towerName: z.string().min(1, "Tower Name is required"),
        totalFloors: z.preprocess(
          (val) => Number(val),
          z.number().min(1, "Total Floors is required")
        ),
        flatsPerFloor: z.preprocess(
          (val) => Number(val),
          z.number().min(1, "Flats per Floor is required")
        ),
      })
    ),
  })
  .refine((data) => data.towers.length === data.totalTower, {
    message: "Number of towers must match Total Tower",
    path: ["towers"],
  });
