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
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../components/ui/dialog";
import { useEffect, useRef, useState } from "react";
import FlatDetailsDialog from "../../components/custom/Projects/FlatDetailsDialog";
import { useGetTowerDetails } from "../../hooks/Projects/useGetTowerDetails";
import { Loader2 } from "lucide-react";
import { useGetFlatsDetails } from "../../hooks/Projects/useGetFlatsDetails";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";
import { useGetFlatById } from "../../hooks/Projects/useGetFlatById";
import { Button } from "../../components/ui/button";
import { useGetLayoutImage } from "../../hooks/Projects/useGetLayoutImage";
import axios from "axios";
import LayoutImageDialog from "../../components/custom/Projects/LayoutImageDialog";
import { useLayoutImageHandler } from "../../hooks/Projects/useLayoutImageHandler";

const InventoryDetails = () => {
  const { projectId } = useParams();
  const [selectedTowerId, setSelectedTowerId] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [hoveredFlatId, setHoveredFlatId] = useState(null);
  // Cache for storing already fetched flat data
  const [flatDataCache, setFlatDataCache] = useState({});
  // Ref to track if component is still mounted
  const isMounted = useRef(true);

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

  const {
    data: layoutImgData,
    isLoading: layoutImgLoading,
    error: layoutImgError,
  } = useGetLayoutImage(selectedTowerId);

  const {
    layoutImgUrl,
    isLayoutDialogOpen,
    setIsLayoutDialogOpen,
    handleLayoutImg,
  } = useLayoutImageHandler();

  console.log("Img Layout Data", layoutImgData);

  // Fetching the data to render the details in the tooltip

  const { data: hoverFlatData, isLoading: isHoveredFlatLoading } =
    useGetFlatById(hoveredFlatId, !!hoveredFlatId); // disabled by default

  useEffect(() => {
    if (hoverFlatData && hoveredFlatId && isMounted.current) {
      setFlatDataCache((prev) => ({
        ...prev,
        [hoveredFlatId]: hoverFlatData,
      }));
    }
  }, [hoverFlatData, hoveredFlatId]);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleMouseEnter = (flatId) => {
    setHoveredFlatId(flatId);
  };

  const handleMouseLeave = () => {
    // setHoveredFlatId(null);
  };

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
          <div className="flex items-center justify-between">
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
            {/* {selectedTowerId && (
              <div className="grid grid-cols-2 gap-3">
                <Button
                  className="bg-main"
                  onClick={() =>
                    handleLayoutImg(layoutImgData?.customLayouts?.oddLayout)
                  }
                  disabled={layoutImgLoading}
                >
                  {layoutImgLoading ? (
                    <Loader2 className="animate-spin w-4 h-4" />
                  ) : (
                    "Odd Layout"
                  )}
                </Button>
                <Button
                  className="bg-main"
                  onClick={() =>
                    handleLayoutImg(layoutImgData?.customLayouts?.evenLayout)
                  }
                  disabled={layoutImgLoading}
                >
                  {layoutImgLoading ? (
                    <Loader2 className="animate-spin w-4 h-4" />
                  ) : (
                    "Even Layout"
                  )}
                </Button>
                <Button
                  className="bg-main"
                  onClick={() =>
                    handleLayoutImg(layoutImgData?.customLayouts?.groundLayout)
                  }
                  disabled={layoutImgLoading}
                >
                  {layoutImgLoading ? (
                    <Loader2 className="animate-spin w-4 h-4" />
                  ) : (
                    "Ground Layout"
                  )}
                </Button>
                {Object.entries(layoutImgData?.customLayouts)
                  ?.filter(
                    (key) =>
                      !["oddLayout", "evenLayout", "groundLayout"].includes(key)
                  )
                  ?.map(([layoutName, layoutUrl]) => (
                    <Button
                      className="bg-main"
                      onClick={() => handleLayoutImg(layoutUrl)}
                      disabled={layoutImgLoading}
                    >
                      {layoutImgLoading ? (
                        <Loader2 className="animate-spin w-4 h-4" />
                      ) : (
                        layoutName
                          .replace(/([a-z])([A-Z])/g, "$1 $2")
                          .replace(/^\w/, (c) => c.toUpperCase())
                      )}
                    </Button>
                  ))}
              </div>
            )} */}
            {selectedTowerId && layoutImgData?.customLayouts && (
              <div className="grid grid-cols-2 gap-3 mt-4">
                {Object.entries(layoutImgData.customLayouts)
                  .filter(([, value]) => value !== null) // Only non-null layouts
                  .map(([layoutName, layoutUrl]) => (
                    <Button
                      key={layoutName}
                      className="bg-main"
                      onClick={() => handleLayoutImg(layoutUrl)}
                      disabled={layoutImgLoading}
                    >
                      {layoutImgLoading ? (
                        <Loader2 className="animate-spin w-4 h-4" />
                      ) : (
                        layoutName
                          .replace(/([a-z])([A-Z])/g, "$1 $2") // camelCase to spaced
                          .replace(/^\w/, (c) => c.toUpperCase()) // capitalize first letter
                          .replace(/([A-Z])/g, " $1") // extra handling for keys like "top Layout"
                          .replace(/\s+/g, " ") // normalize spaces
                          .trim()
                      )}
                    </Button>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* Units Grid */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          {isFlatsLoading ? (
            <Loader2 className="animate-spin" size={24} />
          ) : (
            flatsData?.length > 0 && (
              <div className="border rounded-md overflow-hidden w-full">
                <TooltipProvider>
                  {flatsData?.map((row, rowIndex) => (
                    <div key={row?.flatNumber} className="flex">
                      {row?.map((unit, colIndex) => (
                        <Tooltip key={`${rowIndex}-${colIndex}`}>
                          <TooltipTrigger asChild>
                            <DialogTrigger
                              key={`${rowIndex}-${colIndex}`}
                              asChild
                            >
                              <div
                                onClick={() => setSelectedUnit(unit)}
                                onMouseEnter={() => handleMouseEnter(unit?.id)}
                                onMouseLeave={handleMouseLeave}
                                className={`cursor-pointer hover:underline flex-1 p-4 text-center border-b border-r  font-semibold
                        ${
                          rowIndex === flatsData?.length - 1 ? "border-b-0" : ""
                        }
                        ${colIndex === row?.length - 1 ? "border-r-0" : ""}
                        ${
                          unit?.status === "Available"
                            ? "text-main-available"
                            : unit?.status === "Sold"
                            ? "text-main-sold"
                            : unit?.status === "Refugee"
                            ? "text-main-refugee"
                            : "text-main-booked"
                        }`}
                              >
                                {unit?.flatNumber}
                              </div>
                            </DialogTrigger>
                          </TooltipTrigger>
                          <TooltipContent className="py-3 bg-white shadow-lg">
                            {(() => {
                              const flatData =
                                flatDataCache[unit?.id] ||
                                (hoveredFlatId === unit?.id
                                  ? hoverFlatData
                                  : null);

                              if (flatData) {
                                return (
                                  <ul className="grid gap-3 text-xs">
                                    <li className="grid gap-0.5">
                                      <span className="text-main-text">
                                        Flat Size
                                      </span>
                                      <span className="text-gray-500">
                                        {`${
                                          flatData?.flatSize === null
                                            ? "-"
                                            : flatData?.flatSize
                                        } sq.ft.`}
                                      </span>
                                    </li>
                                    {unit?.status !== "Refugee" && (
                                      <li className="grid gap-0.5">
                                        <span className="text-main-text">
                                          Flat Type
                                        </span>
                                        <span className="text-gray-500">
                                          {`${
                                            flatData?.flatType === null
                                              ? "-"
                                              : flatData?.flatType
                                          } BHK`}
                                        </span>
                                      </li>
                                    )}
                                    <li className="grid gap-0.5">
                                      <span className="text-main-text">
                                        Status
                                      </span>
                                      <span className="text-gray-500">
                                        {flatData?.status}
                                      </span>
                                    </li>
                                  </ul>
                                );
                              } else if (
                                hoveredFlatId === unit?.id &&
                                isHoveredFlatLoading
                              ) {
                                return (
                                  <div className="p-2 flex items-center text-black">
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    <span>Loading...</span>
                                  </div>
                                );
                              }
                            })()}
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  ))}
                </TooltipProvider>
              </div>
            )
          )}
          <FlatDetailsDialog
            unit={selectedUnit}
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
          />
        </Dialog>

        {/* Layout Image Dialog */}
        <LayoutImageDialog
          open={isLayoutDialogOpen}
          onOpenChange={setIsLayoutDialogOpen}
          imageUrl={layoutImgUrl}
        />
      </div>
    </section>
  );
};

export default InventoryDetails;
