import { Tooltip } from "@mui/material"
import { BarChart, ResponsiveContainer, XAxis, YAxis, Bar } from "recharts"

const VolumeBarChart = ({data}) =>{
    return (
        <div className="w-full h-64">
            <h2 className="text-xl font-semibold mb-2">Volumn Contribution (lbs)</h2>
            <ResponsiveContainer width = "100%" height ="100%">
                <BarChart layout ="vertical" daat = {data}>
                    <XAxis type = 'number'/>
                    <YAxis type = 'number'/>
                    <Tooltip/>
                    <Bar dataKey = "volumn" fill = "#34d399"/>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default VolumeBarChart

