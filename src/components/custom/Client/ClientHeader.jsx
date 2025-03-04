import { useNavigate } from "react-router";
import { Notification } from "../../../assets";
import { Button } from "../../ui/button";
import { Plus } from "lucide-react";

const ClientHeader = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* Upper Header */}
      <div className="flex items-center justify-between">
        <p className="font-medium text-2xl text-[#707070]">Client Details</p>
        <Button className="shadow-none">
          <img src={Notification} alt="notification" />
        </Button>
      </div>
      {/* Lower Header */}
      <div className="flex justify-end my-4">
        <Button
          onClick={() => navigate("/app/client-leads")}
          className="bg-[#C99227] shadow-none"
        >
          <Plus size={18} />
          Assign Leads
        </Button>
      </div>
    </>
  );
};

export default ClientHeader;
