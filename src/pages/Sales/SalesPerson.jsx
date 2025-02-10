import UserHeader from "../../components/custom/Users/UserHeader";
import UserPersonTable from "./UserPersonTable";

const SalesPerson = () => {
  return (
    <section className="bg-white w-full p-3 rounded-lg">
      <UserHeader
        title="Sales Persons Details"
        btnText="Add new Sales Person"
      />
      <UserPersonTable />
    </section>
  );
};

export default SalesPerson;
