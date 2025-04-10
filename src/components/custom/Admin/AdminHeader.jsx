import { Plus } from "lucide-react";
import { Button } from "../../ui/button";
import { useNavigate } from "react-router";

const AdminHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between">
      <p className="text-2xl font-medium text-[#707070]">Admin Details</p>
      <Button
        className="bg-main font-medium"
        onClick={() => navigate("/app/admin-details")}
      >
        <Plus />
        Add new Admins
      </Button>
    </div>
  );
};

export default AdminHeader;
