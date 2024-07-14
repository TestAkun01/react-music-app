"use client";

import React, { useState } from "react";
import InputForm from "../InputForm";
import SelectForm from "../SelectForm";
import InputList from "../InputList";
import FetchData from "@/components/FetchData/FetchData";

export default function AddItems() {
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
      const response = await FetchData(`api/album`, "", "POST", formData);

      if (!response) {
        throw new Error("Network response was not ok");
      }

      alert("Song added successfully!");
      setFormData({
        title: "",
        artist: "",
        release_date: "",
        category: [],
        cover: "",
        list: [],
      });
      setMessage("Song added successfully!");
    } catch (error) {
      console.error("Error adding song:", error);
      setMessage("Error adding song. Please try again.");
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
          {isSubmitting ? "Submitting..." : "Add Item"}
        </button>
      </div>
      {message && <p>{message}</p>}
    </form>
  );
}
