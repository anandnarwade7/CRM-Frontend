import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supportSchema } from "../../schemas/Support/support";
import { useMutation } from "@tanstack/react-query";
import { salesRaiseSupport } from "../../services/Support/supportService";

export const usePostSupport = (userId) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(supportSchema),
  });

  const mutation = useMutation({
    mutationFn: (formData) => salesRaiseSupport(formData),
  });

  const onSubmit = (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("query", data?.query);
    formData.append("description", data?.description);
    mutation.mutate(formData);
  };

  return { register, handleSubmit, onSubmit, errors };
};
