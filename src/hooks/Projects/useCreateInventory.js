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
    trigger,
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
            // Initialize all layout image fields
            oddImage: null,
            evenImage: null,
            groundImage: null,
            customLayout: null,
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
  });

  const onSubmit = async (data) => {
    console.log("Inventory Details with layout images:", data);
    const { address, propertyName, towers, totalTower } = data;

    try {
      // Create project first
      const projectResponse = await createProjectMutation.mutateAsync({
        address,
        propertyName,
      });

      console.log("Project res", projectResponse);

      const projectId = projectResponse?.id;

      if (!projectId) throw new Error("Project ID is Missing");

      // Prepare FormData with all tower data and images
      const formData = new FormData();

      towers?.forEach((tower, index) => {
        // Add tower basic data
        formData.append(
          `requestData[${index}]`,
          JSON.stringify({
            towerName: tower?.towerName,
            totalFloors: tower?.totalFloors,
            flatPerFloor: tower?.flatsPerFloor,
            project_id: String(projectId),
          })
        );

        // Add layout images if they exist
        if (tower?.oddImage) {
          formData.append(`oddLayout[${index}]`, tower.oddImage);
        }
        if (tower?.evenImage) {
          formData.append(`evenLayout[${index}]`, tower.evenImage);
        }
        if (tower?.groundImage) {
          formData.append(`groundLayout[${index}]`, tower.groundImage);
        }

        // Add custom layout if it exists
        // if (tower?.customLayout) {
        //   formData.append(
        //     `customLayout[${index}]`,
        //     JSON.stringify({
        //       name: tower.customLayout.name,
        //     })
        //   );
        //   if (tower.customLayout.file) {
        //     formData.append(
        //       `customLayoutImages[${index}]`,
        //       tower.customLayout.file
        //     );
        //   }
        // }

        if (tower.customLayout.file) {
          formData.append(
            `${tower?.customLayout?.name}[${index}]`,
            tower.customLayout.file
          );
        }
      });

      const towerResponse = await createTowers(formData);

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
      console.error("Error creating inventory:", error);
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
    trigger,
    isLoading: createProjectMutation.isPending,
  };
};
