import { z } from "zod";

export const inventorySchema = z.object({
  propertyName: z.string().min(1, "Property Name is required"),
  address: z.string().min(1, "Address is required"),
  totalTower: z.string().min(1, "Total Tower is required"),
  totalFloor: z.string().min(1, "Total Floor is required"),
  flatsPerFloor: z.string().min(1, "Flats Per Floor is required"),
  towerName1: z.string().min(1, "Tower Name is required"),
  towerName2: z.string().min(1, "Tower Name is required"),
  floorName1: z.string().min(1, "Floor Name is required"),
  floorName2: z.string().min(1, "Floor Name is required"),
  flatsName1: z.string().min(1, "Flats Name is required"),
  flatsName2: z.string().min(1, "Flats Name is required"),
});
