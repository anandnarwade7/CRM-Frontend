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
import DatePicker from "../../components/custom/DatePicker";
import Table from "../../components/custom/Table";
import { formatDate } from "../../utils/utilityFunction";

const SalesLeadsDetails = () => {
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  // Geting the ID from the URL
  const { leadId } = useParams();

  // Fetching Data as per Id
  const { data, isLoading, error } = useGetLeadsById(leadId);

  // Custom Hook for Handling Form and Form Submission
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
  } = usePostSalesLeads(leadId, data, isStatusOpen);

  // Fetching the Data and set the values in the form
  useEffect(() => {
    if (data) {
      const statusValue =
        data?.status &&
        ["COLD", "HOT", "CONVERTED", "REJECTED"].includes(data?.status)
          ? data?.status
          : "";
      setValue("status", statusValue);

      // const lastComment =
      //   data?.conversationLogs?.length > 0
      //     ? data?.conversationLogs[data?.conversationLogs?.length - 1]?.comment
      //     : "";

      // setValue("note", lastComment);
      setValue("customFields", []);

      // setValue(
      //   "note",
      //   data?.conversationLogs?.map((log) => log.comment).join("\n") || ""
      // );

      if (data?.dynamicFields?.length > 0) {
        // Convert dynamic fields into key-value array format
        const formattedFields = data.dynamicFields.flatMap((field) =>
          Object.entries(field).map(([label, value]) => ({ label, value }))
        );

        setValue("customFields", formattedFields);
      }
    }
  }, [data, setValue, append, leadId]);

  // Data and Columns for Comments Table
  const conversationData = data?.conversationLogs || [];

  const columns = [
    {
      header: "Sr. No",
      cell: ({ row }) => row.index + 1,
    },
    {
      header: "Description",
      accessorKey: "comment",
    },
    {
      header: "Created Date",
      accessorKey: "date",
      cell: ({ row }) => (
        <p>
          {row?.original?.date ? formatDate(Number(row?.original?.date)) : "-"}
        </p>
      ),
    },
    {
      header: "Reminder Date",
      accessorKey: "dueDate",
      cell: ({ row }) => (
        <p>
          {row?.original?.dueDate
            ? formatDate(Number(row?.original?.dueDate))
            : "-"}
        </p>
      ),
    },
  ];

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
            className="shadow-none bg-main p-5 text-sm"
            type="button"
            onClick={() => setIsStatusOpen(true)}
          >
            <Plus />
            Lead Closer
          </Button>
        </div>
        {/* Main Content */}
        <div className="grid grid-cols-3 gap-10 my-4">
          <LeadsDetailsInput label="Id" data={data?.id} />
          <LeadsDetailsInput label="Lead Name" data={data?.name} />
          <LeadsDetailsInput label="Mobile Number" data={data?.mobileNumber} />
          <LeadsDetailsInput label="Email" data={data?.email} />
          {(data?.status !== "ASSIGNED" || isStatusOpen) && (
            <div>
              <Label
                htmlFor="status"
                className="text-main-label text-sm font-normal"
              >
                Lead Disposal
              </Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    value={field.value || ""}
                  >
                    <SelectTrigger
                      className="focus-visible:ring-0 shadow-none border-[1px] border-[#B0A7A7] text-[#757575]"
                      id="status"
                    >
                      <SelectValue placeholder="Select Lead Disposal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="COLD">Cold</SelectItem>
                      <SelectItem value="HOT">Hot</SelectItem>
                      <SelectItem value="CONVERTED">Sales Completed</SelectItem>
                      <SelectItem value="REJECTED">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.status && (
                <p className="text-red-500 text-sm">{errors.status.message}</p>
              )}
            </div>
          )}
        </div>
        <div className="my-7">
          <div className="flex items-center justify-between mb-4">
            <Label
              htmlFor="note"
              className="text-[#233A48] text-sm font-normal"
            >
              Note
            </Label>

            <div className="w-full max-w-[20%]">
              <Label className="text-[#233A48] text-sm font-normal">
                Select Reminder Date
              </Label>
              <div className="mt-1">
                <Controller
                  control={control}
                  name="dueDate"
                  render={({ field }) => (
                    <DatePicker
                      value={field.value}
                      onChange={(date) => field.onChange(date)}
                      // placeholder="Select Reminder Date"
                    />
                  )}
                />
                {errors?.dueDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors?.dueDate?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
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

        <div>
          <Table data={conversationData} columns={columns} />
          {conversationData.length === 0 && (
            <p className="text-center text-sm">No Comments Found</p>
          )}
        </div>

        <div className="my-4">
          {fields?.map((field, index) => (
            <div key={index} className="flex justify-between gap-4 mb-4">
              <div className="w-full mb-3 flex flex-col gap-2">
                <div>
                  <Input
                    type="text"
                    placeholder="label"
                    {...register(`customFields.${index}.label`)}
                    className="border border-gray-300 p-2 rounded shadow-none focus-visible:ring-0"
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
                  className="border border-gray-300 p-2 rounded shadow-none focus-visible:ring-0"
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
                type="button"
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

        <div>
          <Button
            className="text-main-secondary bg-transparent shadow-none"
            type="button"
            onClick={() => append({ label: "", value: "" })}
          >
            <Plus />
            Add Custom Field
          </Button>
        </div>
        <div>
          <Button
            className="shadow-none bg-main p-5 text-sm w-full max-w-[10rem] mt-10"
            type="submit"
          >
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SalesLeadsDetails;
