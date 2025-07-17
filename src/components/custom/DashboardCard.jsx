import React from "react";
import { useNavigate } from "react-router";

const DashboardCard = ({ title, data, img, redirect }) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(redirect);
  };

  return (
    <>
      <div
        className={`w-full max-w-[21rem] bg-white rounded-lg p-9 shadow-sm ${
          redirect && "cursor-pointer"
        }`}
        onClick={redirect ? handleRedirect : undefined}
      >
        <p className={`text-main-text font-normal text-lg`}>{title}</p>
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
