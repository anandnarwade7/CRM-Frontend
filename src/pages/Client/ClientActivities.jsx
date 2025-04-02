import ClientActivityDocuments from "../../components/custom/Client/ClientActivityDocuments";
import ClientActivityHeader from "../../components/custom/Client/ClientActivityHeader";
import ClientActivityEventTable from "../../components/custom/Client/ClientActivityEventTable";

const ClientActivities = () => {
  return (
    <section className="w-full rounded-xl bg-white h-full px-6 py-3">
      <ClientActivityHeader />
      <ClientActivityDocuments />
      <ClientActivityEventTable />
    </section>
  );
};

export default ClientActivities;
