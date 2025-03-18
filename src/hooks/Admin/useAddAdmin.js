import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { adminSchema } from "../../schemas/Admin/admin";
import { zodResolver } from "@hookform/resolvers/zod";

export const useAddAdmin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(adminSchema),
  });
  const { toast } = useToast();

  const onSubmit = (formData) => {
    console.log("Admin Added", formData);
  };

  return {
    register,
    setValue,
    errors,
    handleSubmit,
    onSubmit,
  };
};
