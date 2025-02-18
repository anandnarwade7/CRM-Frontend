import { Link, useParams } from "react-router";
import { Back } from "../../assets";
import { Button } from "../../components/ui/button";
import { Plus, Trash } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";

import LeadsDetailsInput from "../../components/custom/Leads/LeadsDetailsInput";
import { Label } from "../../components/ui/label";
import { useEffect, useState } from "react";
import { Input } from "../../components/ui/input";
import { usePostSalesLeads } from "../../hooks/Leads/usePostSalesLeads";
import { Controller } from "react-hook-form";
import { useGetLeadsById } from "../../hooks/Leads/useGetLeadsById";

const SalesLeadsDetails = () => {
  const { leadId } = useParams();

  const { data, isLoading, error } = useGetLeadsById(leadId);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    errors,
    onSubmit,
    fields,
    append,
    remove,
  } = usePostSalesLeads(leadId);

  useEffect(() => {
    if (data) {
      setValue("status", data?.leadStatus || "COLD");
      setValue(
        "note",
        data?.conversationLogs?.map((log) => log.comment).join("\n") || ""
      );

      //   if (data?.dynamicFields) {
      //     const dynamicFieldsArray = Object.entries(data?.dynamicFields).map(
      //       ([label, value]) => ({ label, value })
      //     );
      //     dynamicFieldsArray.forEach((field) => append(field));
      //   }

      if (data.dynamicFields && Object.keys(data.dynamicFields).length > 0) {
        const existingFields = getValues("customFields") || [];

        // Avoid duplicating existing fields
        if (existingFields.length === 0) {
          Object.entries(data.dynamicFields).forEach(([label, value]) => {
            append({ label, value });
          });
        }
      }
    }
  }, [data, setValue, append, getValues]);

  return (
    <div className="w-full rounded-xl bg-white h-full px-6 py-3">
      {/* Leads Details Header */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to={"/app/leads"}>
              <img src={Back} alt="back" />
            </Link>
            <p className="text-[#707070] font-medium text-2xl">Lead Details</p>
          </div>
          <Button
            className="shadow-none bg-[#C99227] p-5 text-sm"
            type="submit"
          >
            <Plus />
            Convert Lead
          </Button>
        </div>
        {/* Main Content */}
        <div className="grid grid-cols-3 gap-10 my-4">
          <LeadsDetailsInput label="Id" data={data?.id} />
          <LeadsDetailsInput label="Lead Name" data={data?.name} />
          <LeadsDetailsInput label="Mobile Number" data={data?.mobileNumber} />
          <LeadsDetailsInput label="Email" data={data?.email} />
          <div>
            <Label
              htmlFor="status"
              className="text-[#233A48] text-sm font-normal"
            >
              Status
            </Label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger
                    className="focus-visible:ring-0 shadow-none border-[1px] border-[#B0A7A7] text-[#757575]"
                    id="status"
                  >
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="COLD">Cold</SelectItem>
                    <SelectItem value="WARM">Warm</SelectItem>
                    <SelectItem value="HOT">Hot</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.status && (
              <p className="text-red-500 text-sm">{errors.status.message}</p>
            )}
          </div>
        </div>
        <div className="my-7">
          <Label htmlFor="note" className="text-[#233A48] text-sm font-normal">
            Note
          </Label>
          <Textarea
            placeholder="Note"
            id="note"
            rows={10}
            className="shadow-none focus-visible:ring-0 border-[1px] border-[#B0A7A7] text-[#757575] resize-none"
            {...register("note")}
          />
          {errors.note && (
            <p className="text-red-500 text-sm">{errors.note.message}</p>
          )}
        </div>

        <div className="my-4">
          {fields?.map((field, index) => (
            <div key={index} className="flex justify-between gap-4 mb-6">
              <div className="w-full mb-3 flex flex-col gap-2">
                <div>
                  <Input
                    type="text"
                    placeholder="label"
                    {...register(`customFields.${index}.label`)}
                    className="border border-gray-300 p-2 rounded shadow-none"
                    maxLength={30}
                  />

                  {errors.customFields?.[index]?.label && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.customFields[index].label.message}
                    </p>
                  )}
                </div>

                <Input
                  type="text"
                  placeholder="Value"
                  {...register(`customFields.${index}.value`)}
                  className="border border-gray-300 p-2 rounded shadow-none"
                  maxLength={30}
                />

                {errors.customFields?.[index]?.value && (
                  <p className="text-red-500 text-sm">
                    {errors.customFields[index].value.message}
                  </p>
                )}
              </div>
              <Button
                variant="outline"
                size="icon"
                className="text-red-500 border-red-500 hover:bg-red-100"
                onClick={() => remove(index)}
              >
                <Trash size={16} />
              </Button>
            </div>
          ))}
          {errors.customFields && (
            <p className="text-red-500 text-sm">
              {errors.customFields.message}
            </p>
          )}
        </div>

        {fields?.length < 3 && (
          <div>
            <Button
              className="text-[#C99227] bg-transparent shadow-none"
              type="button"
              onClick={() => append({ label: "", value: "" })}
            >
              <Plus />
              Add Custom Field
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default SalesLeadsDetails;
