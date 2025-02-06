import { Plus } from "lucide-react";
import { Button } from "../../ui/button";
import { useLocation, useNavigate } from "react-router";

const UserHeader = ({ title, btnText }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location?.pathname?.split("/").pop();

  const role = currentPath === "sales-person" ? "SALES" : "CRM";
  const detailTitle =
    currentPath === "sales-person" ? "Add Sales" : "Add CR Manager";

  return (
    <>
      <div className="flex items-center justify-between">
        <p className="text-2xl font-medium text-[#707070]">{title}</p>
        <Button
          className="bg-[#C99227] shadow-none"
          onClick={() =>
            navigate("/app/userDetails", { state: { detailTitle, role } })
          }
        >
          <Plus size={18} />
          {btnText}
        </Button>
      </div>
    </>
  );
};

export default UserHeader;
