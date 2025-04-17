import React from "react";
import { Button } from "../../ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router";
import { useUserRole } from "../../../hooks/use-userrole";

const ProjectHeader = () => {
  const navigate = useNavigate();
  const userRole = useUserRole();

  const isInventoryBtnVisible = userRole === "CRM" ? false : true;
  return (
    <div className="flex items-center justify-between">
      <p className="font-medium text-2xl text-[#707070]">Project Details</p>
      {isInventoryBtnVisible && (
        <Button
          onClick={() => navigate("/app/create-inventory")}
          className="bg-main shadow-none"
        >
          <Plus size={18} />
          Inventory
        </Button>
      )}
    </div>
  );
};

export default ProjectHeader;
