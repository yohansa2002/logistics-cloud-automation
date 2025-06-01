import React, { useEffect, useState } from 'react';
import { fetchTransportData } from './TransportDashboard';
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const AdminDashboard = () => {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTransportData()
      .then(setRecords)
      .catch(() => setError('❌ Failed to fetch transport data'));
  }, []);

  const companyCounts = {};
  const statusPerCompany = {};
  const vehicleDistance = {};

  records.forEach(record => {
    companyCounts[record.CompanyName] = (companyCounts[record.CompanyName] || 0) + 1;
    statusPerCompany[record.CompanyName] = (statusPerCompany[record.CompanyName] || 0) + 1;

    const key = `${record.CompanyName}__${record.VehicleType}`;
    vehicleDistance[key] = (vehicleDistance[key] || 0) + parseFloat(record.Distance_km || 0);
  });

  const formatChartData = (obj) =>
    Object.entries(obj).map(([name, value]) => ({ name, value }));

  const formatVehicleChartData = () => {
    const grouped = {};
    Object.entries(vehicleDistance).forEach(([key, value]) => {
      const [company, vehicle] = key.split('__');
      if (!grouped[company]) grouped[company] = {};
      grouped[company][vehicle] = value;
    });

    return Object.entries(grouped).map(([company, data]) => ({
      CompanyName: company,
      ...data
    }));
  };

  const pieColors = ['#60a5fa', '#facc15', '#34d399', '#f87171', '#c084fc'];

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-4">📊 Admin Dashboard</h2>
      <p className="text-gray-600 mb-4 text-sm">Analytics of uploaded transport records across companies.</p>

      {error && <p className="text-red-500">{error}</p>}

      {!error && records.length > 0 && (
        <>
          {/* File Uploads Per Company */}
          <div className="mb-6 grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
            <div className="bg-white p-4 rounded-lg shadow-sm w-full">
              <h3 className="text-base font-semibold mb-2">📂 File Uploads Per Company</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={formatChartData(companyCounts)}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#60a5fa" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="hidden lg:block"></div>
          </div>

          {/* Delivery Status Breakdown */}
          <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-base font-semibold mb-2">📦 Delivery Status Breakdown</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={formatChartData(statusPerCompany)}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                >
                  {formatChartData(statusPerCompany).map((_, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Distance by Vehicle & Company */}
          <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-base font-semibold mb-2">🚛 Distance by Vehicle & Company</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={formatVehicleChartData()}>
                <XAxis dataKey="CompanyName" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Truck" fill="#f59e0b" />
                <Bar dataKey="Lorry" fill="#3b82f6" />
                <Bar dataKey="Mini Truck" fill="#f472b6" />
                <Bar dataKey="Van" fill="#22c55e" />
                <Bar dataKey="Container" fill="#a78bfa" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Transport Records Table */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-base font-semibold mb-4 text-center">📋 Transport Records</h3>
            <div className="overflow-x-auto">
              <table className="table-auto w-full text-sm text-center border border-gray-200">
                <thead className="bg-green-100 text-gray-700">
                  <tr>
                    {Object.keys(records[0]).map((key) => (
                      <th key={key} className="px-4 py-2 border border-gray-200">{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {records.map((record, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? 'bg-blue-50' : 'bg-gray-50'}
                    >
                      {Object.values(record).map((value, i) => (
                        <td key={i} className="px-4 py-2 border border-gray-200">{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
