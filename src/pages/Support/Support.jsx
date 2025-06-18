import { useUserRole } from "../../hooks/use-userrole";
import AdminSupport from "./AdminSupport";
import SalesSupport from "./SalesSupport";

const Support = () => {
  const role = useUserRole();

  return (
    <section className="w-full rounded-xl bg-white h-full px-6 py-3">
      {role === "ADMIN" ? (
        <AdminSupport />
      ) : role === "SALES" ? (
        <SalesSupport />
      ) : (
        <p>CRM Support</p>
      )}
    </section>
  );
};

export default Support;
