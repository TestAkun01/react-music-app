import React, { useEffect } from "react";
import InputForm from "./InputForm";
import SelectForm from "./SelectForm";

export default function InputList({ data, set, setDeletedData, deletedData }) {
  const handleAddItem = () => {
    const newItem = {
      _id: "",
      title: "",
    };
    set({
      ...data,
      list: [...data.list, newItem],
    });
  };

  const handleRemoveItem = (index) => {
    const updatedList = [...data.list];
    const deletedItem = updatedList.splice(index, 1);
    deletedItem[0].title == ""
      ? null
      : setDeletedData([...deletedData, deletedItem[0]._id]);
    set({ ...data, list: updatedList });
  };

  return (
    <div>
      <label className="block text-sm font-medium">List</label>
      <SelectForm
        data={data.list}
        set={handleAddItem}
        type={"track"}
        label={"Track"}
      ></SelectForm>
      {data.list.map((item, index) => (
        <div key={index} className="flex md:flex-row flex-col gap-4 py-2">
          <InputForm
            title={`Item ${index + 1} _ID`}
            target={"_id"}
            data={item}
            set={(updatedItem) => {
              const updatedList = [...data.list];
              updatedList[index] = updatedItem;
              set({ ...data, list: updatedList });
            }}
            disable={true}
          />

          <InputForm
            title={`Item ${index + 1} Title`}
            target={"title"}
            data={item}
            set={(updatedItem) => {
              const updatedList = [...data.list];
              updatedList[index] = updatedItem;
              set({ ...data, list: updatedList });
            }}
          />
          <button
            type="button"
            className=" text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 mt-auto"
            onClick={() => handleRemoveItem(index)}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddItem}
        className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 my-2 "
      >
        Add Track List
      </button>
    </div>
  );
}
