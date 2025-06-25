import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { usePostSupport } from "../../hooks/Support/usePostSupport";
import { useUserId } from "../../hooks/use-user-id";
import { Loader2 } from "lucide-react";
import { Link } from "react-router";
import { Back } from "../../assets";
import { useGetUserDetails } from "../../hooks/use-getuserdetails";
import { useEffect } from "react";

const SalesSupportRequest = () => {
  const userId = useUserId();

  const { data } = useGetUserDetails();

  const { register, handleSubmit, onSubmit, setValue, errors, isSubmitting } =
    usePostSupport(userId);

  useEffect(() => {
    if (data) {
      setValue("name", data?.name);
      setValue("email", data?.email);
      setValue("phone", data?.mobile);
    }
  }, [data]);

  return (
    <section className="bg-white w-full p-3 rounded-lg">
      {/* Sales Support Header */}
      <div className="flex items-center gap-4">
        <Link to={"/app/support"}>
          <img src={Back} alt="back" />
        </Link>
        <p className="font-medium text-2xl text-[#707070]">Support Request</p>
      </div>
      {/* Sales Support Main */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-y-4 gap-x-10 my-5">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              placeholder="Enter Name"
              id="name"
              {...register("name")}
              className="w-full focus-visible:ring-0 shadow-none border py-5 mt-1"
              disabled={data?.name}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          {/* <div>
            <Label htmlFor="query">Query</Label>
            <Input
              type="text"
              placeholder="Enter Query"
              id="query"
              {...register("query")}
              className="w-full focus-visible:ring-0 shadow-none border py-5 mt-1"
            />
            {errors.query && (
              <p className="text-red-500 text-sm mt-1">
                {errors.query.message}
              </p>
            )}
          </div> */}
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              type="text"
              placeholder="Enter Phone Number"
              id="phone"
              {...register("phone")}
              className="w-full  focus-visible:ring-0 shadow-none border py-5 mt-1"
              disabled={data?.mobile}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              placeholder="Enter Email"
              id="email"
              {...register("email")}
              className="w-full focus-visible:ring-0 shadow-none border py-5 mt-1"
              disabled={data?.email}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="chooseDepartment">Department</Label>
            <Input
              type="text"
              placeholder="Enter Department"
              id="chooseDepartment"
              {...register("department")}
              className="w-full  focus-visible:ring-0 shadow-none border py-5 mt-1"
            />
            {errors.department && (
              <p className="text-red-500 text-sm mt-1">
                {errors.department.message}
              </p>
            )}
          </div>
        </div>
        <div>
          <Label htmlFor="query">Query/Message</Label>
          <Textarea
            placeholder="Enter Here....."
            id="query"
            className="focus-visible:ring-0 shadow-none  w-full"
            rows={5}
            {...register("query")}
          />
          {errors.query && (
            <p className="text-red-500 text-sm mt-1">{errors.query.message}</p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full mt-12 bg-main"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin" size={24} />
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </section>
  );
};

export default SalesSupportRequest;
