import React from "react";
import {
  DashboardSales,
  DashboardTime,
  DashboardList,
} from "../../assets/index";
import DashboardCard from "../../components/custom/Dashboard/DashboardCard";

const Dashboard = () => {
  const data = [
    {
      id: 1,
      title: "Sales Persons",
      stat: "100",
      icon: DashboardSales,
    },
    {
      id: 2,
      title: "CRM Managers",
      stat: "10",
      icon: DashboardTime,
    },
    {
      id: 1,
      title: "Total Leads",
      stat: "2000",
      icon: DashboardList,
    },
  ];
  return (
    <div>
      {/* Uppar Dashboard Status */}
      <div className="flex items-center gap-4">
        {data?.map((item) => (
          <DashboardCard item={item} key={item?.id} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
