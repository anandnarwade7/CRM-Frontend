import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useEffect, useState } from "react";
import { useUpdateSqFt } from "../../hooks/Projects/useUpdateSqFt";
import { data, useLocation } from "react-router";
import { useGetTowerDetails } from "../../hooks/Projects/useGetTowerDetails";
import { Controller } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { useAreaDetails } from "../../hooks/Projects/useAreaDetails";
import { useGetLayoutImage } from "../../hooks/Projects/useGetLayoutImage";

const AreaCard = ({ index, register, errors, flatNumber }) => {
  return (
    <Card className="border rounded-md overflow-hidden">
      <CardContent className="p-0">
        <div className="p-3 text-center">
          <span className="text-lg font-medium text-blue-800">
            {flatNumber}
          </span>
        </div>
        <div className="p-3">
          <Label
            // htmlFor={`area-${number}`}
            className="text-sm text-gray-600 block mb-1"
          >
            Area
          </Label>

          <div className="relative">
            <Input
              //   id={`area-${number}`}
              //   value={area}
              className="peer pe-12 border-[#CECECE] bg-gray-100"
              {...register(`areas.${index}.flatSize`)}
            />
            <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
              sq.ft.
            </span>
          </div>
          {errors?.areas?.[index]?.flatSize && (
            <p className="text-red-500 text-sm mt-1">
              {errors?.areas?.[index]?.flatSize?.message}
            </p>
          )}
        </div>
        <div className="p-3">
          <Label
            // htmlFor={`area-${number}`}
            className="text-sm text-gray-600 block mb-1"
          >
            Flat Type
          </Label>

          <div className="relative">
            <Input
              //   id={`area-${number}`}
              //   value={area}
              className="peer pe-12 border-[#CECECE] bg-gray-100"
              {...register(`areas.${index}.flatType`)}
            />
            <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
              BHK
            </span>
          </div>
          {errors?.areas?.[index]?.flatType && (
            <p className="text-red-500 text-sm mt-1">
              {errors?.areas?.[index]?.flatType?.message}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
const UpdateSqFt = () => {
  const location = useLocation();
  const projectId = location?.state?.projectId;

  console.log("Project ID in Update Sq Ft Page Via Navigate State", projectId);

  // Fetching the Tower Select Dropdown data via Project ID
  const {
    data: towerSelectData,
    isLoading: towerSelectLoading,
    error: towerSelectError,
  } = useGetTowerDetails(projectId);

  // Hook for managing the form states , validation and update the sq feet details
  const {
    register,
    handleSubmit,
    onSumit,
    setValue,
    watch,
    resetAreas,
    control,
    fields,
    errors,
    isUpating,
  } = useUpdateSqFt();

  const towerId = watch("tower");

  const {
    data: layoutImgData,
    isLoading: layoutImgLoading,
    error: layoutImgError,
  } = useGetLayoutImage(towerId);

  console.log("Layout Image data", layoutImgData);

  const {
    data: areaDetails,
    isLoading: areaLoading,
    error: areaError,
  } = useAreaDetails(projectId, towerId);

  useEffect(() => {
    if (areaDetails?.length > 0) {
      const updatedAreas = areaDetails?.map((item) => ({
        ...item,
        flatSize: "",
        flatType: "",
      }));
      resetAreas(updatedAreas);
    }
  }, [areaDetails]);

  // Creating the array of object {towerId , isUpdated} before navigating to new page.

  useEffect(() => {
    if (towerSelectData && towerSelectData?.length > 0) {
      const sqFtStatusArray = towerSelectData?.map((tower) => ({
        towerId: tower?.id,
        isUpdated: false,
      }));

      sessionStorage.setItem("sqFtStatus", JSON.stringify(sqFtStatusArray));
    }
  }, [towerSelectData]);

  if (areaError) {
    return <p className="text-red-500 text-sm">Failed to Fetch</p>;
  }

  console.log("Area Details Data", data);

  console.log(errors);

  return (
    <section className="w-full h-full rounded-xl bg-white px-6 py-3">
      <form onSubmit={handleSubmit(onSumit)}>
        <div className="flex items-center">
          {towerSelectLoading ? (
            <Loader2 className="animate-spin" size={24} />
          ) : (
            <div className="w-full">
              <Label className="text-main-text my-2">Tower</Label>
              <Controller
                control={control}
                name="tower"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full max-w-[180px]">
                      <SelectValue placeholder="Select tower" />
                    </SelectTrigger>
                    <SelectContent>
                      {towerSelectData?.map((tower) => (
                        <SelectItem key={tower?.id} value={String(tower?.id)}>
                          {tower?.towerName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors?.tower && (
                <p className="text-red-500 text-sm mt-1">
                  {errors?.tower?.message}
                </p>
              )}
            </div>
          )}
          <Button className="bg-main">Layout Image</Button>
        </div>
        {areaLoading ? (
          <Loader2 className="animate-spin" size={24} />
        ) : (
          <div className="flex flex-wrap gap-4 my-4">
            {fields?.map((field, index) => (
              <AreaCard
                key={field?.id}
                index={index}
                register={register}
                errors={errors}
                flatNumber={field?.flatNumber}
              />
            ))}
          </div>
        )}

        <div className="flex justify-end mt-4">
          <Button className="bg-main w-full max-w-[150px]" disabled={isUpating}>
            {isUpating ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              "Update"
            )}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default UpdateSqFt;
