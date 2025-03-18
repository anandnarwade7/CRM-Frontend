import AdminHeader from "../../components/custom/Admin/AdminHeader";
import AdminTableContainer from "../../components/custom/Admin/AdminTableContainer";

const Admin = () => {
  return (
    <section className="bg-white w-full  h-full p-3 rounded-lg">
      <AdminHeader />
      <AdminTableContainer />
    </section>
  );
};

export default Admin;
