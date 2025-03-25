import DashboardCard from "../../components/custom/DashboardCard";
import {
  DashboardInvoice,
  DashboardLineUp,
  DashboardList,
  DashboardSales,
  DashboardTime,
} from "../../assets";

const CRMDashboard = () => {
  return (
    <>
      <>
        <div className="flex items-center gap-4">
          {/* Sales Person */}
          <DashboardCard title="Total Client" data={"-"} img={DashboardSales} />

          {/* Target */}
          <DashboardCard title="Target" data={"-"} img={DashboardTime} />

          {/* Total Leads */}
          <DashboardCard title="Total Leads" data={"-"} img={DashboardList} />
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
            title="Total Amount Paid"
            data={"-"}
            img={DashboardInvoice}
          />
          {/* Total Amount Paid */}
          <DashboardCard
            title="Total Unpaid Amount"
            data={"-"}
            img={DashboardInvoice}
          />
        </div>
      </>
    </>
  );
};

export default CRMDashboard;
