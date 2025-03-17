import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useFormContext } from "react-hook-form";

const FormInput = ({ name, label, type = "text" }) => {
  const { register } = useFormContext();
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
    </div>
  );
};

export default FormInput;
