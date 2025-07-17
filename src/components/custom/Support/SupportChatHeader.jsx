import { ChevronLeftIcon, MoveLeft } from "lucide-react";
import { Back } from "../../../assets";
import { Button } from "../../ui/button";
import { Card } from "../../ui/card";
import Placeholder from "../Placeholder";
import { useLocation, useNavigate } from "react-router";

const SupportChatHeader = ({ userName }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from || "/app/support";

  return (
    <div>
      <Card className="w-full p-3">
        <div className="flex items-center space-x-10">
          <Button
            variant="secondary"
            size="icon"
            className="size-8"
            onClick={() => navigate(from)}
          >
            <MoveLeft />
          </Button>
          <div className="flex items-center space-x-4">
            <div className="bg-gray-300 size-10 rounded-full"></div>
            <p>{userName}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SupportChatHeader;
