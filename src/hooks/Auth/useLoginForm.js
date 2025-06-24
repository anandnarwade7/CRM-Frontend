import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schemas/Auth/auth";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../services/Auth/authService";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router";

export const useLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  // POST API CALL to Login User
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log("Login Data", data, data?.id);
      if (data) {
        toast({
          title: "Login Successful",
          description: "You have successfully logged in.",
          duration: 2000,
        });
        sessionStorage.setItem("userId", data?.id);
        sessionStorage.setItem("role", data?.role);
        sessionStorage.setItem("token", data?.token);
        sessionStorage.setItem("userName", data?.name);
        navigate("/app/dashboard");
      }
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.developermsg || "Something went wrong";
      toast({
        variant: "destructive",
        title: error?.response?.data?.msg,
        description: errorMessage,
        duration: 2000,
      });
    },
  });
  // Handle Sumbit Funtion
  const onSubmit = (formData) => {
    mutation.mutate(formData);
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    setValue,
    isLoading: mutation.isPending,
  };
};
