import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { adminSchema } from "../../schemas/Admin/admin";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createAdmin } from "../../services/Admin/adminService";

export const useAddAdmin = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm({
    resolver: zodResolver(adminSchema),
  });
  const { toast } = useToast();

  // Mutation for adding the new Admin
  const mutation = useMutation({
    mutationFn: createAdmin,
    onSuccess: (data) => {
      if (data) {
        toast({
          title: "Admin Created successfully",
          duration: 2000,
        });
        reset();
      }
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.msg || "Something went wrong";
      toast({
        variant: "destructive",
        title: "Invalid request.",
        description: errorMessage,
        duration: 2000,
      });
    },
  });

  // HandleSumbit Function
  const onSubmit = (formData) => {
    const formattedFormData = {
      ...formData,
      startDate: new Date(formData?.startDate).getTime(),
      endDate: new Date(formData?.endDate).getTime(),
    };

    delete formattedFormData.confirmPassword;

    console.log("Formatted Data before API Call:", formattedFormData);
    mutation.mutate(formattedFormData);
  };

  return {
    register,
    errors,
    handleSubmit,
    onSubmit,
    setValue,
    control,
  };
};
