import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createInventorySchema } from "../../schemas/Projects/projects";
import { useMutation } from "@tanstack/react-query";
import {
  createProject,
  createTowers,
} from "../../services/Project/projectService";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

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
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
    getValues,
  } = formMethods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "towers",
  });

  const totalTower = watch("totalTower");

  useEffect(() => {
    const towerCount = parseInt(totalTower, 10);

    if (isNaN(towerCount) || towerCount < 0) return;

    const currentLength = fields?.length;

    if (towerCount > currentLength) {
      for (let i = currentLength; i < towerCount; i++) {
        append(
          { towerName: "", totalFloors: 0, flatsPerFloor: 0 },
          { shouldFocus: false }
        );
      }
    } else if (towerCount < currentLength) {
      for (let i = currentLength - 1; i >= towerCount; i--) {
        remove(i);
      }
    }
  }, [totalTower, fields?.length, append, remove]);

  const createProjectMutation = useMutation({
    mutationKey: ["createProject"],
    mutationFn: (payload) => createProject(userId, payload),
    // onSuccess: () => {
    //   toast({
    //     title: "Success",
    //     description: "Inventory successfully created.",
    //     duration: 2000,
    //   });
    // },
    // onError: () => {
    //   toast({
    //     variant: "destructive",
    //     title: "Error",
    //     description: "Something went wrong while creating inventory.",
    //     duration: 2000,
    //   });
    // },
  });

  const onSubmit = async (data) => {
    console.log("Inventory Details", data);
    const { address, propertyName, towers, totalTower } = data;
    try {
      const projectResponse = await createProjectMutation.mutateAsync({
        address,
        propertyName,
      });

      console.log("Project res", projectResponse);

      const projectId = projectResponse?.id;

      if (!projectId) throw new Error("Project ID is Missing");

      const towerPayload = towers?.map((tower) =>
        JSON.stringify({
          towerName: tower?.towerName,
          // totalTowers: totalTower,
          totalFloors: tower?.totalFloors,
          flatPerFloor: tower?.flatsPerFloor,
          project_id: String(projectId),
        })
      );

      console.log(JSON.stringify(towerPayload));

      const towerResponse = await createTowers(towerPayload);
      console.log("Tower Res", towerResponse?.failed[0]);

      toast({
        title: "Success",
        description: "Inventory successfully created.",
        duration: 2000,
      });

      if (towerResponse || projectResponse) reset();

      if (towerResponse?.failed?.length > 0) {
        toast({
          variant: "info",
          description: towerResponse?.failed?.[0],
          duration: 2000,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong while creating inventory.",
        duration: 2000,
      });
    }
  };

  return {
    formMethods,
    handleSubmit,
    onSubmit,
    errors,
    watch,
    setValue,
    getValues,
    fields,
    isLoading: createProjectMutation.isPending,
  };
};
