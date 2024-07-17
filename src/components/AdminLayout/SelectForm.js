import React, { useEffect, useState } from "react";
import FetchData from "../FetchData/FetchData";

export default function SelectForm({ data, set, type, label }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await FetchData(`api/${type}`);
      setItems(response);
    };
    fetchItems();
  }, [type]);

  const handleSelect = (e) => {
    const { value } = e.target;
    if (!value) return;

    const selectedItem = items.find((i) => i._id === value);
    if (!selectedItem) return;

    let isDuplicate =
      data[type] != []
        ? data[type].some((item) => item._id === selectedItem._id)
        : null;

    if (!isDuplicate) {
      set({
        ...data,
        [type]: [...data[type], selectedItem],
      });
    }
  };

  const handleRemove = (item) => {
    const updatedItems = data[type].filter((i) => i._id !== item._id);
    set({ ...data, [type]: updatedItems });
  };
  return (
    <div className="mt-4">
      <label className="block text-sm font-medium">{label}</label>
      <select
        className="mt-1 block w-full p-2 cursor-pointer rounded-md bg-gray-800 shadow shadow-[#766df4] focus:outline-none"
        onChange={handleSelect}
      >
        <option value="" className="focus:outline-none">
          Select a {label.toLowerCase()}
        </option>
        {items.map((item) => (
          <option key={item._id} value={item._id}>
            {item.artist || item.category}
          </option>
        ))}
      </select>
      <div className="mt-4">
        {data[type] != []
          ? data[type].map((item, index) => (
              <span
                key={index}
                className="inline-block bg-gray-800 text-gray-200 shadow shadow-[#766df4] border-0 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
              >
                {item.artist || item.category}
                <button
                  type="button"
                  className="ml-2"
                  onClick={() => handleRemove(item)}
                >
                  &#10005;
                </button>
              </span>
            ))
          : null}
      </div>
    </div>
  );
}
