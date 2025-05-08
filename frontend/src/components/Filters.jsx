
import React  from "react";

const Filters = ({options, selected, setSelected}) =>{
    return (
        <div className="grid grid-cols-2 gap-4 p-4 bg-white rounded-xl shadow-md">
            {Object.keys(options).map((key) =>(
                <div key = {key}>
                    <label className="block mb-1 font-medium">{key.toUpperCase()}</label>
                    <select value = {selected[key] || ""}
                    onChange = {(e) =>setSelected({...selected, [key]:e.target.value})}
                    className = "w-full p-2 border rounded">
                        <option value = "">All</option>
                        {options[key].map((val) =>(
                            <option key = {val} value = {val}>{val}</option>
                        ))}
                    </select>
                    </div>
            ))}
        </div>
    )
}
export default Filters 

