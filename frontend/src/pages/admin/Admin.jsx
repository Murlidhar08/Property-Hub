import Navbar from "../../components/Navbar";
import PropertyPage from "../propertyPage/PropertyPage";

export default function Admin() {
  return (
    <>
      <div className="flex flex-row">
        <Navbar />
        <PropertyPage />
      </div>
    </>
  );
}
