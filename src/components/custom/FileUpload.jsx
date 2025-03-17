import React, { useState } from "react";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { UploadIcon } from "lucide-react";
import { useController } from "react-hook-form";

const FileUpload = ({ title, name, control, setValue, trigger }) => {
  const { field } = useController({ name, control });

  const handleFileChange = (e) => {
    console.log("File Event", e?.target?.files[0]?.size);
    const file = e.target.files[0];
    if (file && file.type !== "application/pdf") {
      alert("Please Upload the PDF File");
      return;
    }
    setValue(name, file);
    trigger(name);
  };

  const formateFileSize = (size) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };

  // const [file, setFile] = useState(null);
  // const [isDragging, setIsDragging] = useState(false);

  //   Function for Handling the File
  // const handleFileChange = (e) => {
  //   const selectedFile = e.target.files[0];

  //   if (selectedFile && selectedFile.type !== "application/pdf") {
  //     alert("Please Upload an PDF File");
  //     return;
  //   }
  //   setFile(selectedFile);
  // };

  //   funcions for Handling the Drag Functionality
  // const handleDragOver = (e) => {
  //   e.preventDefault();
  //   setIsDragging(true);
  // };

  // const handleDragLeave = (e) => {
  //   e.preventDefault();
  //   setIsDragging(false);
  // };

  // const handleDrop = (e) => {
  //   e.preventDefault();
  //   setIsDragging(false);

  //   const droppedFile = e.dataTransfer.files?.[0];

  //   if (droppedFile && droppedFile.type !== "application/pdf") {
  //     alert("Please Upload an PDF File");
  //     return;
  //   }

  //   setFile(droppedFile);
  // };

  return (
    <div>
      <p className="text-sm font-medium mb-2">{title}</p>
      <Card
        className={`border-2 border-[#B0A7A7] shadow-none rounded-md cursor-pointer w-full md:max-w-[55%]`}
      >
        <input
          type="file"
          id={name}
          className="sr-only"
          accept=".pdf,application/pdf"
          onChange={handleFileChange}
        />
        <label
          htmlFor={name}
          className="flex flex-col items-center justify-center h-full min-h-32 p-4 cursor-pointer"
        >
          {field?.value ? (
            <div className="flex flex-col items-center justify-center space-y-2">
              <UploadIcon className="w-8 h-8 text-amber-500" />
              <span className="text-xs text-muted-foreground text-center">
                {field.value.name}
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-2">
              <UploadIcon className="w-8 h-8 text-amber-500" />
              <span className="text-xs text-muted-foreground">
                click to upload
              </span>
            </div>
          )}
        </label>
      </Card>
      {/* {field?.value && (
        <p>
          {field?.value?.name} ({formateFileSize(field?.value?.size)})
        </p>
      )} */}
    </div>
  );
};

export default FileUpload;
