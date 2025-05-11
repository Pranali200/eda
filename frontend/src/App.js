import React, { useEffect, useState } from 'react';
import Filters from './components/Filters';
import { getFilterOptions, getMarketShare } from './api';
import SalesBarChart from './components/charts/SalesBarChart';
import MonthlyTrendLine from './components/charts/MonthlyTrendLine';
import VolumeBarChart from './components/charts/VolumeBarChart';
import MarketShareDonutChart from './components/charts/MarketShareDonutChart';
import VerticalBarChart from './components/charts/VerticalBarChart';

function App() {
  const [filters, setFilters] = useState({});
  const [options, setOptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [marketShare, setMarketShare] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const fetchedOptions = await getFilterOptions();
        setOptions(fetchedOptions);
      } catch (err) {
        setError('Failed to fetch filter options');
      }
    };
    fetchOptions();
  }, []);

  useEffect(() => {
    if (Object.keys(filters).length === 0) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const marketData = await getMarketShare(filters);
        setMarketShare(marketData);
      } catch (err) {
        setError('Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">EDA Dashboard</h1>
      {error && (
        <div className="bg-red-500 text-white p-3 rounded-md mb-4">
          {error}
        </div>
      )}

      <Filters options={options} selected={filters} setSelected={setFilters} />

      {loading ? (
        <div className="text-center text-xl">Loading data...</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          <SalesBarChart filters={filters} />
          <VolumeBarChart filters={filters} />
          <VerticalBarChart />
          <MonthlyTrendLine />
          <MarketShareDonutChart filters={filters} dimension="SalesValue" />
          <MarketShareDonutChart filters={filters} dimension="Volume" />
        </div>
      )}
    </div>
  );
}

export default App;
