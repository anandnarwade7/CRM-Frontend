import { Button } from "../../ui/button";
import { NotificationIcon } from "../../../assets";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { useDispatch } from "react-redux";
import { setStatus } from "../../../Store/Slices/Leads/leadsSlice";
import { useUserRole } from "../../../hooks/use-userrole";

const LeadsHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRole = useUserRole();

  const handleStatusChange = (value) => {
    dispatch(setStatus(value));
  };

  return (
    <section>
      {/* Upper Header */}
      <div className="flex items-center justify-between">
        <p className="font-medium text-2xl text-[#707070]">Leads</p>
        <Button className="bg-white text-black shadow-none">
          <img src={NotificationIcon} alt="notification" />
        </Button>
      </div>
      {/* Lower Header */}
      {userRole === "ADMIN" && (
        <div className="flex justify-between my-3">
          <div>
            <Select defaultValue="ASSIGNED" onValueChange={handleStatusChange}>
              <SelectTrigger className="w-[180px] shadow-none border-0 focus:ring-0 bg-main text-white">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="COLD">Cold</SelectItem>
                <SelectItem value="HOT">Hot</SelectItem>
                <SelectItem value="ASSIGNED">Assigned</SelectItem>
                <SelectItem value="CONVERTED">Completed</SelectItem>
                <SelectItem value="REJECTED">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={() => navigate("/app/assign-leads")}
            className="bg-main shadow-none"
          >
            <Plus size={18} />
            Assign Leads
          </Button>
        </div>
      )}
    </section>
  );
};

export default LeadsHeader;
