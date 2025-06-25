import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supportSchema } from "../../schemas/Support/support";
import { useMutation } from "@tanstack/react-query";
import { salesRaiseSupport } from "../../services/Support/supportService";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router";

export const usePostSupport = (userId) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(supportSchema),
  });

  const { toast } = useToast();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data) => salesRaiseSupport(data, userId),
    onSuccess: (data) => {
      if (data) {
        toast({
          title: "Success!",
          description: "Support request submitted successfully.",
          duration: 2000,
        });
        reset();
        setTimeout(() => {
          navigate("/app/support");
        }, 2000);
      }
    },
    onError: (error) => {
      if (error) {
        toast({
          title: "Error",
          description:
            error.message || "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    setValue,
    errors,
    isSubmitting: mutation?.isPending,
  };
};
