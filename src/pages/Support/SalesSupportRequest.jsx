import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { usePostSupport } from "../../hooks/Support/usePostSupport";
import { useUserId } from "../../hooks/use-user-id";

const SalesSupportRequest = () => {
  const userId = useUserId();

  const { register, handleSubmit, onSubmit, errors } = usePostSupport(userId);

  return (
    <>
      {/* Sales Support Header */}
      <div>
        <p className="font-medium text-2xl text-[#707070]">Support Request</p>
      </div>
      {/* Sales Support Main */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-y-4 gap-x-10 my-5">
          <div>
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
          </div>
          {/* <div>
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              type="text"
              placeholder="Enter Phone Number"
              id="phoneNumber"
              {...register("phoneNumber")}
              className="w-full  focus-visible:ring-0 shadow-none border py-5 mt-1"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phoneNumber.message}
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
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="chooseDepartment">Choose Department</Label>
            <Input
              type="text"
              placeholder="Choose Department"
              id="chooseDepartment"
              {...register("department")}
              className="w-full  focus-visible:ring-0 shadow-none border py-5 mt-1"
            />
            {errors.department && (
              <p className="text-red-500 text-sm mt-1">
                {errors.department.message}
              </p>
            )}
          </div> */}
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            placeholder="Enter Here....."
            id="description"
            className="focus-visible:ring-0 shadow-none  w-full"
            rows={5}
            {...register("description")}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>
        <Button type="submit" className="w-full mt-12 bg-main">
          Submit
        </Button>
      </form>
    </>
  );
};

export default SalesSupportRequest;
