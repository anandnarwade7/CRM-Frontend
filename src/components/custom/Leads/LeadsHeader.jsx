import { Button } from "../../ui/button";
import { Notification } from "../../../assets";
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

const LeadsHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleStatusChange = (value) => {
    dispatch(setStatus(value));
  };

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
      <div className="flex justify-between my-3">
        <div>
          <Select onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[180px] shadow-none border-0 focus:ring-0 bg-[#FFD073] text-[#FFFFFF]">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="assigned">Assigned</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
