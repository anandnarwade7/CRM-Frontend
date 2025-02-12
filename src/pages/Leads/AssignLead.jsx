import { Link } from "react-router";
import { Back } from "../../assets";
import { useEffect, useState } from "react";
import { RadioGroup } from "../../components/ui/radio-group";
import { Button } from "../../components/ui/button";
import SpecificLead from "../../components/custom/Leads/SpecificLead";
import EquallyLead from "../../components/custom/Leads/EquallyLead";
import { useGetSales } from "../../hooks/Leads/useGetSales";

const AssignLead = () => {
  const [distribution, setDistribution] = useState("Specific");
  const [file, setFile] = useState(null);
  const [selectedSalesPersons, setSelectedSalesPersons] = useState([]);
  const [errors, setErrors] = useState({
    salesPerson: "",
    file: "",
  });

  // Custom hook for getting sales person data
  const { data: salesPersons, error, isLoading } = useGetSales();

  // Function For Handling File
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setErrors((prev) => ({ ...prev, file: "" }));

    if (selectedFile) {
      const fileType = selectedFile.name.split(".").pop();
      if (fileType === "xlsx" || fileType === "xls") {
        setFile(selectedFile);
      } else {
        alert("Please select an Excel file (.xlsx or .xls)");
        setFile(null);
        e.target.value = "";
      }
    }
  };

  // Handle checkbox change (select/unselect salesperson)
  const handleCheckboxChange = (id) => {
    setErrors((prev) => ({ ...prev, salesPerson: "" }));

    setSelectedSalesPersons((prevState) => {
      if (prevState.includes(id)) {
        // If the ID is already selected, unselect it
        return prevState.filter((salesPersonId) => salesPersonId !== id);
      } else {
        // If the ID is not selected, add it
        return [...prevState, id];
      }
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      salesPerson: "",
      file: "",
    };

    if (selectedSalesPersons.length === 0) {
      newErrors.salesPerson = "Please select at least one sales person";
      isValid = false;
    }
    if (!file) {
      newErrors.file = "Please upload an Excel file";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("form is Valid");
    } else {
      console.log("Form validation failed");
    }
  };

  console.log("Selected Person", selectedSalesPersons);

  return (
    <section className="bg-white w-full p-3 rounded-lg h-full">
      {/* Header */}
      <div>
        <Link className="flex items-center gap-6" to="/app/leads">
          <img src={Back} alt="backicon" />
          <span className="font-medium text-[#707070] text-2xl">Add Leads</span>
        </Link>
      </div>

      <div className="my-10">
        <RadioGroup
          value={distribution}
          onValueChange={(value) => form.setValue("distribution", value)}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <div
              className={`relative w-5 h-5 border-2 rounded-full flex items-center justify-center cursor-pointer ${
                distribution === "Equally"
                  ? "border-[#C99227]"
                  : "border-[#B5B5B5]"
              }`}
              onClick={() => setDistribution("Equally")}
            >
              <div
                className={`w-3 h-3 rounded-full ${
                  distribution === "Equally" ? "bg-[#C99227]" : "bg-[#B5B5B5]"
                }`}
              ></div>
            </div>
            <label
              htmlFor="equally"
              className="cursor-pointer"
              onClick={() => setDistribution("Equally")}
            >
              Equally
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className={`relative w-5 h-5 border-2 border-[#B5B5B5] rounded-full flex items-center justify-center cursor-pointer ${
                distribution === "Specific"
                  ? "border-[#C99227]"
                  : "border-[#B5B5B5]"
              }`}
              onClick={() => setDistribution("Specific")}
            >
              <div
                className={`w-3 h-3 rounded-full ${
                  distribution === "Specific" ? "bg-[#C99227]" : "bg-[#B5B5B5]"
                }`}
              ></div>
            </div>
            <label
              htmlFor="specific"
              className="cursor-pointer"
              onClick={() => setDistribution("Specific")}
            >
              Specific
            </label>
          </div>
        </RadioGroup>
      </div>
      <div>
        {distribution === "Specific" ? (
          <>
            <SpecificLead
              salesPersons={salesPersons}
              isLoading={isLoading}
              error={error}
              selectedSalesPersons={selectedSalesPersons}
              handleCheckboxChange={handleCheckboxChange}
              handleFileChange={handleFileChange}
              errors={errors}
            />
          </>
        ) : (
          <EquallyLead />
        )}
      </div>
      <div className="flex justify-end my-4">
        <Button
          type="button"
          onClick={handleSubmit}
          className="bg-[#C99227] shadow-none text-white w-[49%]"
        >
          Assign
        </Button>
      </div>
    </section>
  );
};

export default AssignLead;
