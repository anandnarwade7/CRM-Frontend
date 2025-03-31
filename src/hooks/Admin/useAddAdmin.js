import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { adminSchema } from "../../schemas/Admin/admin";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createAdmin, updateAdmin } from "../../services/Admin/adminService";
import { useNavigate } from "react-router";

export const useAddAdmin = (id) => {
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
  const navigate = useNavigate();

  // Mutation for adding the new Admin
  const mutation = useMutation({
    mutationFn: async (formData) => {
      if (id) {
        const updateData = {
          password: formData?.password,
          startDate: new Date(formData?.startDate).getTime(),
          endDate: new Date(formData?.endDate).getTime(),
        };

        return updateAdmin({ id, data: updateData });
      } else {
        const createData = {
          ...formData,
          startDate: new Date(formData?.startDate).getTime(),
          endDate: new Date(formData?.endDate).getTime(),
        };

        delete createData.confirmPassword;

        return createAdmin(createData);
      }
    },
    onSuccess: (data) => {
      if (data) {
        toast({
          title: id
            ? "Admin Updated successfully"
            : "Admin Created successfully",
          duration: 2000,
        });
        setTimeout(() => {
          navigate("/app/admin");
        }, 2100);
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
    mutation.mutate(formData);
  };

  return {
    register,
    errors,
    handleSubmit,
    onSubmit,
    setValue,
    control,
    isLoading: mutation.isPending,
  };
};
