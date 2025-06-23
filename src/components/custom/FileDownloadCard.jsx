import { Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const FileDownloadCard = ({ title, onClick }) => {
  return (
    <div className="w-full">
      <p className="text-sm font-medium text-main-text mb-2">{title}</p>
      <Card
        // className="shadow-none rounded-sm cursor-pointer hover:bg-muted/50 transition-colors h-full min-h-[10rem] flex items-center justify-center"
        className="border-2 border-[#B0A7A7] shadow-none rounded-md cursor-pointer w-full transition-colors hover:bg-muted/50"
        onClick={onClick}
      >
        {/* <CardContent className="flex items-center justify-center p-6">
          <div className="flex flex-col items-center gap-2">
            <div className="rounded-full bg-rose-100 p-3">
              <Download className="h-6 w-6 text-rose-500" />
            </div>
          </div>
        </CardContent> */}
        <div className="flex flex-col items-center justify-center min-h-32 p-4 space-y-2">
          <div className="flex flex-col items-center gap-2">
            <div className="rounded-full bg-rose-100 p-3">
              <Download className="h-6 w-6 text-rose-500" />
            </div>
          </div>
          <span className="text-xs text-muted-foreground">Click to view</span>
        </div>
      </Card>
    </div>
  );
};

export default FileDownloadCard;
