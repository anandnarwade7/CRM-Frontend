import ClientHeader from "../../components/custom/Client/ClientHeader";
import ClientTable from "../../components/custom/Client/ClientTable";

const Client = () => {
  return (
    <section className="w-full rounded-xl bg-white h-full px-6 py-3">
      <ClientHeader />
      <ClientTable />
    </section>
  );
};

export default Client;
