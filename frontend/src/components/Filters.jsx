import React from "react";

const Filters = ({ options, selected, setSelected }) => {
  const handleReset = () => {
    const resetValues = Object.fromEntries(
      Object.keys(options).map((key) => [key, ""])
    );
    setSelected(resetValues);
  };

  return (
    <div className="flex items-end justify-between gap-4 p-4 rounded-xl flex-wrap md:flex-nowrap">
      {/* Filters section */}
      <div className="flex flex-1 gap-4 flex-wrap justify-between">
        {Object.keys(options).map((key) => (
          <div key={key} className="flex flex-col min-w-[150px] flex-1">
            <label className="mb-1 font-medium text-sm text-gray-700">
              {key.toUpperCase()}
            </label>
            <select
              value={selected[key] || ""}
              onChange={(e) =>
                setSelected({ ...selected, [key]: e.target.value })
              }
              className="p-2 border rounded-md"
            >
              <option value="">All</option>
              {options[key].map((val) => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Reset button */}
      <div className="flex-shrink-0">
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-200 text-black rounded "
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default Filters;
