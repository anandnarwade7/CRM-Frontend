import { Notification } from "../../../assets";
import { Button } from "../../ui/button";

const ClientHeader = () => {
  return (
    <>
      {/* Upper Header */}
      <div className="flex items-center justify-between">
        <p className="font-medium text-2xl text-[#707070]">Client Details</p>
        <Button className="shadow-none">
          <img src={Notification} alt="notification" />
        </Button>
      </div>
    </>
  );
};

export default ClientHeader;
