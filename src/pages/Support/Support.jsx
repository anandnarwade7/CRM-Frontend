import { useUserRole } from "../../hooks/use-userrole";
import AdminSupport from "./AdminSupport";
import SalesCRMSupport from "./SalesCRMSupport";
import SuperAdminSupport from "./SuperAdminSupport";

const Support = () => {
  const role = useUserRole();

  return (
    <section className="w-full rounded-xl bg-white h-full px-6 py-3">
      {role == "ADMIN" ? (
        <AdminSupport />
      ) : role == "SALES" ? (
        <SalesCRMSupport />
      ) : role == "CRM" ? (
        <SalesCRMSupport />
      ) : (
        <SuperAdminSupport />
      )}
    </section>
  );
};

export default Support;
