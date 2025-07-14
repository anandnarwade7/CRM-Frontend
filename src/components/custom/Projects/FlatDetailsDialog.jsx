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
import { Textarea } from "../../ui/textarea";
import { useGetClientsByCRM } from "../../../hooks/Projects/useGetClientsByCRM";
import { Controller } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

const FlatDetailsDialog = ({ unit, isDialogOpen, setIsDialogOpen }) => {
  const userRole = useUserRole();
  const { toast } = useToast();

  const {
    data: clientData,
    isLoading: clientLoading,
    error: clientError,
  } = useGetClientsByCRM(unit?.id, isDialogOpen && !!unit?.id);

  console.log("Client Data", clientData);

  // Custom hook for get the specific flat details when clicked
  const { data, isLoading, error, refetch } = useGetFlatById(
    unit?.id,
    isDialogOpen && !!unit?.id
  ); // disabled by default

  console.log("Getting data of flat", data);

  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    setValue,
    watch,
    isUpdating,
    resetForm,
    trigger,
    control,
  } = useUpdateFlatStatus(userRole, unit?.id, () => setIsDialogOpen(false));

  // Fetching the updated data and setting into the input fields
  useEffect(() => {
    if (data && isDialogOpen) {
      const removeSqFt = (data?.flatSize || "")
        ?.replace(/sq\.?\s*ft\.?/gi, "")
        ?.trim();
      // setValue("area", data?.flatSize || "");
      setValue("area", removeSqFt);
      setValue("flatType", (data.flatType || "").replace("sq.ft.", "").trim());
      setValue("status", data?.status);
      if (data?.clientEmail) {
        setValue("clientEmail", data?.clientEmail);
      }
      // setValue("flatInfo", data?.flatInfo == "null" ? "" : data?.flatInfo);
      // Handle flatInfo - ensure it's always a string
      const flatInfoValue =
        data?.flatInfo === null ||
        data?.flatInfo === "null" ||
        data?.flatInfo === undefined
          ? ""
          : String(data?.flatInfo);
      setValue("flatInfo", flatInfoValue);
    }
  }, [data, setValue, isDialogOpen]);

  useEffect(() => {
    if (!isDialogOpen) {
      resetForm();
    }
  }, [isDialogOpen]);

  const allStatusOptions = [
    { label: "Available", color: "bg-green-500", value: "Available" },
    // { label: "UN-Available", color: "bg-[#FF6F00]", value: "UnAvailable" },
    { label: "Sold", color: "bg-[#FF0000]", value: "Sold" },
    { label: "Booked", color: "bg-[#85ACFF]", value: "Booked" },
    { label: "Refugee", color: "bg-[#808080]", value: "Refugee" },
  ];

  const statusOptions = useMemo(() => {
    if (data?.status === "Sold" || data?.status === "Refugee") {
      return allStatusOptions?.filter(
        (option) => option?.value === data?.status
      );
    }

    if (userRole == "SALES") {
      return allStatusOptions.filter((option) =>
        ["Available", "Booked", "Refugee"].includes(option.value)
      );
    }

    if (userRole == "CRM") {
      return allStatusOptions.filter((option) =>
        ["Booked", "Sold"].includes(option.value)
      );
    }
    return allStatusOptions;
  }, [data?.status]);

  const selectedStatus = watch("status");
  const selectedClientEmail = watch("clientEmail");

  // Check if client email matches - this is the key logic
  const isClientEmailMatched = useMemo(() => {
    if (userRole !== "CRM") return true; // Non-CRM users can always update

    // If no client is assigned to the flat, allow selection
    if (!data?.clientEmail) return true;

    // Check if selected email matches the existing client email
    return data?.clientEmail === selectedClientEmail;
  }, [data?.clientEmail, selectedClientEmail, userRole]);

  // Determine if status options should be disabled
  const isStatusDisabled = userRole === "CRM" && !isClientEmailMatched;

  // Determine if update button should be disabled
  const isUpdateButtonDisabled =
    isUpdating ||
    data?.status === "Sold" ||
    (userRole === "CRM" && !isClientEmailMatched);

  const shouldHideFlatType =
    data?.status === "Refugee" || selectedStatus === "Refugee";

  const hideUpdateBtn = userRole === "CRM";

  const handleClientSelect = (value) => {
    setValue("clientEmail", value);
    trigger("clientEmail");
  };

  const handleStatusSelect = (optionValue) => {
    if (userRole === "CRM") {
      if (!isClientEmailMatched) {
        toast({
          variant: "destructive",
          description:
            "Please select the correct client email to change status.",
          duration: 3000,
        });
        return;
      }
    }
    setValue("status", optionValue);
  };
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
            {!shouldHideFlatType && (
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
            )}
            {/* <div>
              <Label className="text-main-text">Flat Info</Label>
              <Controller
                name="flatInfo"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    // {...register("flatInfo")}
                    // disabled={userRole === "CRM"}
                  />
                )}
              />
            </div> */}
          </>
        ) : (
          <>
            <div className="my-6 w-full max-w-sm">
              <Label
                htmlFor="tower"
                className="block text-sm mb-1 text-main-text font-medium"
              >
                Select Clients
              </Label>
              <Select
                onValueChange={handleClientSelect}
                value={watch("clientEmail") || ""}
              >
                <SelectTrigger className="w-full border-gray-300 shadow-none">
                  <SelectValue placeholder="Select Client" />
                </SelectTrigger>
                <SelectContent>
                  {clientData?.length === 0 && <p>No client is present</p>}
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

              {/* Show warning if email doesn't match */}
              {userRole === "CRM" &&
                !isClientEmailMatched &&
                data?.clientEmail && (
                  <p className="text-orange-500 text-sm mt-1">
                    ⚠️ This flat ({data?.flatNumber}) is already booked by :{" "}
                    {data.clientEmail}
                  </p>
                )}
            </div>
          </>
        )}
        <div>
          <Label className="text-main-text">Flat Info</Label>
          <Textarea
            {...register("flatInfo")}
            // disabled={userRole === "CRM"}
          />
        </div>

        <div className="mt-4">
          <Label className="text-main-text font-semibold">Status</Label>
          <div className="space-y-2 mt-1">
            <input type="hidden" {...register("status")} />
            {statusOptions?.map((option) => (
              <div
                key={option.value}
                onClick={() => handleStatusSelect(option.value)}
                className={`flex items-center gap-2 ${
                  isStatusDisabled
                    ? "pointer-events-none cursor-not-allowed opacity-50"
                    : "cursor-pointer"
                }`}
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
        {/* {!hideUpdateBtn && (
          <Button
            className="bg-main-secondary w-full mt-4"
            type="submit"
            disabled={isUpdating || data?.status == "Sold"}
          >
            {isUpdating ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              "Update"
            )}
          </Button>
        )} */}
        <Button
          className="bg-main-secondary w-full mt-4"
          type="submit"
          // disabled={isUpdating || data?.status == "Sold" || isBlocked}
          disabled={isUpdateButtonDisabled}
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
