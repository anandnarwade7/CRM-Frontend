import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { userPersonSchema } from "../../schemas/Sales/sales";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserDetails } from "../../services/Sales/salesService";

export const useUpdateUser = (onClose) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(userPersonSchema),
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, formData }) => updateUserDetails(id, formData),
    onSuccess: (data) => {
      if (data) {
        onClose();
        toast({
          title: "Successfully Updated the Details",
          duration: 2000,
        });
        reset();
        queryClient.invalidateQueries({ queryKey: ["users"] });
      }
    },
    onError: (err) => {
      if (err) {
        toast({
          variant: "destructive",
          title: "Invalid request.",
          duration: 2000,
        });
      }
    },
  });

  const onSubmit = (id, formData) => {
    mutation.mutate({ id, formData });
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    reset,
    setValue,
    isPending: mutation.isPending,
  };
};
