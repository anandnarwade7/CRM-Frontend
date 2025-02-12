import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

const EquallyLead = () => {
  return (
    <div>
      <div className="flex">
        <div className="flex flex-col gap-3 text-[#707070] text-xl w-full md:w-1/2 ">
          <p>Total No. of Sales Person</p>
          <p>100</p>
        </div>
        <div className="w-full md:w-1/2 ">
          <Label htmlFor="leadFiles">Lead Files</Label>
          <div className="flex rounded-lg shadow-none">
            <Input
              type="file"
              accept="application/pdf"
              // onChange={handleFileChange}
              id="leadFiles"
              className="-me-px flex-1 rounded-e-none shadow-none focus-visible:z-10"
            />
            <button className="inline-flex items-center rounded-e-lg border border-input bg-[#F9AE00] px-3 text-sm text-white font-medium text-foreground outline-offset-2 transition-colors focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:cursor-not-allowed disabled:opacity-50">
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquallyLead;
