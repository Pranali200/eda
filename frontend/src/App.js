import React, {useEffect, useState} from 'react'
import Filters from "./components/Filters";
import { getRetailData, getFilterOptions } from "./api";
import SalesBarChart from "./components/charts/SalesBarChart";
import MarketSharePie from './components/charts/MarketSharePie';
import MonthlyTrendLine from './components/charts/MonthlyTrendLine';
import YearlyValueBar from './components/charts/YearlyValueBar';
import VolumeBarChart from './components/charts/VolumeBarChart';
function App() {
  const [filters, setFilters] = useState({});
  const [options, setOptions] = useState({});
  const [data, setData] = useState([]);

  useEffect(() =>{
    getFilterOptions().then(setOptions);
  },[])

  useEffect(() =>{
    getRetailData(filters).then(setData)
  },[filters])
   
  return (
    <div className='min-h-screen bg-gray-100 p-6 space-y-6'>
      <h1 className='text-3xl font-bold text-center'>EDA Dashboard</h1>
      <Filters options={options} selected={filters} setSelected ={setFilters}></Filters>
      <div className=" grid md:grid-cols-2 gap-6">
      <SalesBarChart data = {data}/>
      <VolumeBarChart data={data} /> 
<YearlyValueBar data={data} />
<MonthlyTrendLine data={data} />
<MarketSharePie data={data} />
      </div>
    </div>
  );
}

export default App;