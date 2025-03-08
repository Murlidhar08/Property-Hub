import Navbar from "../../components/Navbar";
import ClientsPage from "../clients/Clients";

export default function Admin() {
  return (
    <>
      <div className="flex flex-row">
        <Navbar />
        <ClientsPage />
      </div>
    </>
  );
}
