import React, { useEffect, useState } from "react";
import FetchData from "../FetchData/FetchData";

export default function SelectForm({ data, set }) {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await FetchData(`api/category`);
      setCategory(response);
    };

    fetchCategories();
  }, []);

  const handleCategorySelect = (e) => {
    const { value } = e.target;
    if (!value) return;
    if (!data.category.includes(value)) {
      set({
        ...data,
        category: [...data.category, value],
      });
    }
  };
  const handleCategoryRemove = (category) => {
    const updatedCategories = data.category.filter((cat) => cat !== category);
    set({ ...data, category: updatedCategories });
  };

  return (
    <div className="mt-4">
      <label className="block text-sm font-medium">Category</label>
      <select
        className="mt-1 block w-full p-2 cursor-pointer rounded-md bg-gray-800 shadow shadow-[#766df4] focus:outline-none"
        onChange={handleCategorySelect}
      >
        <option value="" className="focus:outline-none">
          Select a category
        </option>
        {category
          .filter((cat) => cat.category !== "All")
          .map((cat) => (
            <option key={cat._id} value={cat.category}>
              {cat.category}
            </option>
          ))}
      </select>
      <div className="mt-4">
        {data.category.map((category, index) => (
          <span
            key={index}
            className="inline-block bg-gray-800 text-gray-200 shadow shadow-[#766df4] border-0 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
          >
            {category}
            <button
              type="button"
              className="ml-2"
              onClick={() => handleCategoryRemove(category)}
            >
              &#10005;
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
