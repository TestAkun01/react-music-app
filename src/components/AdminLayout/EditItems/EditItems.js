"use client";

import React, { useState, useEffect } from "react";
import InputForm from "../InputForm";
import SelectForm from "../SelectForm";
import InputList from "../InputList";
import FetchData from "@/components/FetchData/FetchData";

export default function EditItems({ id }) {
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    release_date: "",
    category: [],
    cover: "",
    list: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (id) {
      FetchData(`api/album/${id}`)
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

    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await FetchData(`api/album/${id}`, "", "PUT", formData);

      if (!response) {
        throw new Error("Network response was not ok");
      }

      alert("Item updated successfully");
      setMessage("Item updated successfully");
    } catch (error) {
      console.error("Error updating item:", error);
      setMessage("Failed to update item. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputForm
        title={"Title"}
        target={"title"}
        data={formData}
        set={setFormData}
      />
      <InputForm
        title={"Artist"}
        target={"artist"}
        data={formData}
        set={setFormData}
      />
      <InputForm
        title={"Release date"}
        target={"release_date"}
        type="date"
        data={formData}
        set={setFormData}
      />
      <SelectForm data={formData} set={setFormData} />
      <InputForm
        title={"Cover Url"}
        target={"cover"}
        type="url"
        data={formData}
        set={setFormData}
      />
      <InputList data={formData} set={setFormData} />
      <div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Save Changes"}
        </button>
      </div>
      {message && <p>{message}</p>}
    </form>
  );
}
