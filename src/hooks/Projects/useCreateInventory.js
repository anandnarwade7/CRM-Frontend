import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createInventorySchema } from "../../schemas/Projects/projects";

export const useCreateInventory = () => {
  const formMethods = useForm({
    resolver: zodResolver(createInventorySchema),
    defaultValues: {
      propertyName: "",
      address: "",
      totalTower: "",
      towers: [],
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
    getValues,
  } = formMethods;

  const onSubmit = (data) => {
    console.log("Inventory Details", data);
  };

  return {
    formMethods,
    handleSubmit,
    onSubmit,
    errors,
    watch,
    setValue,
    getValues,
  };
};
