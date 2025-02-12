import { Button } from "../../ui/button";
import { Notification } from "../../../assets";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router";

const LeadsHeader = () => {
  const navigate = useNavigate();
  return (
    <section>
      {/* Upper Header */}
      <div className="flex items-center justify-between">
        <p className="font-medium text-2xl text-[#707070]">Leads</p>
        <Button className="shadow-none">
          <img src={Notification} alt="notification" />
        </Button>
      </div>
      {/* Lower Header */}
      <div className="flex justify-end my-3">
        <Button
          onClick={() => navigate("/app/assign-leads")}
          className="bg-[#C99227] shadow-none"
        >
          <Plus size={18} />
          Assign Leads
        </Button>
      </div>
    </section>
  );
};

export default LeadsHeader;
