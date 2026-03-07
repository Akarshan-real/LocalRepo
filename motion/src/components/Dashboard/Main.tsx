import React from "react";

const Main = () => {
  return (
    <div className="flex-1 p-6 overflow-y-auto">

      {/* Top Title */}
      <h1 className="text-2xl font-semibold mb-6">Overview</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-6 mb-6">

        <Card
          title="Total Users"
          value="2,543"
          change="+12%"
          description="Increased by 257 since last month"
          color="bg-blue-100 text-blue-600"
        />

        <Card
          title="Revenue"
          value="$45,257"
          change="+8%"
          description="Increased by $3,257 since last month"
          color="bg-green-100 text-green-600"
        />

        <Card
          title="Active Sessions"
          value="1,325"
          change="+5%"
          description="Increased by 103 since yesterday"
          color="bg-yellow-100 text-yellow-600"
        />

        <Card
          title="Conversion Rate"
          value="12.3%"
          change="-2%"
          description="Decreased by 1.8% since last week"
          color="bg-red-100 text-red-600"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6 mb-6">

        <ChartCard title="User Activity" />

        <ChartCard title="Revenue Overview" />

      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>

        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gray-200"></div>

          <div>
            <p className="font-medium">User #1 performed an action</p>
            <p className="text-gray-500 text-sm">2 hours ago</p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Main;

const Card = ({ title, value, change, description, color }:any) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm">

      <div className="flex justify-between items-center mb-2">
        <h3 className="text-gray-500 text-sm">{title}</h3>

        <span className={`px-2 py-1 text-xs rounded ${color}`}>
          {change}
        </span>
      </div>

      <h2 className="text-2xl font-bold mb-1">{value}</h2>

      <p className="text-gray-400 text-sm">{description}</p>

    </div>
  );
};

const ChartCard = ({ title }:any) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">

      <h2 className="text-lg font-semibold mb-4">{title}</h2>

      <div className="h-60 bg-gray-100 flex items-center justify-center rounded">
        Chart Placeholder
      </div>

    </div>
  );
};