import { Outlet } from "react-router";
import { Toaster } from "@/components/ui/toaster";
import Sidebar from "../../components/custom/sidebar/Sidebar";

const MainLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 flex-1 p-6 bg-[#F8F8F8] min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
