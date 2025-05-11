import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getMarketShare } from '../../api'; 

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#14b8a6', '#f43f5e', '#0ea5e9'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.4;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return percent > 0.03 ? (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12}>
      {(percent * 100).toFixed(0)}%
    </text>
  ) : null;
};

const MarketShareDonutChart = ({ filters, dimension = "SalesValue" }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadShare = async () => {
      try {
        const res = await getMarketShare({ ...filters, dimension });
        setData(res);
      } catch (err) {
        console.error("Error fetching market share:", err);
      }
    };
    loadShare();
  }, [filters, dimension]);

  return (
    <div className="w-full h-80 p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-2">Market Share by {dimension === "SalesValue" ? "Sales" : "Volume"}</h2>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="percentage"
            nameKey="Brand"
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={40}
            labelLine={false}
            label={renderCustomizedLabel}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend layout="vertical" verticalAlign="middle" align="right" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MarketShareDonutChart;
