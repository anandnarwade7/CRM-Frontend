import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Link, useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSalesPerson } from "../../../hooks/Sales/useSalesPerson";
import { Back } from "../../../assets";

const UserPersonDetails = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible((prevState) => !prevState);
  const { state } = useLocation();
  console.log("State from useLocation", state);

  const { detailTitle, role } = state;
  const navigate = useNavigate();

  // Custom Hook for Handling Form
  const { register, handleSubmit, onSubmit, errors, isLoading } =
    useSalesPerson(role);

  return (
    <section className="bg-white h-full max-h-screen w-full p-3 rounded-lg">
      {/* Header */}
      <div className="mb-4">
        {/* <Link className="flex items-center gap-4" onClick={() => navigate(-1)}>
          <ArrowLeft size="2rem" color="#5B5959" />
          <span className="text-2xl font-semibold text-[#707070]">
            {detailTitle}
          </span>
        </Link> */}

        <div className="flex items-center">
          <Button
            onClick={() => navigate(-1)}
            className="bg-white text-black shadow-none"
          >
            <img src={Back} alt="back" />
          </Button>
          <span className="text-2xl font-semibold text-[#707070]">
            {detailTitle}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          {/* Name  */}
          <div>
            <Label htmlFor="name" className="text-main-label">
              Name
            </Label>
            <Input
              type="text"
              placeholder="Enter name"
              id="name"
              className="w-full border-2 focus-visible:ring-0 shadow-none py-5 mt-1"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Mobile Number  */}
          <div>
            <Label htmlFor="mobile" className="text-main-label">
              Mobile Number
            </Label>
            <Input
              type="text"
              placeholder="Enter Mobile Number"
              id="mobile"
              className="w-full border-2 focus-visible:ring-0 shadow-none py-5 mt-1"
              {...register("mobile")}
            />
            {errors.mobile && (
              <p className="text-red-500 text-sm">{errors.mobile.message}</p>
            )}
          </div>

          {/* Password  */}
          <div>
            <Label htmlFor="password" className="text-main-label">
              Set Password
            </Label>
            <div className="relative">
              <Input
                className="w-full  focus-visible:ring-0 shadow-none border-2 py-5 pe-8 mt-1"
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
              <p className="text-red-500 text-sm">{errors.password.message}</p>
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
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
        </div>
        <div className="flex justify-end mt-3">
          <Button
            type="submit"
            className="bg-main shadow-none w-full max-w-[31.8rem]"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="animate-spin" size={24} /> : "Add"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default UserPersonDetails;
