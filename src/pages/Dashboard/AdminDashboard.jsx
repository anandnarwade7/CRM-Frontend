import {
  DashboardSales,
  DashboardTime,
  DashboardList,
  DashboardLineUp,
  DashboardInvoice,
} from "../../assets/index";
import { useAdminDashboard } from "../../hooks/Dashboard/useAdminDashboard";
import DashboardCard from "../../components/custom/DashboardCard";

const AdminDashboard = () => {
  const { isPending, isError, data, error } = useAdminDashboard();

  return (
    <>
      <div className="flex items-center gap-4">
        {/* Sales Person */}
        <DashboardCard
          title="Sales Persons"
          data={data?.sales || "-"}
          img={DashboardSales}
        />

        {/* CRM Manager */}
        <DashboardCard
          title="CRM Managers"
          data={data?.crm || "-"}
          img={DashboardTime}
        />

        {/* Total Leads */}
        <DashboardCard
          title="Total Leads"
          data={data?.leads || "-"}
          img={DashboardList}
        />
      </div>
      <div className="flex items-center gap-4 my-4">
        {/* Total Invoice Raised */}
        <DashboardCard
          title="Total Invoice Raised"
          data={data?.leads || "-"}
          img={DashboardLineUp}
        />
        {/* Total Amount Paid */}
        <DashboardCard
          title="Total Amount Paid"
          data={data?.leads || "-"}
          img={DashboardInvoice}
        />
        {/* Total Amount Paid */}
        <DashboardCard
          title="Total Unpaid Amount"
          data={data?.leads || "-"}
          img={DashboardInvoice}
        />
      </div>
    </>
  );
};

export default AdminDashboard;
