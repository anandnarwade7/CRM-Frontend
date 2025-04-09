import { Link } from "react-router";
import { Button } from "../../components/ui/button";
import { RadioGroup } from "../../components/ui/radio-group";
import SpecificLead from "../../components/custom/Leads/SpecificLead";
import EquallyLead from "../../components/custom/Leads/EquallyLead";
import { Back } from "../../assets";
import { useAssignClientLeads } from "../../hooks/Client/useAssignClientLeads";
import { useState } from "react";
import { useExportClientLeads } from "../../hooks/Client/useExportClientLeads";
import { Loader2 } from "lucide-react";

const AssignClientLead = () => {
  const {
    distribution,
    setDistribution,
    handleFileChange,
    selectedCRManagers,
    handleCheckboxChange,
    crm,
    isLoading,
    error,
    errors,
    handleSubmit,
    isSubmitting,
    fileInputRef,
    convertedLeadsData,
  } = useAssignClientLeads();

  const [isDownloading, setIsDownloading] = useState(false);
  const { mutate: downloadTemplate } = useExportClientLeads(setIsDownloading);

  return (
    <section className="bg-white w-full p-3 rounded-lg h-full">
      {/* Header */}
      <div>
        <Link className="flex items-center gap-6" to="/app/client">
          <img src={Back} alt="backicon" />
          <span className="font-medium text-[#707070] text-2xl">Add Leads</span>
        </Link>
      </div>

      <div className="my-10 flex items-center justify-between">
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
        {/* <Button
          className="bg-[#C99227] shadow-none text-white"
          onClick={() => downloadTemplate()}
          disabled={isDownloading}
        >
          {isDownloading ? (
            <Loader2 className="animate-spin" size={24} />
          ) : (
            "Export Leads"
          )}
        </Button> */}
      </div>
      <div>
        {distribution === "Specific" ? (
          <>
            <SpecificLead
              salesPersons={crm}
              isLoading={isLoading}
              error={error}
              selectedSalesPersons={selectedCRManagers}
              handleCheckboxChange={handleCheckboxChange}
              handleFileChange={handleFileChange}
              errors={errors}
              selectLabel={"Select To Exclude Client Manager"}
              selectPlaceholder={"Select"}
              fileInputLabel={"Clients Files"}
              fileInputRef={fileInputRef}
              removeFileInput={true}
              noOfClients={convertedLeadsData?.length}
            />
          </>
        ) : (
          <EquallyLead
            salesPersons={crm}
            handleFileChange={handleFileChange}
            errors={errors}
            selectLabel={"Total No. of CR Manager"}
            fileInputLabel={"Clients Files"}
            removeFileInput={true}
            noOfClients={convertedLeadsData?.length}
          />
        )}
      </div>
      <div className="flex justify-end my-4">
        <Button
          onClick={handleSubmit}
          disabled={
            isSubmitting ||
            crm?.length === 0 ||
            convertedLeadsData?.length === 0
          }
          className="bg-[#C99227] shadow-none text-white w-[49%]"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin" size={24} />
          ) : (
            "Assign"
          )}
        </Button>
      </div>
    </section>
  );
};

export default AssignClientLead;
