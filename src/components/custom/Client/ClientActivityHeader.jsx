import { SearchIcon } from "lucide-react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

const ClientActivityHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <p className="text-[#707070] text-2xl">Transactional Activities</p>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Input
            className="peer ps-9 pe-9"
            placeholder="Search"
            type="search"
          />
          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
            <SearchIcon size={16} />
          </div>
        </div>
        <Button className="bg-main">Export</Button>
      </div>
    </div>
  );
};

export default ClientActivityHeader;
