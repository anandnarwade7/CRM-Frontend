import {
  DashboardSales,
  DashboardTime,
  DashboardList,
} from "../../assets/index";
import DashboardCard from "../../components/custom/DashboardCard";
import { useSalesDashboard } from "../../hooks/Dashboard/useSalesDashboard";
import { useUserId } from "../../hooks/use-user-id";

const SalesDashboard = () => {
  const userId = useUserId();
  const { isPending, isError, data, error } = useSalesDashboard(userId);

  return (
    <div className="flex items-center gap-4">
      {/* Sales Person */}
      <DashboardCard
        data={data?.convertedLeads || "-"}
        img={DashboardSales}
        title="Converted Leads"
      />

      {/* Target */}
      {/* <div className="w-full max-w-[21rem] bg-white rounded-lg p-9 flex items-center justify-between shadow-sm">
        <div>
          <p className="text-[#5B5959] font-normal text-xl">CRM Managers</p>
          <p className="text-[#D0AF6E] font-medium text-5xl mt-4">
            {data?.crm}
          </p>
        </div>
        <img src={DashboardTime} alt="DashboardTime" />
      </div> */}

      {/* Total Leads */}

      <DashboardCard
        data={data?.totalLeads || "-"}
        img={DashboardList}
        title="Total Leads"
      />
    </div>
  );
};

export default SalesDashboard;
