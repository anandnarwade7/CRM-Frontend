import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createInventorySchema } from "../../schemas/Projects/projects";
import { useMutation } from "@tanstack/react-query";
import { createProject } from "../../services/Project/projectservice";
import { useToast } from "@/hooks/use-toast";
import { data } from "react-router";

export const useCreateInventory = (userId) => {
  const formMethods = useForm({
    resolver: zodResolver(createInventorySchema),
    defaultValues: {
      propertyName: "",
      address: "",
      totalTower: "",
      towers: [],
    },
  });
  const { toast } = useToast();

  const {
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
    getValues,
  } = formMethods;

  const createProjectMutation = useMutation({
    mutationKey: ["createProject"],
    mutationFn: (payload) => createProject(userId, payload),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Inventory successfully created.",
        duration: 2000,
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong while creating inventory.",
        duration: 2000,
      });
    },
  });

  const onSubmit = (data) => {
    console.log("Inventory Details", data);
    const { address, propertyName } = data;
    createProjectMutation.mutate({ address, propertyName });
  };

  return {
    formMethods,
    handleSubmit,
    onSubmit,
    errors,
    watch,
    setValue,
    getValues,
    isLoading: createProjectMutation.isPending,
  };
};
