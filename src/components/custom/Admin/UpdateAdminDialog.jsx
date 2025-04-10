import { useAdminActionStatus } from "../../../hooks/Admin/useAdminActionStatus";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";

const UpdateAdminDialog = ({
  open,
  onClose,
  selectedAction,
  selectedUserId,
}) => {
  const { handleYesClick } = useAdminActionStatus(
    selectedUserId,
    selectedAction,
    onClose
  );
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-[#233A48] font-medium">
            Are you sure ?
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-4">
          <Button
            className="bg-main-secondary w-full max-w-md p-5"
            onClick={handleYesClick}
          >
            Yes
          </Button>
          <Button
            onClick={() => onClose(false)}
            className="border-2 border-main-secondary bg-white text-main-secondary w-full max-w-md p-5"
          >
            No
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateAdminDialog;
