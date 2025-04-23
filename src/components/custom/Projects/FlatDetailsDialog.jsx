import React, { useEffect, useState } from "react";
import { DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useUpdateFlatStatus } from "../../../hooks/Projects/useUpdateFlatStatus";
import { Loader2 } from "lucide-react";

const FlatDetailsDialog = ({ unit, isDialogOpen, setIsDialogOpen }) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    setValue,
    watch,
    isUpdating,
    resetForm,
  } = useUpdateFlatStatus(unit?.id, () => setIsDialogOpen(false));

  const statusOptions = [
    { label: "Available", color: "bg-green-500", value: "Available" },
    { label: "UN-Available", color: "bg-[#FF6F00]", value: "UnAvailable" },
    { label: "Booked", color: "bg-[#85ACFF]", value: "Booked" },
  ];

  const selectedStatus = watch("status");

  useEffect(() => {
    if (!isDialogOpen) {
      resetForm();
    }
  }, [isDialogOpen]);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{unit?.flatNumber}</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-2">
          <Label htmlFor="area" className="text-main-text font-semibold">
            Area
          </Label>
          <div className="relative">
            <Input
              id="area"
              className="peer pe-12 border-[#CECECE]"
              type="text"
              {...register("area")}
            />
            <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
              sq.ft.
            </span>
          </div>
          {errors?.area && (
            <p className="text-red-500 text-sm mt-1">{errors?.area?.message}</p>
          )}
        </div>
        <div>
          <Label className="text-main-text font-semibold">Status</Label>
          <div className="space-y-2 mt-1">
            <input type="hidden" {...register("status")} />
            {statusOptions?.map((option) => (
              <div
                key={option.value}
                onClick={() => setValue("status", option.value)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <div
                  className={`w-4 h-4 rounded-full border ${
                    selectedStatus === option.value
                      ? option.color
                      : "bg-gray-200"
                  }`}
                />
                <p>{option.label}</p>
              </div>
            ))}
          </div>
          {errors?.status && (
            <p className="text-red-500 text-sm">{errors?.status?.message}</p>
          )}
        </div>
        <Button
          className="bg-main-secondary w-full mt-4"
          type="submit"
          disabled={isUpdating}
        >
          {isUpdating ? (
            <Loader2 className="animate-spin" size={24} />
          ) : (
            "Update"
          )}
        </Button>
      </form>
    </DialogContent>
  );
};

export default FlatDetailsDialog;
