import React from "react";
import { Button } from "../../ui/button";
import { Plus } from "lucide-react";

const ProjectHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <p className="font-medium text-2xl text-[#707070]">Project Details</p>
      <Button
        // onClick={() => navigate("/app/assign-leads")}
        className="bg-[#C99227] shadow-none"
      >
        <Plus size={18} />
        Inventory
      </Button>
    </div>
  );
};

export default ProjectHeader;
