import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { updateSqFtSchema } from "../../schemas/Projects/projects";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { updateFlatSqFt } from "../../services/Project/projectservice";
import { useNavigate } from "react-router";

export const useUpdateSqFt = () => {
  const [initialAreas, setInitialAreas] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(updateSqFtSchema),
    defaultValues: {
      tower: "",
      areas: initialAreas,
    },
  });

  const { toast } = useToast();
  const navigate = useNavigate();

  const { fields, replace } = useFieldArray({
    control,
    name: "areas",
  });

  const resetAreas = (newAreas) => {
    replace(newAreas);
  };

  const updateFlatSqFtMutation = useMutation({
    mutationKey: ["updateSqFt"],
    mutationFn: ({ towerId, areas }) => updateFlatSqFt(towerId, areas),
    onSuccess: (res, variables) => {
      if (res) {
        // Updating the Status for the flats sq ft in the client side array.
        const storedSqFtStatus = sessionStorage.getItem("sqFtStatus");

        if (storedSqFtStatus) {
          let sqFtStatusArray = JSON.parse(storedSqFtStatus);

          sqFtStatusArray = sqFtStatusArray?.map((item) => {
            if (item?.towerId === Number(variables?.towerId)) {
              return { ...item, isUpdated: true };
            }
            return item;
          });

          sessionStorage.setItem("sqFtStatus", JSON.stringify(sqFtStatusArray));

          // ✅ After updating, check if all are updated
          const allUpdated = sqFtStatusArray?.every(
            (item) => item?.isUpdated === true
          );

          if (allUpdated) {
            navigate("/app/projects");
            sessionStorage.removeItem("sqFtStatus");
          }
        }

        reset();

        toast({
          title: "Success",
          description: "Flats square feet added successfully",
          duration: 2000,
        });
      }
    },
    onError: (error) => {
      reset();
      const errorMessage = error?.response?.data?.msg || "Something went wrong";
      toast({
        variant: "destructive",
        title: "Failed to add square feet",
        description: errorMessage,
        duration: 2000,
      });
    },
  });

  const onSumit = (data) => {
    console.log("Update Sq. Ft.", data);
    const towerId = data?.tower;
    const areas = data?.areas;

    updateFlatSqFtMutation.mutate({ towerId, areas });
  };

  return {
    register,
    handleSubmit,
    onSumit,
    setValue,
    watch,
    resetAreas,
    control,
    fields,
    errors,
    isUpating: updateFlatSqFtMutation?.isPending,
  };
};
