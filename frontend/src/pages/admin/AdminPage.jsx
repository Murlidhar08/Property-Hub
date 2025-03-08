import Navbar from "../../components/Navbar";
import PropertyPage from "../property/PropertyPage";
import AddUpdateProperty from "../property/AddUpdateProperty";
import TinyEditor from "../../components/TinyEditor";
import AddUpdateClient from "../clients/AddUpdateClient";

export default function AdminPage() {
  return (
    <>
      <div className="flex flex-row">
        <Navbar />
        <AddUpdateClient />
      </div>
    </>
  );
}
