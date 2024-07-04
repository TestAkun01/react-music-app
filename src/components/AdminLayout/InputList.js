import React from "react";
import InputForm from "./InputForm";

export default function InputList({ data, set }) {
  const handleAddItem = () => {
    const newItem = {
      id: data.list.length + 1,
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
    updatedList.forEach((item, idx) => {
      item.id = idx + 1;
    });
    set({ ...data, list: updatedList });
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">List</label>
      {data.list.map((item, index) => (
        <div
          key={index}
          className="xl:grid xl:grid-cols-6 flex flex-col gap-4 py-2"
        >
          <InputForm
            title={`Item ${index + 1} ID`}
            target={"id"}
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
          <InputForm
            title={`Item ${index + 1} Duration`}
            target={"duration"}
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
        className="text-sm text-blue-500"
      >
        Add Track List
      </button>
    </div>
  );
}
