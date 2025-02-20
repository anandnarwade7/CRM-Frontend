const DashboardCard = ({ item }) => {
  return (
    <div className="w-full max-w-[21rem] bg-white rounded-lg p-9 flex items-center justify-between shadow-sm">
      <div>
        <p className="text-[#5B5959] font-normal text-xl">{item?.title}</p>
        <p className="text-[#D0AF6E] font-medium text-5xl mt-4">{item?.stat}</p>
      </div>
      <img src={item?.icon} alt="item" />
    </div>
  );
};

export default DashboardCard;
