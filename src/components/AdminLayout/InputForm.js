import React from "react";

export default function InputForm({
  title,
  type = "text",
  target,
  data,
  set,
  disable = false,
  style,
}) {
  const handleChange = (e) => {
    let { name, value } = e.target;
    set({ ...data, [name]: value });
  };

  return (
    <div className={style}>
      <label className="block text-sm font-medium">{title}</label>
      <input
        type={type}
        name={target}
        value={data[target]}
        onChange={handleChange}
        className="mt-1 block w-full p-2 bg-gray-800 shadow shadow-[#766df4] text-neutral-50 rounded-md focus:outline-none"
        disabled={disable}
      />
    </div>
  );
}
