import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { userPersonWithConfirmSchema } from "../../schemas/Sales/sales";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useUserId } from "../use-user-id";
import { addClient } from "../../services/Client/clientService";
import { useNavigate } from "react-router";

export const useAddClient = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(userPersonWithConfirmSchema),
  });

  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Calling Custom hook for getting userId
  const userId = useUserId();

  // Mutation for Adding Sales Person
  const mutation = useMutation({
    mutationFn: (filterData) => addClient(userId, filterData),
    onSuccess: () => {
      toast({
        description: "The New Client has been successfully added.",
        duration: 2000,
      });
      reset();
      //   queryClient.invalidateQueries({ queryKey: ["users"] });
      setTimeout(() => {
        navigate("/app/client");
      }, 2000);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error Adding Client",
        duration: 2000,
      });
    },
  });

  const onSubmit = (formData) => {
    const { confirmPassword, ...filterData } = formData;
    // console.log("Adding Client", filterData);
    mutation.mutate(filterData);
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    reset,
    isLoading: mutation.isPending,
  };
};
