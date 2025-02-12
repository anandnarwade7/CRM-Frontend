import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

const SpecificLead = ({
  salesPersons,
  isLoading,
  error,
  selectedSalesPersons,
  handleCheckboxChange,
  handleFileChange,
  errors,
}) => {
  return (
    <div>
      <div className="flex flex-col gap-4 md:gap-0 md:flex-row md:space-x-4 md:items-center">
        <div className="w-full md:w-1/2">
          <Label htmlFor="salesPerson">Select Sales Person</Label>
          <div>
            <Select>
              <SelectTrigger className="shadow-none focus:ring-0">
                <SelectValue placeholder="Select Sales Person" />
              </SelectTrigger>
              <SelectContent>
                {salesPersons?.map((person) => (
                  <div
                    key={person?.id}
                    className="flex items-center space-x-2 py-2 px-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleCheckboxChange(person?.id)}
                  >
                    <input
                      type="checkbox"
                      id={`salesPerson-${person?.id}`}
                      checked={selectedSalesPersons.includes(person?.id)}
                      onChange={() => handleCheckboxChange(person?.id)}
                      className="w-4 h-4 text-orange-400 bg-white border-2 border-gray-300 rounded-md  focus:outline-none cursor-pointer transition-all duration-150"
                    />
                    <label
                      htmlFor={`salesPerson-${person?.id}`}
                      className="cursor-pointer"
                    >
                      {person.name}
                    </label>
                  </div>
                ))}
              </SelectContent>
            </Select>
          </div>
          {errors.salesPerson && (
            <p className="text-red-500 mt-2">{errors.salesPerson}</p>
          )}
        </div>

        <div className="w-full md:w-1/2 ">
          <Label htmlFor="leadFiles">Lead Files</Label>
          <div className="flex rounded-lg shadow-none">
            <Input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
              id="leadFiles"
              className="-me-px flex-1 rounded-e-none shadow-none focus-visible:z-10"
            />
            <button className="inline-flex items-center rounded-e-lg border border-input bg-[#F9AE00] px-3 text-sm text-white font-medium text-foreground outline-offset-2 transition-colors focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:cursor-not-allowed disabled:opacity-50">
              Upload
            </button>
          </div>
          {errors.file && <p className="text-red-500 mt-2">{errors.file}</p>}
        </div>
      </div>
    </div>
  );
};

export default SpecificLead;
