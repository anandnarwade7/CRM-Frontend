import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Link } from "react-router";
import { Back } from "../../assets";
import FormInput from "../../components/custom/FormInput";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { Button } from "../../components/ui/button";
import { useCreateInventory } from "../../hooks/Projects/useCreateInventory";
import { useEffect } from "react";
import { useUserId } from "../../hooks/use-user-id";
import { Loader2, Upload } from "lucide-react";

const ImageUploadField = ({ index, name, label }) => {
  const { formState, setValue, watch } = useFormContext();
  const errors = formState.errors;
  const imageName = watch(name);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue(name, file, { shouldValidate: true });
      console.log(`Set image for ${name}:`, file);
    }
  };

  return (
    <div className="w-full">
      <Label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </Label>
      <div className="flex items-center">
        <label className="flex flex-col items-center justify-center w-full h-10 px-4 border border-gray-300 rounded-md cursor-pointer bg-white hover:bg-gray-50">
          <div className="flex items-center space-x-2">
            <Upload size={16} />
            <span className="text-sm text-gray-500 truncate">
              {imageName ? imageName?.name : "Choose layout image"}
            </span>
          </div>
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div>
      {errors?.towers?.[index]?.layoutImage && (
        <p className="text-red-500 text-sm mt-1">
          {errors?.towers[index]?.layoutImage?.message}
        </p>
      )}
    </div>
  );
};

const CreateInventoryDetails = () => {
  const userId = useUserId();
  const {
    formMethods,
    handleSubmit,
    onSubmit,
    errors,
    watch,
    setValue,
    getValues,
    fields,
    isLoading,
  } = useCreateInventory(userId);

  const totalTower = watch("totalTower");
  const towerCount = parseInt(totalTower, 10) || 0;

  // Adjust towers array length based on totalTower
  useEffect(() => {
    const currentTowers = getValues("towers") || [];
    if (currentTowers.length < towerCount) {
      const newTowers = [...currentTowers];
      while (newTowers.length < towerCount) {
        newTowers.push({
          towerName: "",
          totalFloors: 0,
          flatsPerFloor: 0,
          layoutImage: null,
        });
      }
      setValue("towers", newTowers);
    } else if (currentTowers.length > towerCount) {
      const newTowers = currentTowers.slice(0, towerCount);
      setValue("towers", newTowers);
    }
  }, [towerCount, getValues, setValue]);

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full h-full rounded-xl bg-white px-6 py-3"
      >
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
          <p className="text-xl font-semibold text-main-text mb-1">Property</p>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-32">
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
          <p className="text-main-text font-semibold text-xl">
            Towers/Floors/Flats
          </p>

          <div className="flex items-end gap-5">
            <div className="w-full max-w-[20rem]">
              <FormInput label="Total Tower" name="totalTower" />
            </div>
            {/* <div className="w-full max-w-lg">
              <Label>Total Floor</Label>
            </div>
            <Label>Flats Per Floor</Label> */}
          </div>
          {/* {Array.from({ length: towerCount }).map((_, index) => (
            <div key={index} className="my-4">
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="w-full max-w-lg">
                  <FormInput
                    name={`towers.${index}.towerName`}
                    label="Tower Name"
                  />
                </div>
                <div className="w-full max-w-lg">
                  <FormInput
                    name={`towers.${index}.totalFloors`}
                    label="Total Floors"
                    type="number"
                  />
                </div>
                <div className="w-full max-w-lg">
                  <FormInput
                    name={`towers.${index}.flatsPerFloor`}
                    label="Flats Per Floor"
                    type="number"
                  />
                </div>
              </div>
            </div>
          ))} */}

          {fields?.map((field, index) => (
            <div key={field?.id} className="my-4">
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="w-full max-w-lg">
                  <FormInput
                    name={`towers.${index}.towerName`}
                    label="Tower Name"
                  />
                  {errors.towers?.[index]?.towerName && (
                    <p className="text-red-500 text-sm">
                      {errors.towers[index].towerName.message}
                    </p>
                  )}
                </div>
                <div className="w-full max-w-lg">
                  <FormInput
                    name={`towers.${index}.totalFloors`}
                    label="Total Floors"
                    type="number"
                  />
                  {errors.towers?.[index]?.totalFloors && (
                    <p className="text-red-500 text-sm">
                      {errors.towers[index].totalFloors.message}
                    </p>
                  )}
                </div>
                <div className="w-full max-w-lg">
                  <FormInput
                    name={`towers.${index}.flatsPerFloor`}
                    label="Flats Per Floor"
                    type="number"
                  />
                  {errors.towers?.[index]?.flatsPerFloor && (
                    <p className="text-red-500 text-sm">
                      {errors.towers[index].flatsPerFloor.message}
                    </p>
                  )}
                </div>
                <div>
                  <div className="w-full max-w-lg">
                    <ImageUploadField
                      index={index}
                      name={`towers.${index}.layoutImage`}
                      label="Tower Layout Image"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end mt-7 my-3">
          <Button
            type="submit"
            className="bg-main text-white rounded-md w-full max-w-40"
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
    </FormProvider>
  );
};

export default CreateInventoryDetails;
