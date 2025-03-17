import React from "react";
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
import { Plus, Trash } from "lucide-react";
import FileUpload from "../../components/custom/FileUpload";
import { useGetClientById } from "../../hooks/Client/useGetClientById";
import { useUpdateCRMLeads } from "../../hooks/Client/useUpdateCRMLeads";
import { Input } from "../../components/ui/input";

const CRMClientDetails = () => {
  // Geting the ID from the URL
  const { clientId } = useParams();
  // Fetching Data as per Id
  const { data, isLoading, error } = useGetClientById(clientId);

  // Form Handling with Validation
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    errors,
    trigger,
    append,
    remove,
    fields,
    onSubmit,
  } = useUpdateCRMLeads();

  return (
    <div className="w-full rounded-xl bg-white h-full px-6 py-3">
      {/* Leads Details Header */}
      <form>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to={"/app/client"}>
              <img src={Back} alt="back" />
            </Link>
            <p className="text-[#707070] font-medium text-2xl">Lead Details</p>
          </div>
          <Button
            className="shadow-none bg-[#C99227] p-5 text-sm"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            Update
          </Button>
        </div>
        {/* Main Content */}
        <div className="grid grid-cols-3 gap-10 my-4">
          <LeadsDetailsInput label="Id" data={data?.id || "1"} />
          <LeadsDetailsInput label="Lead Name" data={data?.leadName || "XYZ"} />
          <LeadsDetailsInput
            label="Mobile Number"
            data={data?.leadmobile || "9021008874"}
          />
          <LeadsDetailsInput
            label="Email"
            data={data?.leadEmail || "xyz@gmail.com"}
          />

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
            <p className="text-red-500 text-sm">{errors?.note?.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-10">
          <div>
            <FileUpload
              title="Upload Invoice from cr manager"
              name="invoiceFile"
              control={control}
              setValue={setValue}
              trigger={trigger}
            />
            {errors?.invoiceFile && (
              <p className="text-red-500 text-sm">
                {errors?.invoiceFile?.message}
              </p>
            )}
          </div>
          <div>
            <FileUpload
              title="Receipt Received  from client"
              name="receiptFile"
              control={control}
              setValue={setValue}
              trigger={trigger}
            />
            {errors?.receiptFile && (
              <p className="text-red-500 text-sm">
                {errors?.receiptFile?.message}
              </p>
            )}
          </div>
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
            <p className="text-red-500 text-sm">
              {errors.customFields.message}
            </p>
          )}
        </div>
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
      </form>
    </div>
  );
};

export default CRMClientDetails;
