import { Link, useParams } from "react-router";
import { Back } from "../../assets";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { useEffect, useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useAddClient } from "../../hooks/Client/useAddClient";
import { useGetClientById } from "../../hooks/Client/useGetClientById";

const AddClient = () => {
  const { id } = useParams();

  // States for password toggling
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const togglePasswordVisibility = () =>
    setIsPasswordVisible((prevState) => !prevState);
  const toggleConfirmPasswordVisibility = () =>
    setIsConfirmPasswordVisible((prevState) => !prevState);

  // Custom Hook for Handling Form
  const { register, handleSubmit, onSubmit, errors, reset, isLoading } =
    useAddClient();

  // Custom hook for getting the clients data with id
  const {
    data: clientData,
    isLoading: isClientLoading,
    error: clientError,
  } = useGetClientById(id);

  useEffect(() => {
    if (clientData) {
      reset({
        name: clientData?.leadName || "",
        mobile: clientData?.leadmobile || "",
        email: clientData?.leadEmail || "",
        // password: "",
        // confirmPassword: "",
      });
    }
  }, [clientData, reset]);

  return (
    <section className="bg-white h-full w-full rounded-xl px-6 py-3">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to={"/app/client"}>
          <img src={Back} alt="back" />
        </Link>
        <p className="text-[#707070] font-medium text-2xl">Client Details</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4 my-10">
          {/* Name  */}
          <div>
            <Label htmlFor="name" className="text-main-label">
              Client Name
            </Label>
            <Input
              type="text"
              placeholder="Enter name"
              id="name"
              className="w-full border-2 focus-visible:ring-0 shadow-none py-5 mt-1"
              {...register("name")}
              disabled
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Mobile Number  */}
          <div>
            <Label htmlFor="mobile" className="text-main-label">
              Phone Number
            </Label>
            <Input
              type="text"
              placeholder="Enter Mobile Number"
              id="mobile"
              className="w-full border-2 focus-visible:ring-0 shadow-none py-5 mt-1"
              {...register("mobile")}
              disabled
            />
            {errors.mobile && (
              <p className="text-red-500 text-sm">{errors.mobile.message}</p>
            )}
          </div>

          {/* Email  */}
          <div>
            <Label htmlFor="email" className="text-main-label">
              Email
            </Label>
            <Input
              type="email"
              placeholder="Enter Email"
              id="email"
              className="w-full focus-visible:ring-0 shadow-none border-2 py-5 mt-1"
              {...register("email")}
              disabled
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password  */}
          {/* <div>
            <Label htmlFor="password" className="text-main-label">
              Set Password
            </Label>
            <div className="relative">
              <Input
                className="w-full  focus-visible:ring-0 shadow-none border-2 py-5 pe-8 mt-1"
                placeholder="Enter Password"
                id="password"
                {...register("password")}
                type={isPasswordVisible ? "text" : "password"}
              />
              <button
                className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                type="button"
                onClick={togglePasswordVisibility}
                aria-label={
                  isPasswordVisible ? "Hide password" : "Show password"
                }
                aria-pressed={isPasswordVisible}
                aria-controls="password"
              >
                {isPasswordVisible ? (
                  <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
                ) : (
                  <Eye size={16} strokeWidth={2} aria-hidden="true" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div> */}
          {/* Confirm Password  */}
          {/* <div>
            <Label htmlFor="confirmPassword" className="text-main-label">
              Confirm Password
            </Label>
            <div className="relative">
              <Input
                className="w-full  focus-visible:ring-0 shadow-none border-2 py-5 pe-8 mt-1"
                placeholder="Re- enter password"
                id="confirmPassword"
                {...register("confirmPassword")}
                type={isConfirmPasswordVisible ? "text" : "password"}
              />
              <button
                className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                aria-label={
                  isConfirmPasswordVisible ? "Hide password" : "Show password"
                }
                aria-pressed={isConfirmPasswordVisible}
                aria-controls="password"
              >
                {isConfirmPasswordVisible ? (
                  <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
                ) : (
                  <Eye size={16} strokeWidth={2} aria-hidden="true" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div> */}
        </div>
        <div className="flex justify-end mt-3">
          <Button
            type="submit"
            className="bg-main shadow-none w-full max-w-[31.8rem]"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AddClient;
