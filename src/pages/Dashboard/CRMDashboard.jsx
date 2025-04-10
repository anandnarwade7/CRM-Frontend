import DashboardCard from "../../components/custom/DashboardCard";
import {
  DashboardInvoice,
  DashboardLineUp,
  DashboardList,
  DashboardSales,
  DashboardTime,
} from "../../assets";
import { useCRMDashboard } from "../../hooks/Dashboard/useCRMDashboard";
import { useUserId } from "../../hooks/use-user-id";

const CRMDashboard = () => {
  const userId = useUserId();

  const { data, isLoading, error } = useCRMDashboard(userId);

  console.log(data?.convertedLeads);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <>
        <div className="flex items-center gap-4">
          {/* Sales Person */}
          <DashboardCard
            title="Total Client"
            data={data?.convertedLeads}
            img={DashboardSales}
          />

          {/* Target */}
          <DashboardCard title="Target" data={"-"} img={DashboardTime} />

          {/* Total Leads */}
          <DashboardCard
            title="Total Leads"
            data={data?.totalLeads || "-"}
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
