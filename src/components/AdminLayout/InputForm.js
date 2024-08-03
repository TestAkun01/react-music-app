import React, { useEffect, useState } from "react";

export default function InputForm({
  title,
  type = "text",
  target,
  data,
  set,
  disable = false,
}) {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const value =
      target === "album_id" ? data[target]?._id || "" : data[target] || "";
    setInputValue(value);
  }, [data, target]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    set({ ...data, [name]: value });
    setInputValue(value);
  };

  return (
    <div>
      <label className="block text-sm font-medium">{title}</label>
      <input
        type={type}
        name={target}
        value={inputValue}
        onChange={handleChange}
        className="mt-1 block w-full p-2 bg-gray-800 text-neutral-50 rounded-md focus:outline-none hover:shadow hover:shadow-[#766df4] focus:shadow focus:shadow-[#766df4] transition duration-300 ease-in-out"
        disabled={disable}
        aria-label={`input ${type}`}
      />
    </div>
  );
}
