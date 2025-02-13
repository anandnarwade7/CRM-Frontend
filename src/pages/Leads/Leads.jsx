import LeadsHeader from "../../components/custom/Leads/LeadsHeader";
import LeadsTable from "../../components/custom/Leads/LeadsTable";

const Leads = () => {
  return (
    <div className="w-full rounded-xl bg-white h-full px-6 py-3">
      <LeadsHeader />
      <LeadsTable />
    </div>
  );
};

export default Leads;
