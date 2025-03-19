import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";

const UpdateAdminDialog = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-[#233A48] font-medium">
            Are you sure ?
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-4">
          <Button className="bg-[#C99227] w-full max-w-md p-5">Yes</Button>
          <Button
            onClick={() => onClose(false)}
            className="border-2 border-[#C99227] bg-white text-[#C99227] w-full max-w-md p-5"
          >
            No
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateAdminDialog;
