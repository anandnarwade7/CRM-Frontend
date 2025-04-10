import React from "react";

const DashboardCard = ({ title, data, img }) => {
  return (
    <>
      <div className="w-full max-w-[21rem] bg-white rounded-lg p-9 shadow-sm">
        <p className="text-main-text font-normal text-lg">{title}</p>
        <div className="flex items-center justify-between mt-4">
          <p className="text-main-secondary font-medium text-5xl mt-4">
            {data}
          </p>
          <img src={img} alt={img} />
        </div>
      </div>
    </>
  );
};

export default DashboardCard;
