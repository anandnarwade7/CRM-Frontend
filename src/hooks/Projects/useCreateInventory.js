import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { inventorySchema } from "../../schemas/Projects/projects";

export const useCreateInventory = () => {
  const formMethods = useForm({
    resolver: zodResolver(inventorySchema),
    defaultValues: {
      propertyName: "",
      address: "",
      totalTower: "",
      totalFloor: "",
      flatsPerFloor: "",
      towerName1: "",
      towerName2: "",
      floorName1: "",
      floorName2: "",
      flatsName1: "",
      flatsName2: "",
    },
  });

  const { handleSubmit, reset } = formMethods;

  const onSubmit = (data) => {
    console.log("Inventory Details", data);
  };

  return { formMethods, handleSubmit, onSubmit };
};
