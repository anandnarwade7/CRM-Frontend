import { Back } from "../../assets";
import { Link } from "react-router";
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

const InventoryDetails = () => {
  const [selectedUnit, setSelectedUnit] = useState(null);
  const units = [
    ["701", "702"],
    ["601", "602"],
    ["501", "502"],
    ["401", "402"],
    ["301", "302"],
    ["201", "202"],
    ["101", "102"],
  ];
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
        <p className="text-main-text font-medium">Kumar Properties</p>
        <div className="my-6 w-full max-w-sm">
          <Label
            htmlFor="tower"
            className="block text-sm mb-1 text-main-text font-medium"
          >
            Select Tower
          </Label>
          <Select defaultValue="T1">
            <SelectTrigger className="w-full border-gray-300 shadow-none">
              <SelectValue placeholder="Select tower" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="T1">T1</SelectItem>
              <SelectItem value="T2">T2</SelectItem>
              <SelectItem value="T3">T3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Units Grid */}
        <Dialog>
          <div className="border rounded-md overflow-hidden w-full max-w-sm">
            {units?.map((row, rowIndex) => (
              <div key={rowIndex} className="flex">
                {row?.map((unit, colIndex) => (
                  <DialogTrigger key={`${rowIndex}-${colIndex}`} asChild>
                    <div
                      onClick={() => setSelectedUnit(unit)}
                      className={`cursor-pointer hover:underline flex-1 p-4 text-center border-b border-r text-main-text font-semibold
                        ${rowIndex === units.length - 1 ? "border-b-0" : ""}
                        ${colIndex === row.length - 1 ? "border-r-0" : ""}
                        `}
                    >
                      {unit}
                    </div>
                  </DialogTrigger>
                ))}
              </div>
            ))}
          </div>
          <FlatDetailsDialog unit={selectedUnit} />
        </Dialog>
      </div>
    </section>
  );
};

export default InventoryDetails;
