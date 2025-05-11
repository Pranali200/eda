import axios from 'axios';

const BASE_URL = "http://localhost:8000/api";

export const getRetailData = async (filters) => {
    const res = await axios.get(`${BASE_URL}/filtered-data/`, { params: filters });
    return res.data;
};

export const getYearlyTrend = async () => {
    const res = await axios.get(`${BASE_URL}/yearly-trend/`);
    return res.data;
};

export const getFilterOptions = async () => {
    const res = await axios.get(`${BASE_URL}/filter-options/`);
    return res.data;
};

export const getYearwiseValue = async () => {
    const res = await axios.get(`${BASE_URL}/yearwise-value/`);
    console.log("yearwise data",res.data )
    return res.data;
};

export const getMarketShare = async (filters) => {
    const res = await axios.get(`${BASE_URL}/market-share/`, { params: filters });
    return res.data;
};
