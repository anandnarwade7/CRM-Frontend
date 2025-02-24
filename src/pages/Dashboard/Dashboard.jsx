import AdminDashboard from "../../components/custom/Dashboard/AdminDashboard";
import { useUserRole } from "../../hooks/use-userrole";
import SalesDashboard from "./SalesDashboard";

const Dashboard = () => {
  const userRole = useUserRole();
  return (
    <div>
      {/* Uppar Dashboard Status */}
      {userRole === "ADMIN" ? (
        <AdminDashboard />
      ) : userRole === "SALES" ? (
        <SalesDashboard />
      ) : (
        <p>CR Dashboard</p>
      )}
    </div>
  );
};

export default Dashboard;
