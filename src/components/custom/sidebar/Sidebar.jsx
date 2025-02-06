import { Separator } from "../../ui/separator";
import { Badge } from "../../ui/badge";
import { Link, useLocation } from "react-router";
import Profile from "../Profile/Profile";
import {
  Dashboard,
  DashboardBg,
  Sales,
  SalesBg,
  Account,
  AccountBg,
  List,
  ListBg,
  Client,
  ClientBg,
  Project,
  ProjectBg,
  Money,
  MoneyBg,
  Support,
  SupportBg,
  Logout,
} from "../../../assets/index";

const Sidebar = () => {
  const location = useLocation();

  // Navigation Links
  const menuItems = [
    {
      name: "Dashboard",
      path: "/app/dashboard",
      img: Dashboard,
      activeImg: DashboardBg,
    },
    {
      name: "Sales Person",
      path: "/app/sales-person",
      img: Sales,
      activeImg: SalesBg,
    },
    {
      name: "CR Manager",
      path: "/app/cr-manager",
      img: Account,
      activeImg: AccountBg,
    },
    {
      name: "Leads",
      path: "/leads",
      img: List,
      activeImg: ListBg,
    },
    {
      name: "Client",
      path: "/client",
      img: Client,
      activeImg: ClientBg,
    },
    {
      name: "Projects",
      path: "/projects",
      img: Project,
      activeImg: ProjectBg,
    },
    {
      name: "Transactions",
      path: "/transactions",
      img: Money,
      activeImg: MoneyBg,
    },
    {
      name: "Support",
      path: "/support",
      img: Support,
      activeImg: SupportBg,
    },
  ];

  return (
    <>
      <aside className="w-64 h-screen bg-white fixed top-0 left-0 flex flex-col">
        {/* App Name */}
        <Profile />

        <Separator className="mb-4" />

        <div className="mx-4">
          <Badge className="bg-[#FFF7E7] text-[#343434] px-4 py-2 text-base rounded-md shadow-none hover:bg-[#FFF7E7]">
            Admin
          </Badge>
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col space-y-2 p-4">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 p-2 rounded-lg transition-all ${
                  isActive
                    ? "bg-[#FFF7E7] text-[#C99227]"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <img
                  src={isActive ? item.activeImg : item.img}
                  alt={item.name}
                  className="w-5 h-5"
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex-grow" />

        <Separator className="mb-1" />

        {/* Logout Button */}
        <div className="px-4 py-2">
          <Link className="flex items-center gap-4 m-2 text-[--text-color]">
            <img src={Logout} alt="logout" />
            logout
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
