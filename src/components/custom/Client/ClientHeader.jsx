import { useNavigate } from "react-router";
import { NotificationIcon } from "../../../assets";
import { Button } from "../../ui/button";
import { Plus } from "lucide-react";
import { useUserRole } from "../../../hooks/use-userrole";

const ClientHeader = () => {
  const navigate = useNavigate();
  const userRole = useUserRole();
  return (
    <>
      {/* Upper Header */}
      <div className="flex items-center justify-between">
        <p className="font-medium text-2xl text-[#707070]">Client Details</p>
        <Button className="bg-white shadow-none">
          <img src={NotificationIcon} alt="notification" />
        </Button>
      </div>
      {/* Lower Header */}
      {userRole === "ADMIN" && (
        <div className="flex justify-end my-4">
          <Button
            onClick={() => navigate("/app/client-leads")}
            className="bg-main shadow-none"
          >
            <Plus size={18} />
            Assign Clients
          </Button>
        </div>
      )}
    </>
  );
};

export default ClientHeader;
