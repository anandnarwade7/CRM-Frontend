import { useNavigate } from "react-router";
import SupportHeader from "../../components/custom/Support/SupportHeader";
import SupportTable from "../../components/custom/Support/SupportTable";
import { Button } from "../../components/ui/button";

const AdminSupport = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex items-center justify-between">
        <SupportHeader label="Support Details" />
        <div className="flex items-center gap-4">
          <Button variant="link" onClick={() => navigate("/app/support-admin")}>My Tickets</Button>
          <Button
            className="bg-main"
            onClick={() => navigate("/app/support-raise")}
          >
            Add Request
          </Button>
        </div>
      </div>
      <SupportTable />
    </div>
  );
};

export default AdminSupport;
