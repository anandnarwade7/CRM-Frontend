import AdminDashboard from "./AdminDashboard";
import { useUserRole } from "../../hooks/use-userrole";
import SalesDashboard from "./SalesDashboard";
import SuperAdminDashboard from "./SuperAdminDashboard";
import CRMDashboard from "./CRMDashboard";

const Dashboard = () => {
  const userRole = useUserRole();
  return (
    <div>
      {/* Uppar Dashboard Status */}
      {userRole === "ADMIN" ? (
        <AdminDashboard />
      ) : userRole === "SALES" ? (
        <SalesDashboard />
      ) : userRole === "SUPER ADMIN" ? (
        <SuperAdminDashboard />
      ) : (
        <CRMDashboard />
      )}
    </div>
  );
};

export default Dashboard;
