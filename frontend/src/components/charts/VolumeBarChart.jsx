import { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import { BarChart, ResponsiveContainer, XAxis, YAxis, Bar, LabelList } from "recharts";
import { getRetailData } from "../../api";

const VolumeBarChart = ({ filters }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!filters || Object.keys(filters).length === 0) return;

    const fetchVolumeData = async () => {
      setLoading(true);
      try {
        const retailData = await getRetailData(filters);
        const volumeData = retailData?.volume_by_year || {};
        const formattedData = Object.entries(volumeData).map(([name, volume]) => ({
          name,
          volume,
        }));

        setData(formattedData);
        setError(null);
      } catch (err) {
        setError("Failed to load volume data.");
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVolumeData();
  }, [filters]);

  return (
    <div className="w-full h-80 p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Volume Contribution (lbs)</h2>

      {error && <div className="text-red-500 mb-2">{error}</div>}
      {loading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
          >
           <XAxis
             type="number"
              tickFormatter={(value) => `${(value / 1_000_000)}M`}
          />
            <YAxis dataKey="name" type="category" />
            <Tooltip />
            <Bar dataKey="volume" fill="#34d399">
              <LabelList dataKey="volume" position="right" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default VolumeBarChart;
