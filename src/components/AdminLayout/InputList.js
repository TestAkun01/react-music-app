import React from "react";
import InputForm from "./InputForm";

export default function InputList({ data, set }) {
  const handleAddItem = () => {
    const newItem = {
      title: "",
      duration: "",
      file_url: "",
    };
    set({
      ...data,
      list: [...data.list, newItem],
    });
  };

  const handleRemoveItem = (index) => {
    const updatedList = [...data.list];
    updatedList.splice(index, 1);
    set({ ...data, list: updatedList });
  };

  return (
    <div>
      <label className="block text-sm font-medium">List</label>
      {data.list.map((item, index) => (
        <div
          key={index}
          className="xl:grid xl:grid-cols-6 flex flex-col gap-4 py-2"
        >
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
          <InputForm
            title={`Item ${index + 1} Duration`}
            target={"duration"}
            type="number"
            data={item}
            set={(updatedItem) => {
              const updatedList = [...data.list];
              updatedList[index] = updatedItem;
              set({ ...data, list: updatedList });
            }}
          />
          <InputForm
            title={`Item ${index + 1} File URL`}
            target={"file_url"}
            data={item}
            type="url"
            set={(updatedItem) => {
              const updatedList = [...data.list];
              updatedList[index] = updatedItem;
              set({ ...data, list: updatedList });
            }}
            style={"col-span-2"}
          />

          <div className="lg:relative">
            <button
              type="button"
              className=" text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5  lg:absolute lg:bottom-0"
              onClick={() => handleRemoveItem(index)}
            >
              Remove
            </button>
          </div>
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
