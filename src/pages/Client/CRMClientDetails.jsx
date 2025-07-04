import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { Back } from "../../assets";
import { Controller, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import LeadsDetailsInput from "../../components/custom/Leads/LeadsDetailsInput";
import { Loader2, Plus, Trash } from "lucide-react";
import FileUpload from "../../components/custom/FileUpload";
import { useGetClientById } from "../../hooks/Client/useGetClientById";
import { useUpdateCRMLeads } from "../../hooks/Client/useUpdateCRMLeads";
import { Input } from "../../components/ui/input";
import EventDetailsTable from "../../components/custom/Client/EventDetailsTable";
import DatePicker from "../../components/custom/DatePicker";
import { useUploadDocs } from "../../hooks/Client/useUploadDocs";
import { downloadFile, formatDate } from "../../utils/utilityFunction";
import Table from "../../components/custom/Table";
import FileDownloadCard from "../../components/custom/FileDownloadCard";

const CRMClientDetails = () => {
  // Geting the ID from the URL
  const { clientId } = useParams();
  // Fetching Data as per Id
  const { data, isLoading, error } = useGetClientById(clientId);

  // Re-uploading Feature
  const [reUploadFields, setReUploadFields] = useState({
    agreementFile: false,
    stampDutyFile: false,
    tdsDocumentFile: false,
    bankSanctionFile: false,
  });

  const toggleReUpload = (field) => {
    setReUploadFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // Form Handling with Validation
  const {
    register,
    control: updateCRMControl,
    handleSubmit,
    setValue: updateCRMSetValue,
    errors,
    append,
    remove,
    fields,
    onSubmit,
  } = useUpdateCRMLeads(clientId, data?.status);

  const {
    setValue,
    control,
    trigger,
    handleSubmit: handleFileSubmit,
    errors: filesErrors,
    onSubmit: onSubmitFiles,
    isLoading: fileUploading,
  } = useUploadDocs(clientId);

  useEffect(() => {
    if (data) {
      updateCRMSetValue("status", data?.status || "");
    }
  }, [data, clientId, updateCRMSetValue]);

  // Data and Columns for Comments Table
  const crmConversationData = data?.conversationLogs || [];

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

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to={"/app/client"}>
            <img src={Back} alt="back" />
          </Link>
          <p className="text-[#707070] font-medium text-2xl">Lead Details</p>
        </div>
        <Button
          className="shadow-none bg-main text-white p-5 text-sm"
          type="button"
          onClick={handleSubmit(onSubmit)}
        >
          Update
        </Button>
      </div>
      {/* Main Content */}
      <div className="grid grid-cols-3 gap-10 my-4">
        <LeadsDetailsInput label="Id" data={data?.id || "-"} />
        <LeadsDetailsInput label="Lead Name" data={data?.leadName || "-"} />
        <LeadsDetailsInput
          label="Mobile Number"
          data={data?.leadmobile || "-"}
        />
        <LeadsDetailsInput label="Email" data={data?.leadEmail || "-"} />

        <div>
          <Label
            htmlFor="status"
            className="text-main-label text-sm font-normal"
          >
            Status
          </Label>
          <Controller
            name="status"
            control={updateCRMControl}
            render={({ field }) => (
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                }}
                value={field.value}
              >
                <SelectTrigger
                  className="focus-visible:ring-0 shadow-none border-[1px] border-[#B0A7A7] text-[#757575]"
                  id="status"
                >
                  <SelectValue placeholder="Status" />
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
      </div>

      {/* File Uploads Section */}
      <div>
        <div className="flex items-center justify-between my-8">
          <p className="font-medium text-main-text">Upload Initial documents</p>
          <Button
            type="button"
            className="shadow-none bg-main text-white p-5 text-sm"
            disabled={fileUploading}
            onClick={handleFileSubmit(onSubmitFiles)}
          >
            {fileUploading ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              "Upload"
            )}
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20">
          {data?.agreement && !reUploadFields.agreementFile ? (
            <div>
              <FileDownloadCard
                title="Download Agreement"
                onClick={() => downloadFile(data?.agreement, "Agreement.pdf")}
              />
              <Button
                className="mt-2 bg-main w-full"
                onClick={() => toggleReUpload("agreementFile")}
                type="button"
              >
                Re-Upload
              </Button>
            </div>
          ) : (
            <div>
              <FileUpload
                title="Upload Agreement "
                name="agreementFile"
                control={control}
                setValue={setValue}
                trigger={trigger}
              />
              {filesErrors?.agreementFile && (
                <p className="text-red-500 text-sm">
                  {filesErrors?.agreementFile?.message}
                </p>
              )}
              {data?.agreement && (
                <Button
                  className="mt-2 text-sm text-gray-600 underline"
                  variant="ghost"
                  onClick={() => toggleReUpload("agreementFile")}
                  type="button"
                >
                  Cancel Re-Upload
                </Button>
              )}
            </div>
          )}

          {data?.stampDuty && !reUploadFields.stampDutyFile ? (
            <div>
              <FileDownloadCard
                title="Download Stamp duty"
                onClick={() =>
                  downloadFile(data?.stampDuty, "Stamp Duty Document.pdf")
                }
              />
              <Button
                className="mt-2 bg-main w-full"
                onClick={() => toggleReUpload("stampDutyFile")}
                type="button"
              >
                Re-Upload
              </Button>
            </div>
          ) : (
            <div>
              <FileUpload
                title="Upload Stamp duty"
                name="stampDutyFile"
                control={control}
                setValue={setValue}
                trigger={trigger}
              />
              {filesErrors?.stampDutyFile && (
                <p className="text-red-500 text-sm">
                  {filesErrors?.stampDutyFile?.message}
                </p>
              )}
              {data?.stampDuty && (
                <Button
                  className="mt-2 text-sm text-gray-600 underline"
                  variant="ghost"
                  onClick={() => toggleReUpload("stampDutyFile")}
                  type="button"
                >
                  Cancel Re-Upload
                </Button>
              )}
            </div>
          )}

          {data?.tdsDoc && !reUploadFields.tdsDocumentFile ? (
            <div>
              <FileDownloadCard
                title="Download TDS Document"
                onClick={() => downloadFile(data?.tdsDoc, "TDS Document.pdf")}
              />
              <Button
                className="mt-2 bg-main w-full"
                onClick={() => toggleReUpload("tdsDocumentFile")}
                type="button"
              >
                Re-Upload
              </Button>
            </div>
          ) : (
            <div>
              <FileUpload
                title="Upload TDS Document"
                name="tdsDocFile"
                control={control}
                setValue={setValue}
                trigger={trigger}
              />
              {filesErrors?.tdsDocFile && (
                <p className="text-red-500 text-sm">
                  {filesErrors?.tdsDocFile?.message}
                </p>
              )}
              {data?.tdsDoc && (
                <Button
                  className="mt-2 text-sm text-gray-600 underline"
                  variant="ghost"
                  onClick={() => toggleReUpload("tdsDocumentFile")}
                  type="button"
                >
                  Cancel Re-Upload
                </Button>
              )}
            </div>
          )}

          {data?.bankSanction && !reUploadFields.bankSanctionFile ? (
            <div>
              <FileDownloadCard
                title="Download Bank Sanction"
                onClick={() =>
                  downloadFile(data?.bankSanction, "Bank Sanction.pdf")
                }
              />
              <Button
                className="mt-2 bg-main w-full"
                onClick={() => toggleReUpload("bankSanctionFile")}
                type="button"
              >
                Re-Upload
              </Button>
            </div>
          ) : (
            <div>
              <FileUpload
                title="Upload Bank Sanction"
                name="bankSanctionFile"
                control={control}
                setValue={setValue}
                trigger={trigger}
              />
              {filesErrors?.bankSanctionFile && (
                <p className="text-red-500 text-sm">
                  {filesErrors?.bankSanctionFile?.message}
                </p>
              )}
              {data?.bankSanction && (
                <Button
                  className="mt-2 text-sm text-gray-600 underline"
                  variant="ghost"
                  onClick={() => toggleReUpload("bankSanctionFile")}
                  type="button"
                >
                  Cancel Re-Upload
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Event Details Section */}
      <div className="my-16">
        <p className="mb-4 text-main-text font-medium">Payment Schedule</p>
        <div>
          <EventDetailsTable />
        </div>
      </div>

      {/* Notes Section */}
      <div className="my-7">
        <div className="flex items-center justify-between">
          <Label htmlFor="note" className="text-[#233A48] text-sm font-normal">
            Note
          </Label>
          <div className="w-full max-w-[20%]">
            <Label className="text-[#233A48] text-sm font-normal">
              Select Reminder Date
            </Label>
            <div className="mt-1 mb-3">
              <Controller
                control={updateCRMControl}
                name="dueDate"
                render={({ field }) => (
                  <DatePicker
                    value={field.value}
                    onChange={(date) => field.onChange(date)}
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
        <Table data={crmConversationData} columns={columns} />
        {crmConversationData.length === 0 && (
          <p className="text-center text-sm">No Comments Found</p>
        )}
      </div>

      {/* Dynamic Custom Fields */}

      <div className="my-4">
        {fields?.map((field, index) => (
          <div key={field.id} className="flex justify-between gap-4 mb-4">
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
          <p className="text-red-500 text-sm">{errors.customFields.message}</p>
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
    </div>
  );
};

export default CRMClientDetails;
