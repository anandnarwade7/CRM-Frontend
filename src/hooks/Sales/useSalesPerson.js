import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { userPersonSchema } from "../../schemas/Sales/sales";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addSalesPerson } from "../../services/Sales/salesService";
import { useUserId } from "../use-user-id";

export const useSalesPerson = (role) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(userPersonSchema),
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Rolename for rendering in the toast dynamically
  const roleName = role === "CRM" ? "CRM Person" : "Sales Person";

  // Calling Custom hook for getting userId
  const userId = useUserId();

  // Mutation for Adding Sales Person
  const mutation = useMutation({
    mutationFn: (formData) =>
      addSalesPerson(userId, { ...formData, role: role }),
    onSuccess: () => {
      toast({
        title: `${roleName} Added`,
        description: `The new ${roleName.toLowerCase()} has been successfully added.`,
        duration: 2000,
      });
      reset();
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      if (error) {
        toast({
          variant: "destructive",
          title: "Oh! Got Error",
          description: error?.message || "Something went wrong.",
          duration: 2000,
        });
      }
    },
  });

  // HandSubmit Function
  const onSubmit = (formData) => {
    console.log("Sales Person Form Data", formData);
    mutation.mutate(formData);
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isLoading: mutation.isPending,
  };
};
