import AdminDashboard from "./AdminDashboard";
import { useUserRole } from "../../hooks/use-userrole";
import SalesDashboard from "./SalesDashboard";
import SuperAdminDashboard from "./SuperAdminDashboard";
import CRMDashboard from "./CRMDashboard";
import ClientDashboard from "./ClientDashboard";

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
      ) : userRole === "CLIENT" ? (
        <ClientDashboard />
      ) : (
        <CRMDashboard />
      )}
    </div>
  );
};

export default Dashboard;
