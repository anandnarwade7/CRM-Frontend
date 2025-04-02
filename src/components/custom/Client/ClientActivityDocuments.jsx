import React from "react";
import FileDownloadCard from "../FileDownloadCard";

const ClientActivityDocuments = () => {
  return (
    <div className="mt-[4rem] mb-10">
      <p className="text-[#1C4D6B] font-medium my-[3rem]">Initial documents</p>
      <div className="flex items-center justify-between gap-10">
        <FileDownloadCard title="Download Agreement" />
        <FileDownloadCard title="Download Stamp duty" />
        <FileDownloadCard title="Download TDS Document" />
        <FileDownloadCard title="Download Bank Sanction" />
      </div>
    </div>
  );
};

export default ClientActivityDocuments;
