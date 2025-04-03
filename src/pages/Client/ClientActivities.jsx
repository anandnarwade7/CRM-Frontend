import ClientActivityHeader from "../../components/custom/Client/ClientActivityHeader";
import ClientActivityEventTable from "../../components/custom/Client/ClientActivityEventTable";
import ClientActivityTable from "../../components/custom/Client/ClientActivityTable";

const ClientActivities = () => {
  return (
    <section className="w-full rounded-xl bg-white h-full px-6 py-3">
      <ClientActivityHeader />
      <ClientActivityTable />
      {/* <ClientActivityEventTable /> */}
    </section>
  );
};

export default ClientActivities;
