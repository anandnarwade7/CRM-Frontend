import React from "react";
import { Button } from "../../ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router";

const ProjectHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between">
      <p className="font-medium text-2xl text-[#707070]">Project Details</p>
      <Button
        onClick={() => navigate("/app/inventory-details")}
        className="bg-main shadow-none"
      >
        <Plus size={18} />
        Inventory
      </Button>
    </div>
  );
};

export default ProjectHeader;
