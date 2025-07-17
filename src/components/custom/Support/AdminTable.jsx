import React, { useState } from "react";
import { useGetAdminSupport } from "../../../hooks/Support/useGetAdminSupport";
import { Link, useLocation, useNavigate } from "react-router";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";
import { Back, ChatIcon } from "../../../assets";
import Table from "../Table";
import { Loader2 } from "lucide-react";
import { Button } from "../../ui/button";
import { truncateName } from "../../../utils/utilityFunction";
import SupportHeader from "./SupportHeader";

const AdminTable = () => {
  const [page, setPage] = useState(1);
  const { adminSupportData, adminTotalPage, isLoading, error } =
    useGetAdminSupport(page);

  //   const salesData = otherSupportData?.filter((item) => item?.role === "SALES");

  const navigate = useNavigate();

  function handleChatClick(supportId, name) {
    navigate("/app/chat", {
      state: { supportId, name, from: "/app/support-admin" },
    });
  }

  const columns = [
    { header: "Sr. No", cell: ({ row }) => row.index + 1 },
    { header: "Name", accessorKey: "name" },
    {
      header: "Phone Number",
      accessorKey: "phone",
    },
    { header: "Email", accessorKey: "email" },
    { header: "Department", accessorKey: "department" },
    {
      // accessorKey: "query",
      header: "Query",
      cell: ({ row }) => {
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <p>{truncateName(row?.original?.query)}</p>
              </TooltipTrigger>
              <TooltipContent className="bg-gray-400 text-black max-w-xs break-words">
                <p>{row?.original?.query}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      },
    },
    { header: "Status", accessorKey: "status" },
    {
      header: "Chat",
      cell: ({ row }) => {
        return (
          // <Link to={`/app/chat/${row?.original?.userId}`}>
          //   <img src={ChatIcon} alt="chatIcon" />
          // </Link>
          <Button
            variant="secondary"
            size="icon"
            className="size-8"
            onClick={() =>
              handleChatClick(row?.original?.id, row?.original?.name)
            }
          >
            <img src={ChatIcon} alt="chatIcon" />
          </Button>
        );
      },
    },
  ];

  if (isLoading) {
    return <Loader2 className="animate-spin" size={6} />;
  }

  if (error) return <p className="text-red-500 text-sm">Error Loading Data</p>;

  return (
    <section className="w-full rounded-xl bg-white h-full px-6 py-3">
      <div>
        {/* <SupportHeader label="Admin Tickets" /> */}
        <Link className="flex items-center gap-6" to="/app/support">
          <img src={Back} alt="backicon" />
          <span className="font-medium text-[#707070] text-2xl">
            Admin Tickets
          </span>
        </Link>
      </div>
      <div>
        {adminSupportData?.length === 0 ? (
          <p>No support request are available</p>
        ) : (
          <Table data={adminSupportData || []} columns={columns} />
        )}

        {/* <TablePagination
          totalPages={adminTotalPage}
          page={page}
          setPage={setPage}
          /> */}
      </div>
    </section>
  );
};

export default AdminTable;
