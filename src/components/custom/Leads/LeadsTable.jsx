import React, { useState } from "react";
import { useGetLeads } from "../../../hooks/Leads/useGetLeads";
import { useSelector } from "react-redux";
import { Link } from "../../../assets";
import { Button } from "../../ui/button";
import { useNavigate } from "react-router";
import { useUserRole } from "../../../hooks/use-userrole";
import { useGetSalesLeads } from "../../../hooks/Leads/useGetSalesLeads";
import { useUserId } from "../../../hooks/use-user-id";

const LeadsTable = () => {
  const [selectedLead, setSelectedLead] = useState(null);
  const status = useSelector((state) => state.leads.status);
  const userRole = useUserRole();
  const navigate = useNavigate();
  const userId = useUserId();
  const { leadsData, totalPages, isLoading, error } =
    userRole === "ADMIN" ? useGetLeads(1, status) : useGetSalesLeads(userId, 1);

  console.log("Sales Leads Data", leadsData);

  if (leadsData?.length === 0) {
    return <p>No Data Available</p>;
  }

  console.log("Selected Lead", selectedLead);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg text-sm my-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left font-medium">Id</th>
              <th className="p-2 text-left font-medium">Lead Name</th>
              <th className="p-2 text-left font-medium">Phone Number</th>
              <th className="p-2 text-left font-medium">Email</th>
              <th className="p-2 text-left font-medium">Sales Person</th>
              <th className="p-2 text-left font-medium">Status</th>
              {status === "assigned" && (
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
                <td className="p-3 text-[#D0AF6E]">
                  {lead?.status === "ASSIGNED"
                    ? "Assigned"
                    : lead?.status === "COMPLETED"
                    ? "Completed"
                    : lead?.status}
                </td>
                {status === "assigned" && (
                  <td className="p-3">
                    <Button
                      size="icon"
                      className="bg-[#C99227] rounded-xl shadow-none"
                      onClick={() => {
                        // setSelectedLead(lead);
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
    </>
  );
};

export default LeadsTable;
