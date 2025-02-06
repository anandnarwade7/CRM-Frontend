import { Plus } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router";

const SalesHeader = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center justify-between">
        <p className="text-2xl font-medium text-[#707070]">
          Sales Persons Details
        </p>
        <Button
          className="bg-[#C99227] shadow-none"
          onClick={() => navigate("/app/sales-person/details")}
        >
          <Plus size={18} />
          Add new Sales Person
        </Button>
      </div>
    </>
  );
};

export default SalesHeader;
