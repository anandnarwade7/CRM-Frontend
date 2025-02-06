import UserHeader from "../../components/custom/Users/UserHeader";
import SalesPersonTable from "./SalesPersonTable";

const SalesPerson = () => {
  return (
    <section className="bg-white w-full p-3 rounded-lg">
      <UserHeader
        title="Sales Persons Details"
        btnText="Add new Sales Person"
      />
      <SalesPersonTable />
    </section>
  );
};

export default SalesPerson;
