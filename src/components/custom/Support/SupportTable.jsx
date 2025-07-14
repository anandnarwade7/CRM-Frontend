import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { cn } from "../../../lib/utils";
import SalesTable from "./SalesTable";
import CRMTable from "./CRMTable";
import AdminTable from "./AdminTable";
import { useSelector } from "react-redux";

const SupportTable = () => {
  const toggle = useSelector((state) => state.support.adminToggle);
  console.log("Redux state", toggle);

  return (
    <div className="my-4">
      {toggle ? (
        <AdminTable />
      ) : (
        <Tabs defaultValue="salesPerson">
          <TabsList className="bg-blue-100 text-black py-0 px-0">
            {/* <TabsTrigger
            value="self"
            className={cn(
              "data-[state=active]:bg-[#1C4D6B] data-[state=active]:text-white w-full min-w-[160px] py-2"
            )}
          >
            Self
          </TabsTrigger> */}
            <TabsTrigger
              value="salesPerson"
              className={cn(
                "data-[state=active]:bg-[#1C4D6B] data-[state=active]:text-white w-full min-w-[160px] py-2"
              )}
            >
              Sales Person
            </TabsTrigger>
            <TabsTrigger
              value="crmManager"
              className={cn(
                "data-[state=active]:bg-[#1C4D6B] data-[state=active]:text-white w-full min-w-[160px] py-2"
              )}
            >
              CRM Manager
            </TabsTrigger>
          </TabsList>
          {/* <TabsContent value="self">
          <AdminTable />
        </TabsContent> */}
          <TabsContent value="salesPerson">
            <SalesTable />
          </TabsContent>
          <TabsContent value="crmManager">
            <CRMTable />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default SupportTable;
