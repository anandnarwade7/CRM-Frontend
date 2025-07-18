import { Separator } from "../../ui/separator";
import { Badge } from "../../ui/badge";
import { Link, useLocation, useNavigate } from "react-router";
import Profile from "../Profile/Profile";
import {
  Dashboard,
  DashboardBg,
  AdminBg,
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
  Admin,
  ConfirmedBooking,
  ConfirmedBookingBg,
} from "../../../assets/index";
import { useUserRole } from "../../../hooks/use-userrole";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";
import { truncateName } from "../../../utils/utilityFunction";

const Sidebar = () => {
  const location = useLocation();
  const userRole = useUserRole();
  const navigate = useNavigate();

  // Navigation Links
  const menuItems = [
    {
      name: "Dashboard",
      path: "/app/dashboard",
      img: Dashboard,
      activeImg: DashboardBg,
      roles: ["SUPER ADMIN", "ADMIN", "SALES", "CRM", "CLIENT"],
    },
    {
      name: "Admin",
      path: "/app/admin",
      img: Admin,
      activeImg: AdminBg,
      roles: ["SUPER ADMIN"],
    },
    {
      name: "Sales Person",
      path: "/app/sales-person",
      img: Sales,
      activeImg: SalesBg,
      roles: ["ADMIN"],
    },
    {
      name: "CR Manager",
      path: "/app/cr-manager",
      img: Account,
      activeImg: AccountBg,
      roles: ["ADMIN"],
    },
    {
      name: "Leads",
      path: "/app/leads",
      img: List,
      activeImg: ListBg,
      roles: ["ADMIN", "SALES"],
    },
    {
      name: "Client",
      path: "/app/client",
      img: Client,
      activeImg: ClientBg,
      roles: ["ADMIN", "CRM"],
    },
    {
      name: "Projects",
      path: "/app/projects",
      img: Project,
      activeImg: ProjectBg,
      roles: ["ADMIN", "CRM", "SALES"],
      // roles: ["ADMIN"],
    },
    // {
    //   name: "Transactions",
    //   path: "/transactions",
    //   img: Money,
    //   activeImg: MoneyBg,
    //   roles: ["SUPER ADMIN", "ADMIN", "CRM"],
    // },
    {
      name: "Support",
      path: "/app/support",
      img: Support,
      activeImg: SupportBg,
      roles: ["SUPER ADMIN", "ADMIN", "SALES", "CRM"],
    },
    {
      name: "Activities",
      path: "/app/activities",
      img: Client,
      activeImg: ClientBg,
      roles: ["CLIENT"],
    },
    {
      name: "Confirmed Bookings",
      path: "/app/bookedflats",
      img: ConfirmedBooking,
      activeImg: ConfirmedBookingBg,
      roles: ["ADMIN", "SALES", "CRM"],
    },
    // {
    //   name: "Clients List",
    //   path: "/app/clients-list",
    //   img: Client,
    //   activeImg: ClientBg,
    //   roles: ["CRM"],
    // },
  ];

  // Filtering out the Sidebar based on the role
  const filteredMenuItem = menuItems?.filter((item) =>
    item?.roles.includes(userRole)
  );

  // To show whom user logged in like user is admin or sales-person
  const user =
    userRole === "ADMIN"
      ? "Admin"
      : userRole === "SALES"
      ? "Sales Person"
      : userRole === "SUPER ADMIN"
      ? "Super Admin"
      : userRole === "CLIENT"
      ? "Client"
      : "CRM";

  // Handle Function for Logout navigating to login page
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  // Getting the userName from the session storage
  const userName = sessionStorage.getItem("userName");

  return (
    <>
      <aside className="w-64 h-screen bg-white fixed top-0 left-0 flex flex-col">
        {/* App Name */}
        <Profile />

        <Separator className="mb-4" />

        <div className="mx-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge className="bg-main text-white px-4 py-2 text-base rounded-xl shadow-none hover:bg-main text-start">
                  {user} : {truncateName(userName)}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {user} : {userName}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col space-y-2 p-4">
          {filteredMenuItem?.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 p-2 rounded-lg transition-all ${
                  isActive
                    ? "bg-main-accent text-white"
                    : "text-main-text hover:bg-gray-100"
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
        {/* <div className="px-4 py-2">
          <Button
            onClick={handleLogout}
            className="bg-white text-main-text flex items-center gap-3"
          >
            <img src={Logout} alt="logout" />
            logout
          </Button>
        </div> */}

        <div className="px-4 py-2">
          <Dialog>
            <DialogTrigger>
              <Button className="bg-white text-main-text flex items-center gap-3 w-full">
                <img src={Logout} alt="logout" />
                Logout
              </Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-xs">
              <p className="text-main-text font-medium text-sm text-center mt-6">
                Are you sure you want to log out?
              </p>
              <Button
                onClick={handleLogout}
                className="bg-main-secondary text-white"
              >
                Logout
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
