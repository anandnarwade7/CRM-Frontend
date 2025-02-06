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

  // Calling Custom hook for getting userId
  const userId = useUserId();
  console.log("User ID", userId);

  // Mutation for Adding Sales Person
  const mutation = useMutation({
    mutationFn: (formData) =>
      addSalesPerson(userId, { ...formData, role: role }),
    onSuccess: () => {
      toast({
        title: "Sales Person Added",
        description: "The new sales person has been successfully added.",
        duration: 2000,
      });
      reset();
      queryClient.invalidateQueries({ queryKey: ["salesPersons"] });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error Adding Sales Person",
        description: errorMessage,
        duration: 2000,
      });
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
