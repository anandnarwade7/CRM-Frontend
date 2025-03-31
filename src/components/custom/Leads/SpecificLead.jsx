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
  selectLabel,
  selectPlaceholder,
  fileInputLabel,
  fileInputRef,
  removeFileInput,
}) => {
  // const fileInputRef = useRef(null);

  // Check if all salesPersons are selected
  const allSelected =
    salesPersons?.length > 0 &&
    selectedSalesPersons?.length === salesPersons?.length;

  // Handle "Select All" click
  const handleSelectAll = () => {
    // If all are selected, deselect all
    if (allSelected) {
      salesPersons.forEach((person) => handleCheckboxChange(person?.id));
    } else {
      // Otherwise, select all
      salesPersons.forEach((person) => {
        if (!selectedSalesPersons.includes(person.id)) {
          handleCheckboxChange(person?.id);
        }
      });
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <div className="w-full">
          <Label htmlFor="salesPerson">{selectLabel}</Label>
          <div>
            <Select>
              <SelectTrigger className="shadow-none focus:ring-0">
                <SelectValue
                  placeholder={
                    selectedSalesPersons?.length > 0
                      ? selectedSalesPersons?.length + " Selected "
                      : selectPlaceholder
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <div className="flex items-center space-x-2 py-2 px-2 cursor-pointer hover:bg-gray-100">
                  <input
                    id="selectAll"
                    type="checkbox"
                    checked={allSelected}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-orange-400 bg-white border-2 border-gray-300 rounded-md  focus:outline-none cursor-pointer transition-all duration-150"
                  />
                  <label className="cursor-pointer" htmlFor="selectAll">
                    Select All
                  </label>
                </div>
                {salesPersons?.map((person) => (
                  <div
                    key={person?.id}
                    className="flex items-center space-x-2 py-2 px-2 cursor-pointer hover:bg-gray-100"
                    // onClick={() => handleCheckboxChange(person?.id)}
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
          {errors.crManager && (
            <p className="text-red-500 mt-2">{errors.crManager}</p>
          )}
        </div>

        {removeFileInput ? (
          <div className="mt-1 ml-5">
            <p>Total No of Clients</p>
            <p>100</p>
          </div>
        ) : (
          <div className="w-full">
            <Label htmlFor="leadFiles">{fileInputLabel}</Label>
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
                className="inline-flex items-center rounded-e-lg border border-input bg-[#F9AE00] px-3 text-sm text-white font-medium text-foreground outline-offset-2 transition-colors focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:cursor-not-allowed disabled:opacity-50"
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

export default SpecificLead;
