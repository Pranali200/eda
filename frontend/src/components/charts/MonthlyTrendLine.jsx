import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import { getYearlyTrend } from "../../api";
import moment from "moment";

const MonthlyTrendLine = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getYearlyTrend().then((res) => {
      const formatted = res.map((item) => ({
        month: moment(item.month).format("MMM YYYY"), 
        value: item.value / 1_000_000,
      }));
      setData(formatted);
    });
  }, []);

  const formatYAxis = (tick) => `${tick}M`;

  return (
    <div className="w-full h-80 p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-2">Monthly Value Trend</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={formatYAxis} />
          <Tooltip
            formatter={(value) => [`${value.toFixed(2)}M`, "Value"]}
            labelFormatter={(label) => `Month: ${label}`}
          />
          <Line type="monotone" dataKey="value" stroke="#facc15" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyTrendLine;
