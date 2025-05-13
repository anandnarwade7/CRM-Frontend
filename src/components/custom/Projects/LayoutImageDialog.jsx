import { Dialog, DialogContent } from "../../ui/dialog";

const LayoutImageDialog = ({ open, onOpenChange, imageUrl }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <img src={imageUrl} alt="layoutImg" className="w-full object-contain" />
      </DialogContent>
    </Dialog>
  );
};

export default LayoutImageDialog;
