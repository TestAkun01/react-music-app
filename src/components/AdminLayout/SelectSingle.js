import React, { useEffect, useState } from "react";
import FetchData from "../FetchData/FetchData";
import Select from "react-select";

export default function SelectSingle({
  data,
  set,
  type,
  label,
  dependentData,
}) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      let url = `api/${type}`;
      if (dependentData) {
        url += `?artist=${dependentData}`;
      }
      const response = await FetchData(url);
      setItems(response);
    };

    if (type !== "track" || dependentData) {
      fetchItems();
    }
  }, [type, dependentData]);

  const handleChange = (selectedOption) => {
    if (!selectedOption) return;

    set({
      ...data,
      [type]: selectedOption.value,
    });
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "rgb(31 41 55)",
      border: 0,
      boxShadow: state.isFocused
        ? "0 1px 3px 0 rgba(118, 109, 244, 1), 0 1px 2px -1px rgba(118, 109, 244, 1)"
        : "none",
      "&:hover": {
        boxShadow:
          "0 1px 3px 0 rgba(118, 109, 244, 1), 0 1px 2px -1px rgba(118, 109, 244, 1)",
      },
      borderRadius: "0.375rem",
    }),
    menu: (provided) => ({
      ...provided,
      marginTop: 8,
      padding: 0,
      backgroundColor: "rgb(31 41 55)",
    }),
    menuList: (provided) => ({
      ...provided,
      padding: 0,

      boxShadow:
        "0 1px 3px 0 rgba(118, 109, 244, 1), 0 1px 2px -1px rgba(118, 109, 244, 1)",

      borderRadius: "0.375rem",
      backgroundColor: "rgb(31 41 55)",
    }),
    option: (provided) => ({
      ...provided,
      backgroundColor: "rgb(31 41 55)",
      border: 2,
      margin: 0,
      "&:hover": {
        backgroundColor: "#0d6efd",
        color: "white",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "rgb(250 250 250)",
    }),
    input: (provided) => ({
      ...provided,
      color: "rgb(250 250 250)",
    }),
  };

  return (
    <div className="mt-4">
      <label className="block text-sm font-medium">{label}</label>
      <Select
        options={items.map((item) => ({
          value: item.type,
          label: item.type,
        }))}
        onChange={handleChange}
        placeholder={
          data[type] ? data[type] : `Select a ${label.toLowerCase()}`
        }
        styles={customStyles}
        instanceId={type}
        aria-label={`single ${type}`}
      ></Select>
    </div>
  );
}
