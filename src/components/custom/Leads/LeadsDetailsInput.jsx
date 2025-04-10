import React from "react";

const LeadsDetailsInput = ({ label, data }) => {
  return (
    <div>
      <p className="text-main-label text-sm mb-1">{label}</p>
      <div className="border-[1px] border-[#B0A7A7] rounded-md px-3 py-2 text-[#A9A9A9] text-sm">
        <span>{data}</span>
      </div>
    </div>
  );
};

export default LeadsDetailsInput;
