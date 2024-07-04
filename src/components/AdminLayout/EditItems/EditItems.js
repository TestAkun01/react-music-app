"use client";

import React, { useState, useEffect } from "react";
import InputForm from "../InputForm";
import SelectForm from "../SelectForm";
import InputList from "../InputList";

export default function EditItems({ id }) {
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    release_date: "",
    category: [],
    cover: "",
    list: [],
  });

  useEffect(() => {
    if (id) {
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/song/${id}`)
        .then((response) => response.json())
        .then((data) => setFormData(data))
        .catch((error) => console.error("Error fetching item:", error));
    }
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.artist ||
      !formData.release_date ||
      formData.category.length === 0 ||
      !formData.cover ||
      formData.list.length === 0
    ) {
      alert("Harap lengkapi semua field sebelum mengirimkan data.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/song/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Item updated successfully");
      } else {
        const errorData = await response.json();
        alert(`Failed to update item: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error updating item:", error);
      alert("Failed to update item");
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
        type="date"
        data={formData}
        set={setFormData}
      ></InputForm>
      <SelectForm data={formData} set={setFormData}></SelectForm>
      <InputForm
        title={"Cover Url"}
        target={"cover"}
        type="url"
        data={formData}
        set={setFormData}
      ></InputForm>
      <InputList data={formData} set={setFormData}></InputList>
      <div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
