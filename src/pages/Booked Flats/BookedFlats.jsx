import Table from "../../components/custom/Table";
import { useGetBookedFlats } from "../../hooks/Booked Flats/useGetBookedFlats";

const BookedFlats = () => {
  const { data, isLoading, error } = useGetBookedFlats();
  console.log("BOOKED FLATS", data, error);

  const columns = [
    { header: "Sr. No", cell: ({ row }) => row.index + 1 },
    { header: "Client Name", accessorKey: "clientName" },
    {
      header: "Sales Person",
      accessorKey: "salesName",
    },
    {
      header: "CRM",
      accessorKey: "crmName",
      cell: ({ getValue }) => getValue() || "—",
    },
    {
      header: "Flat Number",
      accessorFn: (row) => row?.flat?.flatNumber ?? "—",
    },
    {
      header: "Flat Type",
      accessorFn: (row) => `${row?.flat?.flatType} BHK` ?? "—",
    },
    { header: "Flat Size", accessorFn: (row) => row?.flat?.flatSize ?? "—" },
    {
      header: "Status",
      accessorKey: "status",
      accessorFn: (row) => row?.flat?.status ?? "—",
    },
  ];

  if (isLoading) return <p>Loading...</p>;

  if (data?.length === 0) return <p>No Data Available</p>;

  if (error) return <p>Error fetching data</p>;

  return (
    <section className="w-full rounded-xl bg-white h-full px-6 py-3">
      <p className="font-medium text-2xl text-[#707070]">Confirmed Bookings</p>

      <Table data={data} columns={columns} />
    </section>
  );
};

export default BookedFlats;
