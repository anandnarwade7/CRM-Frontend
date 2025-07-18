import {
  DashboardSales,
  DashboardTime,
  DashboardList,
  DashboardLineUp,
  DashboardInvoice,
} from "../../assets/index";
import { useAdminDashboard } from "../../hooks/Dashboard/useAdminDashboard";
import DashboardCard from "../../components/custom/DashboardCard";
import Notification from "../../components/custom/Notification";

const AdminDashboard = () => {
  const { isLoading, isError, data, error } = useAdminDashboard();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-sm text-red-500">{error?.message}</p>;
  }

  return (
    <section>
      <Notification styles="mr-6 mb-4" />

      <div className="flex items-center gap-4">
        {/* Sales Person */}
        <DashboardCard
          title="Sales Persons"
          data={data?.sales || "0"}
          img={DashboardSales}
          redirect={"/app/sales-person"}
        />

        {/* CRM Manager */}
        <DashboardCard
          title="CRM Managers"
          data={data?.crm || "0"}
          img={DashboardTime}
          redirect={"/app/cr-manager"}
        />

        {/* Total Leads */}
        <DashboardCard
          title="Total Leads"
          data={data?.leads || "0"}
          img={DashboardList}
          redirect={"/app/leads"}
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
          title="Total Amount Paid"
          data={"0"}
          img={DashboardInvoice}
        />
        {/* Total Amount Paid */}
        <DashboardCard
          title="Total Unpaid Amount"
          data={"0"}
          img={DashboardInvoice}
        />
      </div>
    </section>
  );
};

export default AdminDashboard;
