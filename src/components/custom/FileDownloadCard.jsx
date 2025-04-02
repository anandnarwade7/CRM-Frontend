import { Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const FileDownloadCard = ({ title }) => {
  return (
    <div className="w-full max-w-64">
      <CardHeader className="px-0 pt-0 pb-3">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
      </CardHeader>
      <Card
        className="shadow-none rounded-sm cursor-pointer hover:bg-muted/50 transition-colors h-full min-h-[10rem] flex items-center justify-center"
        // onClick={handleDownload}
      >
        <CardContent className="flex items-center justify-center p-6">
          <div className="flex flex-col items-center gap-2">
            <div className="rounded-full bg-rose-100 p-3">
              <Download className="h-6 w-6 text-rose-500" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FileDownloadCard;
