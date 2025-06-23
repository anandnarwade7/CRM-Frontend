import React, { useState } from "react";
import { useGetLeads } from "../../../hooks/Leads/useGetLeads";
import { useSelector } from "react-redux";
import { Link } from "../../../assets";
import { Button } from "../../ui/button";
import { useNavigate } from "react-router";
import { useUserRole } from "../../../hooks/use-userrole";
import { useGetSalesLeads } from "../../../hooks/Leads/useGetSalesLeads";
import { useUserId } from "../../../hooks/use-user-id";
import TablePagination from "../TablePagination/TablePagination";

const LeadsTable = () => {
  const [page, setPage] = useState(1);
  const status = useSelector((state) => state.leads.status);
  const userRole = useUserRole();
  const navigate = useNavigate();
  const userId = useUserId();
  const { leadsData, totalPages, isLoading, error } =
    userRole === "ADMIN"
      ? useGetLeads(page, status)
      : useGetSalesLeads(userId, 1);

  console.log("STatus in the Redux", status);

  if (leadsData?.length === 0) {
    return <p>No Data Available</p>;
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg text-sm my-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left font-medium">Sr. No</th>
              <th className="p-2 text-left font-medium">Lead Name</th>
              <th className="p-2 text-left font-medium">Phone Number</th>
              <th className="p-2 text-left font-medium">Email</th>
              <th className="p-2 text-left font-medium">Sales Person</th>
              <th className="p-2 text-left font-medium">Status</th>
              {status !== "COMPLETED" && (
                <th className="p-2 text-left font-medium">Action</th>
              )}
            </tr>
          </thead>
          <tbody>
            {leadsData.map((lead, index) => (
              <tr key={lead.id} className="border-b text-[#757575]">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{lead?.name}</td>
                <td className="p-3">{lead?.mobileNumber}</td>
                <td className="p-3">{lead?.email}</td>
                <td className="p-3">{lead?.salesPerson}</td>
                <td className="p-3 text-main-text">
                  {lead?.status === "ASSIGNED"
                    ? "Assigned"
                    : lead?.status === "CONVERTED"
                    ? "Completed"
                    : lead?.status === "HOT"
                    ? "Hot"
                    : lead?.status === "COLD"
                    ? "Cold"
                    : lead?.status}
                </td>
                {status !== "COMPLETED" && (
                  <td className="p-3">
                    <Button
                      size="icon"
                      className="bg-main-secondary rounded-xl shadow-none"
                      onClick={() => {
                        if (userRole === "ADMIN") {
                          navigate(`/app/leads-details/${lead?.id}`);
                        } else {
                          navigate(`/app/leads-details-sales/${lead?.id}`);
                        }
                      }}
                    >
                      <img src={Link} alt="link" />
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TablePagination totalPages={totalPages} page={page} setPage={setPage} />
    </>
  );
};

export default LeadsTable;
