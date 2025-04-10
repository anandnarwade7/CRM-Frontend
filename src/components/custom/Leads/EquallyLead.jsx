import { useRef } from "react";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

const EquallyLead = ({
  salesPersons,
  handleFileChange,
  errors,
  selectLabel,
  fileInputLabel,
  removeFileInput,
  noOfClients,
}) => {
  const fileInputRef = useRef(null);
  return (
    <div>
      <div className="flex">
        <div className="flex flex-col gap-3 text-[#707070] text-xl w-full md:w-1/2 ">
          <p>{selectLabel}</p>
          <p>{salesPersons?.length || "0"}</p>
        </div>
        {removeFileInput ? (
          <div className="mt-1 ml-5">
            <p>Total No of Clients</p>
            <p>{noOfClients}</p>
          </div>
        ) : (
          <div className="w-full md:w-1/2 ">
            <Label htmlFor="leadFiles" className="text-main-label">
              {fileInputLabel}
            </Label>
            <div className="flex rounded-lg shadow-none">
              <Input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
                id="leadFiles"
                ref={fileInputRef}
                className="-me-px flex-1 rounded-e-none shadow-none focus-visible:z-10"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center rounded-e-lg border border-input bg-main px-3 text-sm text-white font-medium text-foreground outline-offset-2 transition-colors focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Upload
              </button>
            </div>
            {errors.file && <p className="text-red-500 mt-2">{errors.file}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default EquallyLead;
