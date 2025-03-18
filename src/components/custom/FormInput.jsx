import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useFormContext } from "react-hook-form";

const FormInput = ({ name, label, type = "text" }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="w-full">
      <Label htmlFor={name} className="text-sm font-medium">
        {label}
      </Label>
      <Input
        type={type}
        {...register(name)}
        id={name}
        className="bg-white focus-visible:ring-0 shadow-none py-4 mt-1 right-1"
      />
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default FormInput;
