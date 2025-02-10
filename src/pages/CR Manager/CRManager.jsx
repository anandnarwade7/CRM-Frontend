import UserHeader from "../../components/custom/Users/UserHeader";
import UserPersonTable from "../Sales/UserPersonTable";

const CRManager = () => {
  return (
    <section className="bg-white w-full p-3 rounded-lg">
      <UserHeader title="CR Manager Details" btnText="Add New CR Manager" />
      <UserPersonTable />
    </section>
  );
};

export default CRManager;
