import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Link } from "react-router";
import { Back } from "../../assets";
import FormInput from "../../components/custom/FormInput";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "../../components/ui/button";

const InventoryDetails = () => {
  const { register } = useForm();
  return (
    <FormProvider register={register}>
      <div className="w-full h-full rounded-xl bg-white px-6 py-3">
        {/* Inventory Details Header */}
        <div className="flex items-center gap-6 mb-8">
          <Link to={"/app/projects"}>
            <img src={Back} alt="back" className="w-6" />
          </Link>
          <p className="text-[#707070] font-medium text-2xl">
            Inventory Details
          </p>
        </div>

        {/* Property */}
        <div className="my-10">
          <p className="text-xl font-semibold mb-1">Property</p>
          <div className="flex items-center gap-32">
            <div>
              <FormInput name="propertyName" label="Property Name" />
            </div>
            <div>
              <FormInput name="address" label="Address" />
            </div>
          </div>
        </div>

        {/* Towers/Floors/Flats */}
        <div>
          <p className="text-xl font-semibold mb-5">Towers/Floors/Flats</p>
          <div>
            <div className="grid grid-cols-3 gap-10 mb-6">
              <FormInput label="Total Tower" name="totalTower" />
              <FormInput label="Total Floor" name="totalFloor" />
              <FormInput label="Flats Per Floor" name="flatsPerFloor" />
            </div>
            <div className="grid grid-cols-3 gap-x-10 gap-y-3">
              <FormInput label="Name" name="towerName1" />
              <FormInput label="Name" name="towerName2" />
              <FormInput label="Name" name="floorName1" />
              <FormInput label="Name" name="floorName2" />
              <FormInput label="Name" name="flatsName1" />
              <FormInput label="Name" name="flatsName2" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end mt-7 my-3">
          <Button className="bg-[#C99227] text-white rounded-md w-full max-w-40">
            Create
          </Button>
        </div>
      </div>
    </FormProvider>
  );
};

export default InventoryDetails;
