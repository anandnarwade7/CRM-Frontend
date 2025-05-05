import React, { useEffect, useMemo, useState } from "react";
import { DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useUpdateFlatStatus } from "../../../hooks/Projects/useUpdateFlatStatus";
import { Loader2 } from "lucide-react";
import { useGetFlatById } from "../../../hooks/Projects/useGetFlatById";
import { useUserRole } from "../../../hooks/use-userrole";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { useGetClientsByCRM } from "../../../hooks/Projects/useGetClientsByCRM";

const FlatDetailsDialog = ({ unit, isDialogOpen, setIsDialogOpen }) => {
  const userRole = useUserRole();

  

  console.log("ROle", userRole);

  const {
    data: clientData,
    isLoading: clientLoading,
    error: clientError,
  } = useGetClientsByCRM();

  console.log("Client Data list in dialog", clientData);

  // Custom hook for get the specific flat details when clicked
  const { data, isLoading, error, refetch } = useGetFlatById(unit?.id, false); // disabled by default

  useEffect(() => {
    if (isDialogOpen && unit?.id) {
      refetch();
    }
  }, [isDialogOpen, unit?.id, refetch]);

  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    setValue,
    watch,
    isUpdating,
    resetForm,
  } = useUpdateFlatStatus(userRole, unit?.id, () => setIsDialogOpen(false));

  useEffect(() => {
    if (data) {
      setValue("area", data?.flatSize || "");
      setValue("flatType", (data.flatType || "").replace("sq.ft.", "").trim());
      setValue("status", data?.status);
    }
  }, [data, setValue]);

  const statusOptions = [
    { label: "Available", color: "bg-green-500", value: "Available" },
    // { label: "UN-Available", color: "bg-[#FF6F00]", value: "UnAvailable" },
    { label: "Booked", color: "bg-[#85ACFF]", value: "Booked" },
    { label: "Refugee", color: "bg-[#E1777C]", value: "Refugee" },
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
        {userRole === "ADMIN" ? (
          <>
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
                <p className="text-red-500 text-sm mt-1">
                  {errors?.area?.message}
                </p>
              )}
            </div>
            <div className="my-2">
              <Label htmlFor="area" className="text-main-text font-semibold">
                Flat Type
              </Label>
              <div className="relative">
                <Input
                  id="flatType"
                  className="peer pe-12 border-[#CECECE]"
                  type="text"
                  {...register("flatType")}
                />
                <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
                  BHK
                </span>
              </div>
              {errors?.flatType && (
                <p className="text-red-500 text-sm mt-1">
                  {errors?.flatType?.message}
                </p>
              )}
            </div>
          </>
        ) : (
          <div className="my-6 w-full max-w-sm">
            <Label
              htmlFor="tower"
              className="block text-sm mb-1 text-main-text font-medium"
            >
              Select Clients
            </Label>
            <Select
              onValueChange={(value) => setValue("clientEmail", value)}
              value={watch("clientEmail")}
            >
              <SelectTrigger className="w-full border-gray-300 shadow-none">
                <SelectValue placeholder="Select Client" />
              </SelectTrigger>
              <SelectContent>
                {clientData?.map((client) => (
                  <SelectItem key={client.id} value={client.email}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors?.clientEmail && (
              <p className="text-red-500 text-sm mt-1">
                {errors?.clientEmail?.message}
              </p>
            )}
          </div>
        )}
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
