import SuperAdminSupportTable from "../../components/custom/Support/SuperAdminSupportTable";
import SupportHeader from "../../components/custom/Support/SupportHeader";

const SuperAdminSupport = () => {
  return (
    <section>
      <SupportHeader label="Support Details" />
      <SuperAdminSupportTable />
    </section>
  );
};

export default SuperAdminSupport;
