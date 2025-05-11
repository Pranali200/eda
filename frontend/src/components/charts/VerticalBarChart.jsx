import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { getYearwiseValue } from "../../api"; // Adjust if your path differs

const VerticalBarChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchYearwiseValue = async () => {
      try {
        const rawData = await getYearwiseValue();
  
        // Transform to [{ year: "2021", value: 59204382048 }, ...]
        const yearlyTotals = rawData.map(item => ({
          year: item.Year, // Capital 'Y'
          value: item.allppg // key that holds the total
        }));
  
        setChartData(yearlyTotals);
      } catch (error) {
        console.error("Error fetching year-wise value:", error);
      }
    };
  
    fetchYearwiseValue();
  }, []);
  

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
        {/* <h2 className="text-lg font-bold mb-2">Sales Value (EURO)</h2> */}
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis tickFormatter={(val) => `${val / 1_000_000}M`} />
        <Tooltip formatter={(val) => `${(val / 1_000_000).toFixed(2)}M`} />
        <Bar dataKey="value" fill="#34D399" barSize={50} />
      </BarChart>
    </ResponsiveContainer>
    </div>
  );
};

export default VerticalBarChart;
