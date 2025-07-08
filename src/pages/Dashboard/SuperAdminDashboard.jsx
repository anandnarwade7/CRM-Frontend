import {
  DashboardInvoice,
  DashboardLineUp,
  DashboardList,
  DashboardTime,
  DashboardUserAdmin,
} from "../../assets";
import DashboardCard from "../../components/custom/DashboardCard";
import Notification from "../../components/custom/Notification";
import { useAdminDashboard } from "../../hooks/Dashboard/useAdminDashboard";

const SuperAdminDashboard = () => {
  const { isLoading, isError, data, error } = useAdminDashboard();

  console.log("Super Admin Dashboard", data);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-sm text-red-500">{error?.message}</p>;
  }
  return (
    <>
      <>
        <Notification styles="mr-6 mb-4" />

        <div className="flex items-center gap-4">
          {/* Sales Person */}
          <DashboardCard
            title="Admins"
            data={data?.admins || "0"}
            img={DashboardUserAdmin}
          />

          {/* CRM Manager */}
          <DashboardCard
            title="CRM Managers"
            data={data?.crm || "0"}
            img={DashboardTime}
          />

          {/* Total Leads */}
          <DashboardCard
            title="Sales Persons"
            data={data?.sales || "0"}
            img={DashboardList}
          />
        </div>
        <div className="flex items-center gap-4 my-4">
          {/* Total Invoice Raised */}
          <DashboardCard
            title="Total Invoice Raised"
            data={"0"}
            img={DashboardLineUp}
          />
          {/* Total Amount Paid */}
          <DashboardCard
            title="Total Invoice Amount"
            data={"0"}
            img={DashboardInvoice}
          />
          {/* Total Amount Paid */}
          <DashboardCard
            title="Total Paid Amount"
            data={"0"}
            img={DashboardInvoice}
          />
        </div>
      </>
    </>
  );
};

export default SuperAdminDashboard;
