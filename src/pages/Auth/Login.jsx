import { useState } from "react";
import { LoginImage } from "../../assets/index";
import { Card, CardHeader, CardContent } from "@/components/ui/card.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useLoginForm } from "../../hooks/Auth/useLoginForm";

const Login = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  const { register, handleSubmit, onSubmit, errors, setValue, isLoading } =
    useLoginForm();

  return (
    <>
      <div
        className="h-screen w-full flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${LoginImage})` }}
      >
        <Card className="w-full max-w-md bg-white shadow-xl rounded-lg px-0 py-4">
          <div className="flex justify-center">
            <div className="w-[11rem] h-[4rem] bg-[#F8F8F8] rounded-lg"></div>
          </div>

          <p className="text-2xl font-bold text-center mt-2 mb-5">Log in</p>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                {/* Select Role */}
                <div>
                  <Label htmlFor="selectrole">Select Role</Label>
                  <Select
                    onValueChange={(value) =>
                      setValue("role", value, { shouldValidate: true })
                    }
                  >
                    <SelectTrigger className="w-full bg-[#F8F8F8] focus:ring-0 shadow-none border-none">
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SUPER ADMIN">Super Admin</SelectItem>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      <SelectItem value="SALES">Sales Person</SelectItem>
                      <SelectItem value="CRM">CR Manager</SelectItem>
                      <SelectItem value="CLIENT">Client</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.role && (
                    <p className="text-red-500 text-sm">
                      {errors.role.message}
                    </p>
                  )}
                </div>

                {/* Email Input */}
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    placeholder="Enter Email"
                    id="email"
                    {...register("email")}
                    className="w-full bg-[#F8F8F8] focus-visible:ring-0 shadow-none border-none py-5 mt-1"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password Input */}
                {/* <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  placeholder="Enter password"
                  className="w-full bg-[#F8F8F8] focus-visible:ring-0 shadow-none border-none py-5 mt-1"
                />
              </div> */}
                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      className="w-full bg-[#F8F8F8] focus-visible:ring-0 shadow-none border-none py-5 pe-8 mt-1"
                      placeholder="Password"
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
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  className="w-full bg-[#C99227] hover:bg-yellow-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" size={24} />
                  ) : (
                    "Login"
                  )}
                </Button>

                {/* Register Link */}
                {/* <p className="text-sm text-center">
                Don’t have an account?
                <a href="#" className="text-[#C99227] hover:underline">
                  Register here
                </a>
              </p> */}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Login;
