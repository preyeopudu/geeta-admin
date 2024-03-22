const DashboardOverview = () => {
  return (
    <div className="bg-white p-8 rounded-lg ">
      <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-12">
        <div className="bg-blue-100 p-8 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Users</h3>
          <p className="text-3xl font-bold">500</p>
        </div>
        <div className="bg-green-100 p-8 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Money Invested</h3>
          <p className="text-3xl font-bold">₦ 100,000</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
