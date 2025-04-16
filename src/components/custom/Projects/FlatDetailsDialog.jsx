import React, { useState } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Button } from "../../ui/button";

const FlatDetailsDialog = ({ unit }) => {
  const statusOptions = [
    { label: "Available", color: "bg-green-500", value: "available" },
    { label: "UN-Available", color: "bg-[#FF6F00]", value: "unavailable" },
    { label: "Booked", color: "bg-[#85ACFF]", value: "booked" },
  ];

  const [status, setStatus] = useState("available");

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>T1 {unit}</DialogTitle>
      </DialogHeader>
      <div>
        <Label className="text-main-text font-semibold">Area</Label>
        <Input
          className="bg-gray-100 border-[#CECECE] focus-visible:ring-0"
          value="1000 sq.ft"
        />
      </div>
      <div>
        <Label className="text-main-text font-semibold">Status</Label>
        <div className="space-y-2 mt-1">
          {statusOptions?.map((option) => (
            <div
              key={option.value}
              onClick={() => setStatus(option.value)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div
                className={`w-4 h-4 rounded-full border ${
                  status === option.value ? option.color : "bg-gray-200"
                }`}
              />
              <p>{option.label}</p>
            </div>
          ))}
        </div>
      </div>
      <Button className="bg-main-secondary">Update</Button>
    </DialogContent>
  );
};

export default FlatDetailsDialog;
