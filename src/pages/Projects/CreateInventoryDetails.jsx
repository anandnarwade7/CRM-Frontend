import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Link } from "react-router";
import { Back } from "../../assets";
import FormInput from "../../components/custom/FormInput";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { Button } from "../../components/ui/button";
import { useCreateInventory } from "../../hooks/Projects/useCreateInventory";
import { useEffect, useRef, useState } from "react";
import { useUserId } from "../../hooks/use-user-id";
import {
  CirclePlus,
  CircleX,
  Edit2,
  Loader2,
  Upload,
  UploadIcon,
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import CustomLayoutDialog from "../../components/custom/Projects/CustomLayoutDialog";

const UploadLayoutFile = ({
  title,
  onFileSelect,
  selectedFile,
  towerIndex,
  layoutType,
  error,
}) => {
  const fileInputRef = useRef(null);

  const handleCardClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type and size
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }
      onFileSelect(file, layoutType);
    }
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    onFileSelect(null, layoutType);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="relative">
      <Card
        className="cursor-pointer border-[#B0A7A7] shadow-none h-full min-h-[170px] w-full max-w-[170px] flex flex-col items-center justify-center"
        onClick={handleCardClick}
      >
        <CardContent className="flex flex-col items-center justify-center p-6 relative">
          {selectedFile ? (
            <>
              <div className="flex flex-col items-center">
                <CircleX onClick={handleRemoveFile} />
                <span className="text-sm font-medium text-center">{title}</span>
                <span className="text-xs text-gray-500 mt-1 text-center truncate w-full">
                  {selectedFile.name?.slice(0, 10)}
                </span>
              </div>
            </>
          ) : (
            <>
              <UploadIcon className="mb-2 h-6 w-6" />
              <span className="text-sm">{title}</span>
            </>
          )}
        </CardContent>
      </Card>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      {error && (
        <p className="text-red-500 text-xs mt-1 text-center">
          {error?.message}
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
    trigger,
    clearErrors,
    isLoading,
  } = useCreateInventory(userId);

  const totalTower = watch("totalTower");
  const towerCount = parseInt(totalTower, 10) || 0;

  const handleLayoutFileSelect = async (file, layoutType, towerIndex) => {
    // Clear any existing errors for this field
    clearErrors(`towers.${towerIndex}.${layoutType}Image`);
    // Update the form data directly instead of using separate state
    setValue(`towers.${towerIndex}.${layoutType}Image`, file, {
      shouldValidate: true,
      shouldDirty: true,
    });

    // Trigger validation for the specific field
    await trigger(`towers.${towerIndex}.${layoutType}Image`);
  };

  const handleCustomLayoutAdd = async (customLayoutData, towerIndex) => {
    // Clear any existing errors for this field
    clearErrors(`towers.${towerIndex}.customLayout`);

    // Update the form data directly
    setValue(`towers.${towerIndex}.customLayout`, customLayoutData, {
      shouldValidate: true,
      shouldDirty: true,
    });

    // Trigger validation for the specific field
    await trigger(`towers.${towerIndex}.customLayout`);
  };

  const getLayoutFile = (towerIndex, layoutType) => {
    // Get the file directly from form data
    const towers = watch("towers");
    return towers?.[towerIndex]?.[`${layoutType}Image`] || null;
  };

  const getCustomLayout = (towerIndex) => {
    // Get custom layout directly from form data
    const towers = watch("towers");
    return towers?.[towerIndex]?.customLayout || null;
  };

  const getLayoutError = (towerIndex, layoutType) => {
    return errors?.towers?.[towerIndex]?.[`${layoutType}Image`];
  };

  const getCustomLayoutError = (towerIndex) => {
    return errors?.towers?.[towerIndex]?.customLayout;
  };

  console.log("Form data:", watch("towers"));

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
          </div>

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
              </div>
              <div className="flex items-center gap-16 my-10">
                <UploadLayoutFile
                  title="Odd layout"
                  towerIndex={index}
                  layoutType="odd"
                  selectedFile={getLayoutFile(index, "odd")}
                  onFileSelect={(file, type) =>
                    handleLayoutFileSelect(file, type, index)
                  }
                  error={getLayoutError(index, "odd")}
                />
                <UploadLayoutFile
                  title="Even layout"
                  towerIndex={index}
                  layoutType="even"
                  selectedFile={getLayoutFile(index, "even")}
                  onFileSelect={(file, type) =>
                    handleLayoutFileSelect(file, type, index)
                  }
                  error={getLayoutError(index, "even")}
                />
                <UploadLayoutFile
                  title="Ground layout"
                  towerIndex={index}
                  layoutType="ground"
                  selectedFile={getLayoutFile(index, "ground")}
                  onFileSelect={(file, type) =>
                    handleLayoutFileSelect(file, type, index)
                  }
                  error={getLayoutError(index, "ground")}
                />
                <CustomLayoutDialog
                  towerIndex={index}
                  existingCustomLayout={getCustomLayout(index)}
                  onAddCustomLayout={(data) =>
                    handleCustomLayoutAdd(data, index)
                  }
                />
                {getCustomLayoutError(index) && (
                  <p className="text-red-500 text-xs mt-1">
                    {getCustomLayoutError(index)?.message ||
                      getCustomLayoutError(index)?.file?.message ||
                      getCustomLayoutError(index)?.name?.message}
                  </p>
                )}
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
