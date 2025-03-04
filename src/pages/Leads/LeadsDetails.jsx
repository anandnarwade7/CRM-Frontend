import { Link, useParams } from "react-router";
import { useGetLeadsById } from "../../hooks/Leads/useGetLeadsById";
import LeadsDetailsInput from "../../components/custom/Leads/LeadsDetailsInput";
import { Back } from "../../assets";
import { getLowerStatus } from "../../utils/utilityFunction";
import { useEffect, useState } from "react";
import { Input } from "../../components/ui/input";

const LeadsDetails = () => {
  const { leadId } = useParams();
  const [notes, setNotes] = useState([]);
  const [dynamicFields, setDynamicFields] = useState([]);

  const { data, isLoading, error } = useGetLeadsById(leadId);

  useEffect(() => {
    if (data) {
      const lastComment =
        data?.conversationLogs?.length > 0
          ? data?.conversationLogs[data?.conversationLogs?.length - 1]?.comment
          : "No Comments Found";

      console.log(
        "Comments Get",
        data?.conversationLogs[data?.conversationLogs?.length - 1]
      );

      // Split the comment by '\n' and set it as an array
      setNotes(lastComment?.split("\n"));

      if (data?.dynamicFields?.length > 0) {
        // Convert dynamic fields into key-value array format
        const formattedFields = data.dynamicFields.flatMap((field) =>
          Object.entries(field).map(([label, value]) => ({ label, value }))
        );

        setDynamicFields(formattedFields);
      }
    }
  }, [data]);

  return (
    <div className="w-full rounded-xl bg-white h-full px-6 py-3">
      <div className="flex items-center gap-4 mb-8">
        <Link to={"/app/leads"}>
          <img src={Back} alt="back" />
        </Link>
        <p className="text-[#707070] font-medium text-2xl">Lead Details</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <LeadsDetailsInput label="Id" data={data?.id} />
        <LeadsDetailsInput label="Lead Name" data={data?.name} />
        <LeadsDetailsInput label="Phone Number" data={data?.mobileNumber} />
        <LeadsDetailsInput label="Email" data={data?.email} />
        <LeadsDetailsInput label="Sales Person" data={data?.salesPerson} />
        <LeadsDetailsInput label="Status" data={getLowerStatus(data?.status)} />
        <LeadsDetailsInput
          label="Note"
          data={notes?.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        />
      </div>
      <div className="mt-4">
        {dynamicFields?.map((field, index) => (
          <div key={index} className="flex justify-between gap-4 mb-4">
            <div className="w-full mb-3 flex flex-col gap-2">
              <div>
                <Input
                  type="text"
                  placeholder="label"
                  value={field?.label}
                  className="border border-gray-300 p-2 rounded shadow-none  focus-visible:ring-0"
                  maxLength={30}
                />
              </div>

              <Input
                type="text"
                placeholder="Value"
                value={field?.value}
                className="border border-gray-300 p-2 rounded shadow-none  focus-visible:ring-0"
                maxLength={30}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeadsDetails;
