import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { useUpdateUser } from "../../../hooks/Sales/useUpdateUser";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const UserUpdateDialog = ({ open, onClose, selectedData }) => {
  console.log(selectedData);

  // Logic for handling the password toggle visibility
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  // Custom hook for updating the user details (form submission and form validation)
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    reset,
    setValue,
    isPending,
  } = useUpdateUser(onClose);

  useEffect(() => {
    if (!open) {
      reset();
    } else if (open && selectedData) {
      setValue("name", selectedData?.name || "");
      setValue("mobile", selectedData?.mobile || "");
      setValue("email", selectedData?.email || "");
      setValue("password", selectedData?.password || "");
    }
  }, [open]);

  const handleFormSubmit = (formData) => {
    onSubmit(selectedData?.id, formData);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-left">Update Sales Details</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  placeholder="Enter name"
                  className="w-full"
                  id="name"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <Input
                    type="text"
                    placeholder="Enter Mobile Number"
                    className="w-full"
                    id="mobile"
                    {...register("mobile")}
                  />
                  {errors.mobile && (
                    <p className="text-red-500 text-sm">
                      {errors.mobile.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      className="w-full pe-8"
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
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  placeholder="Abc@gmail.com"
                  className="w-full"
                  id="email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <Button
              type="submit"
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg mt-3 shadow-none"
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                "Update"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserUpdateDialog;
