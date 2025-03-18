import { Link } from "react-router";
import { Back } from "../../assets";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useAddAdmin } from "../../hooks/Admin/useAddAdmin";

const AdminDetails = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  const { register, setValue, errors, handleSubmit, onSubmit } = useAddAdmin();

  return (
    <section className="bg-white w-full h-full px-6 py-3 rounded-lg">
      {/* Admin Header */}
      <div className="flex items-center gap-4">
        <Link to={"/app/admin"}>
          <img src={Back} alt="back" />
        </Link>
        <p className="text-[#707070] font-medium text-2xl">Add Admin</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-5 my-10">
          <div>
            <Label htmlFor="name" className="text-[#233A48] font-medium">
              Name
            </Label>
            <Input
              type="text"
              placeholder="Enter name"
              id="name"
              {...register("name")}
              className="w-full focus-visible:ring-0 shadow-none border py-5 mt-1"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Label
              htmlFor="mobileNumber"
              className="text-[#233A48] font-medium"
            >
              Mobile Number
            </Label>
            <Input
              type="text"
              placeholder="Enter Mobile Number"
              id="mobileNumber"
              {...register("mobileNumber")}
              className="w-full focus-visible:ring-0 shadow-none border py-5 mt-1"
            />
            {errors.mobileNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.mobileNumber.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="companyName" className="text-[#233A48] font-medium">
              Company Name
            </Label>
            <Input
              type="text"
              placeholder="Enter Property name"
              id="companyName"
              {...register("companyName")}
              className="w-full focus-visible:ring-0 shadow-none border py-5 mt-1"
            />
            {errors.companyName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.companyName.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="email" className="text-[#233A48] font-medium">
              Company Email
            </Label>
            <Input
              type="email"
              placeholder="Enter Email"
              id="email"
              {...register("email")}
              className="w-full focus-visible:ring-0 shadow-none border py-5 mt-1"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="password" className="text-[#233A48] font-medium">
              Set Password
            </Label>
            <div className="relative">
              <Input
                className="w-full focus-visible:ring-0 shadow-none border py-5 pe-8 mt-1"
                placeholder="Enter Password"
                id="password"
                {...register("password")}
                type={isVisible ? "text" : "password"}
              />
              <button
                className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                type="button"
                onClick={toggleVisibility}
                aria-label={isVisible ? "Hide password" : "Show password"}
                aria-pressed={isVisible}
                aria-controls="password"
              >
                {isVisible ? (
                  <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
                ) : (
                  <Eye size={16} strokeWidth={2} aria-hidden="true" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center justify-end">
          <Button
            type="submit"
            className="bg-[#C99227] text-white w-full max-w-md"
          >
            Add
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AdminDetails;
