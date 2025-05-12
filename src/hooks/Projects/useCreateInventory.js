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
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();

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
          {
            towerName: "",
            totalFloors: 0,
            flatsPerFloor: 0,
            layoutImage: null,
          },
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
    console.log("Towers OBJ", towers);

    try {
      const projectResponse = await createProjectMutation.mutateAsync({
        address,
        propertyName,
      });

      console.log("Project res", projectResponse);

      const projectId = projectResponse?.id;

      if (!projectId) throw new Error("Project ID is Missing");

      // const towerPayload = towers?.map((tower) =>
      //   JSON.stringify({
      //     towerName: tower?.towerName,
      //     // totalTowers: totalTower,
      //     totalFloors: tower?.totalFloors,
      //     flatPerFloor: tower?.flatsPerFloor,
      //     project_id: String(projectId),
      //   })
      // );

      // const formData = new FormData();
      // formData.append("towerData", towerPayload);

      // towers.forEach((tower) => {
      //   const file = tower?.layoutImage;
      //   if (file) {
      //     formData.append("layoutImages", file);
      //   }
      // });

      const formData = new FormData();

      towers?.forEach((tower, index) => {
        formData.append(
          `requestData[${index}]`,
          JSON.stringify({
            towerName: tower?.towerName,
            totalFloors: tower?.totalFloors,
            flatPerFloor: tower?.flatsPerFloor,
            project_id: String(projectId),
          })
        );
        if (tower?.layoutImage) {
          formData.append(`layoutImages[${index}]`, tower?.layoutImage);
        }
      });

      const towerResponse = await createTowers(formData);

      console.log("Tower Res", towerResponse?.failed[0]);

      toast({
        title: "Success",
        description: "Inventory successfully created.",
        duration: 1000,
      });

      if (towerResponse || projectResponse) reset();

      setTimeout(() => {
        navigate(`/app/update-sqft`, {
          state: {
            projectId: projectId,
          },
        });
      }, 1400);

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
    control,
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
