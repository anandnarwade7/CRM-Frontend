import {
  DashboardInvoice,
  DashboardLineUp,
  DashboardList,
  DashboardSales,
  DashboardTime,
  DashboardUserAdmin,
} from "../../assets";
import DashboardCard from "../../components/custom/DashboardCard";
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
        <div className="flex items-center gap-4">
          {/* Sales Person */}
          <DashboardCard
            title="Admins"
            data={data?.admins || "-"}
            img={DashboardUserAdmin}
          />

          {/* CRM Manager */}
          <DashboardCard
            title="CRM Managers"
            data={data?.crm || "-"}
            img={DashboardTime}
          />

          {/* Total Leads */}
          <DashboardCard
            title="Sales Persons"
            data={data?.sales || "-"}
            img={DashboardList}
          />
        </div>
        <div className="flex items-center gap-4 my-4">
          {/* Total Invoice Raised */}
          <DashboardCard
            title="Total Invoice Raised"
            data={"-"}
            img={DashboardLineUp}
          />
          {/* Total Amount Paid */}
          <DashboardCard
            title="Total Invoice Amount"
            data={"-"}
            img={DashboardInvoice}
          />
          {/* Total Amount Paid */}
          <DashboardCard
            title="Total Paid Amount"
            data={"-"}
            img={DashboardInvoice}
          />
        </div>
      </>
    </>
  );
};

export default SuperAdminDashboard;
