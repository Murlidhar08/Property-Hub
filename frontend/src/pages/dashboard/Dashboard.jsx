import { Wallet, PieChart, Users, CreditCard } from "lucide-react";

const Dashboard = () => {
  const stats = [
    { icon: Wallet, value: "$143,624", label: "Your Bank Balance" },
    { icon: PieChart, value: "12", label: "Uncategorized Transactions" },
    { icon: Users, value: "7", label: "Employees Working Today" },
    {
      icon: CreditCard,
      value: "$3,287.49",
      label: "This Week's Card Spending",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Good morning, Mahesh Chavda!
        </h1>
      </div>
      <hr className="my-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map(({ icon: Icon, value, label }, index) => (
          <div
            key={index}
            className="bg-white shadow-sm rounded-xl p-6 flex flex-col items-center text-center transition hover:shadow-lg"
          >
            <Icon className="w-12 h-12 text-purple-600 mb-3" />
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
            <p className="text-sm text-gray-500">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
