import { Card, CardContent } from "@mui/material";
import { Wallet, PieChart, Users, CreditCard } from "lucide-react";

const Dashboard = () => {
    const stats = [
        { icon: Wallet, value: "$143,624", label: "Your bank balance" },
        { icon: PieChart, value: "12", label: "Uncategorized transactions" },
        { icon: Users, value: "7", label: "Employees working today" },
        { icon: CreditCard, value: "$3,287.49", label: "This week's card spending" },
    ];

    return (
        <div className="p-6 bg-gray-100 min-h-screen w-full">
            <h1 className="text-2xl font-bold mb-4">Good morning, Mahesh Chavda!</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map(({ icon: Icon, value, label }, index) => (
                    <Card key={index} className="p-4 bg-white shadow-md rounded-lg">
                        <CardContent className="flex flex-col items-start gap-2">
                            <Icon className="w-6 h-6 text-gray-700" />
                            <p className="text-lg font-semibold">{value}</p>
                            <p className="text-sm text-gray-500">{label}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
