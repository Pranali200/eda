import { Tooltip } from '@mui/material'
import React from 'react'
import { BarChart, ResponsiveContainer, XAxis, YAxis, Bar } from 'recharts'

const SalesBarChart = ({data}) =>{
    return (
        <div className='p-4 bg-white rounded-xl shadow-md'>
            <h2 className='text-lg font-bold mb-2'>Sales Value</h2>
            <ResponsiveContainer width ="100%" height ={300}>
                <BarChart data = {data}>
                    <XAxis dataKey='ppg'></XAxis>
                    <YAxis/>
                    <Tooltip/>
                    <Bar dataKey='sales_value' fill = '#4f46e5'></Bar>

                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
export default SalesBarChart