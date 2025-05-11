import React, { useEffect, useState } from 'react';
import {
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  CartesianGrid,
} from 'recharts';
import { getRetailData } from '../../api'; // Adjust path as needed

const SalesBarChart = ({ filters }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (Object.keys(filters).length === 0) return;

      try {
        const retailData = await getRetailData(filters);
        const salesByYear = retailData?.sales_by_year || {};

        // Transform data for Recharts
        const formattedData = Object.entries(salesByYear).map(([year, value]) => ({
          ppg: year,
          totalSales: value, // Assuming value is already a total
        }));

        setData(formattedData);
        setError(null);
      } catch (err) {
        setError("Failed to load sales data.");
        setData([]);
      }
    };

    fetchData();
  }, [filters]);

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-lg font-bold mb-2">Sales Value by Year (EURO)</h2>

      {error && <div className="text-red-500 mb-2">{error}</div>}

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            tickFormatter={(value) => `${(value / 1_000_000_000).toFixed(0)} B`}
          />
          <YAxis dataKey="ppg" type="category" />
          <Tooltip
            formatter={(value) => `€${(value / 1_000_000_000).toFixed(1)}B`}
            labelFormatter={(label) => `Year: ${label}`}
          />
          <Bar dataKey="totalSales" fill="#3B82F6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesBarChart;
