import {
  DashboardInvoice,
  DashboardLineUp,
  DashboardList,
  DashboardSales,
  DashboardTime,
  DashboardUserAdmin,
} from "../../assets";
import DashboardCard from "../../components/custom/DashboardCard";

const SuperAdminDashboard = () => {
  return (
    <>
      <>
        <div className="flex items-center gap-4">
          {/* Sales Person */}
          <DashboardCard title="Admins" data={"-"} img={DashboardUserAdmin} />

          {/* CRM Manager */}
          <DashboardCard title="CRM Managers" data={"-"} img={DashboardTime} />

          {/* Total Leads */}
          <DashboardCard title="Sales Persons" data={"-"} img={DashboardList} />
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
