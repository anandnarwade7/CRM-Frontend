import React from "react";
import DashboardCard from "../../components/custom/DashboardCard";
import { DashboardSales, DashboardTime } from "../../assets";

const ClientDashboard = () => {
  return (
    <div className="flex items-center gap-4">
      {/* Total Paid Amount */}
      <DashboardCard
        title="Total Paid Amount"
        data={"-"}
        img={DashboardSales}
      />

      {/* Total Due Amount */}
      <DashboardCard title="Total Due Amount" data={"-"} img={DashboardTime} />
    </div>
  );
};

export default ClientDashboard;
