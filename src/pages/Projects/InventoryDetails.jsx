import { Back } from "../../assets";
import { Link, useParams } from "react-router";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Dialog, DialogTrigger } from "../../components/ui/dialog";
import { useState } from "react";
import FlatDetailsDialog from "../../components/custom/Projects/FlatDetailsDialog";
import { useGetTowerDetails } from "../../hooks/Projects/useGetTowerDetails";
import { Loader2 } from "lucide-react";
import { useGetFlatsDetails } from "../../hooks/Projects/useGetFlatsDetails";

const InventoryDetails = () => {
  const { projectId } = useParams();
  const [selectedTowerId, setSelectedTowerId] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    data: towerSelectData,
    isLoading: towerSelectLoading,
    error: towerSelectError,
  } = useGetTowerDetails(projectId);

  const {
    data: flatsData,
    isLoading: isFlatsLoading,
    error: flatsError,
  } = useGetFlatsDetails(selectedTowerId);

  // const units = [
  //   ["701", "702"],
  //   ["601", "602"],
  //   ["501", "502"],
  //   ["401", "402"],
  //   ["301", "302"],
  //   ["201", "202"],
  //   ["101", "102"],
  // ];
  return (
    <section className="w-full h-full rounded-xl bg-white px-6 py-3">
      {/* Inventory Details Header */}
      <div className="flex items-center gap-6 mb-8">
        <Link to={"/app/projects"}>
          <img src={Back} alt="back" className="w-6" />
        </Link>
        <p className="text-[#707070] font-medium text-2xl">Inventory Details</p>
      </div>

      {/* Main Section */}
      <div className="mx-12">
        {/* <p className="text-main-text font-medium">Kumar Properties</p> */}
        {towerSelectLoading ? (
          <Loader2 className="animate-spin" size={24} />
        ) : (
          <div className="my-6 w-full max-w-sm">
            <Label
              htmlFor="tower"
              className="block text-sm mb-1 text-main-text font-medium"
            >
              Select Tower
            </Label>
            <Select onValueChange={setSelectedTowerId}>
              <SelectTrigger className="w-full border-gray-300 shadow-none">
                <SelectValue placeholder="Select tower" />
              </SelectTrigger>
              <SelectContent>
                {towerSelectData?.map((tower) => (
                  <SelectItem key={tower?.id} value={tower?.id}>
                    {tower?.towerName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Units Grid */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          {isFlatsLoading ? (
            <Loader2 className="animate-spin" size={24} />
          ) : (
            flatsData?.length > 0 && (
              <div className="border rounded-md overflow-hidden w-full">
                {flatsData?.map((row, rowIndex) => (
                  <div key={row?.flatNumber} className="flex">
                    {row?.map((unit, colIndex) => (
                      <DialogTrigger key={`${rowIndex}-${colIndex}`} asChild>
                        <div
                          onClick={() => setSelectedUnit(unit)}
                          className={`cursor-pointer hover:underline flex-1 p-4 text-center border-b border-r  font-semibold
                        ${
                          rowIndex === flatsData?.length - 1 ? "border-b-0" : ""
                        }
                        ${colIndex === row?.length - 1 ? "border-r-0" : ""}
                        ${
                          unit?.status === "Available"
                            ? "text-main-available"
                            : unit?.status == "UnAvailable"
                            ? "text-main-unavailable"
                            : "text-main-booked"
                        }`}
                        >
                          {unit?.flatNumber}
                        </div>
                      </DialogTrigger>
                    ))}
                  </div>
                ))}
              </div>
            )
          )}
          <FlatDetailsDialog
            unit={selectedUnit}
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
          />
        </Dialog>
      </div>
    </section>
  );
};

export default InventoryDetails;
