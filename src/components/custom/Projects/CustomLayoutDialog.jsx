import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Card, CardContent } from "../../ui/card";
import { CirclePlus, Edit2, Upload, X } from "lucide-react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

const CustomLayoutDialog = ({
  towerIndex,
  onAddCustomLayout,
  existingCustomLayout,
}) => {
  const [open, setOpen] = useState(false);
  const [customName, setCustomName] = useState("");
  const [customFile, setCustomFile] = useState(null);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (existingCustomLayout) {
      setCustomName(existingCustomLayout.name || "");
      setCustomFile(existingCustomLayout.file || null);
    } else {
      setCustomName("");
      setCustomFile(null);
    }
  }, [existingCustomLayout, open]);

  const validateForm = () => {
    const newErrors = {};

    if (!customName.trim()) {
      newErrors.name = "Layout name is required";
    }

    if (!customFile) {
      newErrors.file = "Layout image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          file: "Please select a valid image file",
        }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          file: "File size must be less than 5MB",
        }));
        return;
      }
      setCustomFile(file);
      setErrors((prev) => ({ ...prev, file: null }));
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onAddCustomLayout({
        name: customName.trim(),
        file: customFile,
      });
      setOpen(false);
    }
  };

  const handleCancel = () => {
    setCustomName("");
    setCustomFile(null);
    setErrors({});
    setOpen(false);
  };

  const removeFile = () => {
    setCustomFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Card className="cursor-pointer border-[#B0A7A7] shadow-none h-full w-full min-h-[170px] max-w-[170px] flex items-center justify-center hover:border-main transition-colors">
            <CardContent className="flex flex-col items-center justify-center p-6">
              {existingCustomLayout ? (
                <>
                  <Edit2 className="mb-2 h-6 w-6 text-green-600" />
                  <span className="text-sm font-medium text-center">
                    {existingCustomLayout.name}
                  </span>
                  <span className="text-xs text-gray-500 mt-1">
                    Click to edit
                  </span>
                </>
              ) : (
                <>
                  <CirclePlus className="mb-2 h-6 w-6" />
                  <span>Customize</span>
                </>
              )}
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Custom Layout</DialogTitle>
            <DialogDescription>
              Add a custom layout for this tower. You can only add one custom
              layout per tower.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="layoutName">Layout Name</Label>
              <Input
                id="layoutName"
                value={customName}
                onChange={(e) => {
                  setCustomName(e.target.value);
                  if (errors.name)
                    setErrors((prev) => ({ ...prev, name: null }));
                }}
                placeholder="Enter layout name"
                className="mt-1"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <Label>Layout Image</Label>
              <div className="mt-2">
                {customFile ? (
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center space-x-2">
                      <Upload size={16} />
                      <span className="text-sm truncate">
                        {customFile.name}
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={removeFile}
                    >
                      <X size={16} />
                    </Button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
                  >
                    <Upload className="mx-auto h-8 w-8 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      Click to upload image
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
              {errors.file && (
                <p className="text-red-500 text-sm mt-1">{errors.file}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {existingCustomLayout ? "Update" : "Add"} Layout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomLayoutDialog;
