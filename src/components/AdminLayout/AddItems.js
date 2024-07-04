"use client";

import React, { useState } from "react";
import InputForm from "./InputForm";
import SelectForm from "./SelectForm";
import InputList from "./InputList";

export default function AddItems() {
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    release_date: "",
    category: [],
    cover: "",
    list: [],
  });

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/add-song`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      console.log(formData);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      alert("Succes Add Song");
      console.log("Song added successfully!");
    } catch (error) {
      console.error("Error adding song:", error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputForm
        title={"Title"}
        target={"title"}
        data={formData}
        set={setFormData}
      ></InputForm>
      <InputForm
        title={"Artist"}
        target={"artist"}
        data={formData}
        set={setFormData}
      ></InputForm>
      <InputForm
        title={"Release date"}
        target={"release_date"}
        data={formData}
        set={setFormData}
      ></InputForm>
      <SelectForm data={formData} set={setFormData}></SelectForm>
      <InputForm
        title={"Cover Url"}
        target={"cover"}
        data={formData}
        set={setFormData}
      ></InputForm>
      <InputList data={formData} set={setFormData}></InputList>
      <div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Add Item
        </button>
      </div>
    </form>
  );
}
