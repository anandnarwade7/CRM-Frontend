import {
  DashboardSales,
  DashboardTime,
  DashboardList,
} from "../../../assets/index";
import { useAdminDashboard } from "../../../hooks/Dashboard/useAdminDashboard";

const AdminDashboard = () => {
  const { isPending, isError, data, error } = useAdminDashboard();

  return (
    <div className="flex items-center gap-4">
      {/* Sales Person */}
      <div className="w-full max-w-[21rem] bg-white rounded-lg p-9 flex items-center justify-between shadow-sm">
        <div>
          <p className="text-[#5B5959] font-normal text-xl">Sales Persons</p>
          <p className="text-[#D0AF6E] font-medium text-5xl mt-4">
            {data?.sales}
          </p>
        </div>
        <img src={DashboardSales} alt="DashboardSales" />
      </div>

      {/* CRM Manager */}
      <div className="w-full max-w-[21rem] bg-white rounded-lg p-9 flex items-center justify-between shadow-sm">
        <div>
          <p className="text-[#5B5959] font-normal text-xl">CRM Managers</p>
          <p className="text-[#D0AF6E] font-medium text-5xl mt-4">
            {data?.crm}
          </p>
        </div>
        <img src={DashboardTime} alt="DashboardTime" />
      </div>

      {/* Total Leads */}
      <div className="w-full max-w-[21rem] bg-white rounded-lg p-9 flex items-center justify-between shadow-sm">
        <div>
          <p className="text-[#5B5959] font-normal text-xl">Total Leads</p>
          <p className="text-[#D0AF6E] font-medium text-5xl mt-4">
            {data?.leads}
          </p>
        </div>
        <img src={DashboardList} alt="DashboardList" />
      </div>
    </div>
  );
};

export default AdminDashboard;
