import { useNavigate } from "react-router";
import SupportHeader from "../../components/custom/Support/SupportHeader";
import SupportTable from "../../components/custom/Support/SupportTable";
import { Button } from "../../components/ui/button";
import { useDispatch } from "react-redux";
import { setAdminToggle } from "../../Store/Slices/Support/supportSlice";

const AdminSupport = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div>
      <div className="flex items-center justify-between">
        <SupportHeader label="Support Details" />
        <div className="flex items-center gap-4">
          <Button variant="link" onClick={() => dispatch(setAdminToggle())}>
            Admin view
          </Button>
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
