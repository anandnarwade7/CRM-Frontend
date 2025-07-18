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
import { useEffect, useRef, useState } from "react";
// import socket from "../../socket";
import Notification from "../../components/custom/Notification";
// import io from "socket.io-client";

const CRMDashboard = () => {
  const userId = useUserId();

  const { data, isLoading, error } = useCRMDashboard(userId);

  console.log(data?.convertedLeads);

  // const socketRef = useRef(null);

  // useEffect(() => {
  //   socketRef.current = io("http://localhost:9092", {
  //     transports: ["websocket"],
  //     query: { userId: userId },
  //   });

  //   socketRef.current.on("connect", () => {
  //     console.log("✅ Socket connected successfully");
  //   });

  //   const handleTesting = (message) => {
  //     console.log("🧪 Testing event received:", message);
  //   };

  //   const handleNotification = (message) => {
  //     console.log("📨 Real-time Notification:", message);
  //   };

  //   socketRef.current.on("notification", handleNotification);
  //   socketRef.current.on("testing", handleTesting);

  //   return () => {
  //     if (socketRef.current) {
  //       socketRef.current.off("notification");
  //       socketRef.current.off("testing");
  //       socketRef.current.disconnect();
  //     }
  //   };
  // }, [userId]);

  // const handleTestClick = () => {
  //   console.log("📤 Sending test request...");

  //   const testData = {
  //     userId: "17",
  //     message: `Test message at ${new Date().toLocaleTimeString()}`,
  //   };

  //   try {
  //     socketRef.current.emit("testing", testData);
  //     console.log("✅ Test data sent:");
  //   } catch (error) {
  //     console.error("❌ Error sending test data:", error);
  //     alert("Error sending test data: " + error.message);
  //   }
  // };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <>
        <Notification styles={"mr-6"} />

        <div className="flex items-center gap-4 mt-4">
          {/* Sales Person */}
          <DashboardCard
            title="Total Client"
            data={data?.convertedLeads || "0"}
            img={DashboardSales}
          />

          {/* Target */}
          <DashboardCard title="Target" data={"0"} img={DashboardTime} />

          {/* Total Leads */}
          <DashboardCard
            title="Total Leads"
            data={data?.totalLeads || "0"}
            img={DashboardList}
            redirect={"/app/client"}
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
      </>
    </>
  );
};

export default CRMDashboard;
