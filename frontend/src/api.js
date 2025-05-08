
import axios from 'axios'

const BASE_URL ="http://localhost:8000/api";

export const getRetailData = async(filters) =>{
    const res = await axios.get(`${BASE_URL}/data/`, {params: filters});
    return res.data

}
export const getFilterOptions = async () =>{
    const res = await axios.get(`${ BASE_URL}/filters/`)
    return res.data
}