import React, { useEffect, useState } from 'react';
import { fetchTransportData } from './TransportDashboard';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export default function CompanyTwoDashboard() {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTransportData('TransWay Express')
      .then(setRecords)
      .catch(() => setError('❌ Failed to fetch company data'));
  }, []);

  // Chart data preparation
  const vehicleCount = {};
  records.forEach((record) => {
    const vehicle = record.VehicleType || 'Unknown';
    vehicleCount[vehicle] = (vehicleCount[vehicle] || 0) + 1;
  });

  const chartData = Object.entries(vehicleCount).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h3 className="text-2xl font-bold text-blue-800 mb-4">
         Company Dashboard - TransWay Express
      </h3>

      {error && <p className="text-red-500">{error}</p>}

      {!error && records.length > 0 ? (
        <>
          {/* Chart Section */}
          <div className="bg-white p-4 mb-8 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold mb-3 text-gray-700">
              🚚 Uploads by Vehicle Type
            </h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#60a5fa" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Table Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold mb-3 text-gray-700 text-center">
              📋 Uploaded Records
            </h4>
            <div className="overflow-x-auto">
              <table className="table-auto w-full text-sm text-center border border-gray-300">
                <thead className="bg-blue-100 text-gray-700">
                  <tr>
                    {Object.keys(records[0]).map((key) => (
                      <th
                        key={key}
                        className="px-4 py-2 border border-gray-300"
                      >
                        {key}
                      </th>
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
                        <td key={i} className="px-4 py-2 border border-gray-200">
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        !error && <p className="text-gray-600">No records found for ABC Movers.</p>
      )}
    </div>
  );
}
