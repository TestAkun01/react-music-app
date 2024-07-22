import React, { useRef, useEffect } from "react";

export default function TextAreaForm({
  title,
  target,
  data,
  set,
  disable = false,
  style,
}) {
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    set({ ...data, [name]: value });
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [data[target]]);

  return (
    <div className={style}>
      <label className="block text-sm font-medium">{title}</label>
      <textarea
        ref={textareaRef}
        name={target}
        value={data[target] ? data[target] : ""}
        onChange={handleChange}
        className="mt-1 block w-full p-2 bg-gray-800 text-neutral-50 rounded-md focus:outline-none hover:shadow hover:shadow-[#766df4] focus:shadow focus:shadow-[#766df4] transition duration-300 ease-in-out"
        disabled={disable}
        rows="1"
        style={{ resize: "none", overflow: "hidden" }}
      />
    </div>
  );
}
