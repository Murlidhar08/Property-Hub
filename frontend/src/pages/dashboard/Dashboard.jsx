import { Fence, AlbumIcon, Users, GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Redux
import { useSelector } from "react-redux";
import commonFunction from '@/utils/commonFunction.js';

// Service
import dashboardService from "@/services/dashboardService.js";

const Dashboard = () => {
  const user = useSelector((state) => state.user);
  const [counts, setCounts] = useState({
    totalAgents: 0,
    totalClients: 0,
    totalProperties: 0,
    totalRequirements: 0
  });

  // Fetch clients
  useEffect(() => {
    dashboardService.getDashboardCounts()
      .then(response => {
        if (response.success) {
          setCounts(response.data);
        } else {
          throw new Error(response.message || "Failed to fetch details.");
        }
      })
      .catch(error => console.error("Error fetching details:", error));
  }, []);

  const cards = [
    { icon: Fence, value: counts.totalProperties, label: "Total Properties", redirectLink: "/properties" },
    { icon: AlbumIcon, value: counts.totalRequirements, label: "Total Requirements", redirectLink: "/requirements" },
    { icon: Users, value: counts.totalClients, label: "Total Clients", redirectLink: "/clients" },
    { icon: GraduationCap, value: counts.totalAgents, label: "Total Agents", redirectLink: "/agents" },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          {commonFunction.getGreeting()}, {user.firstName || "Guest"} {user.lastName}
        </h1>
      </div>
      <hr className="my-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {cards.map(({ icon: Icon, value, label, redirectLink }, index) => (
          <Link to={redirectLink} key={index} className="no-underline">
            <div
              key={index}
              className="bg-white shadow-sm rounded-xl p-6 flex flex-col items-center text-center transition hover:shadow-lg"
            >
              <Icon className="w-12 h-12 text-purple-600 mb-3" />
              <p className="text-2xl font-semibold text-gray-900">{value}</p>
              <p className="text-sm text-gray-500">{label}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
