import React from "react";

export default function InputForm({
  title,
  target,
  data,
  set,
  disable,
  style,
}) {
  const handleChange = (e) => {
    let { name, value } = e.target;
    set({ ...data, [name]: value });
  };

  return (
    <div className={style}>
      <label className="block text-sm font-medium text-gray-700">{title}</label>
      <input
        type="text"
        name={target}
        value={data[target]}
        onChange={handleChange}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        disabled={disable ? true : false}
      />
    </div>
  );
}
