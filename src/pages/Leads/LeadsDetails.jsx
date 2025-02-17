import { Link, useParams } from "react-router";
import { useGetLeadsById } from "../../hooks/Leads/useGetLeadsById";
import LeadsDetailsInput from "../../components/custom/Leads/LeadsDetailsInput";
import { Back } from "../../assets";
import { getLowerStatus } from "../../utils/utilityFunction";

const LeadsDetails = () => {
  const { leadId } = useParams();

  const { data, isLoading, error } = useGetLeadsById(leadId);

  return (
    <div>
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
      </div>
    </div>
  );
};

export default LeadsDetails;
