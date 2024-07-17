"use client";

import React, { useState, useEffect } from "react";
import FetchData from "@/components/FetchData/FetchData";
import AlbumForm from "./AlbumForm";
import TrackForm from "./TrackForm";

export default function EditItems({ id, type }) {
  const [formData, setFormData] = useState(
    type === "album"
      ? {
          title: "",
          artist: [],
          release_date: "",
          category: [],
          cover: "",
          list: [],
        }
      : {
          title: "",
          artist: [],
          album_id: "",
          cover: "",
          duration: "",
          file_url: "",
        }
  );
  const [deletedData, setDeletedData] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  async function setForm() {
    const response = await FetchData(`api/${type}/${id}`);
    const data = response.data ? response.data : response;
    setFormData(data);
  }

  useEffect(() => {
    setForm();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      (type === "album" &&
        (!formData.title ||
          formData.artist.length === 0 ||
          !formData.release_date ||
          formData.category.length === 0 ||
          !formData.cover ||
          formData.list.length === 0)) ||
      (type === "track" &&
        (!formData.title ||
          !formData.artist ||
          !formData.album_id ||
          !formData.cover ||
          !formData.file_url))
    ) {
      alert("Harap lengkapi semua field sebelum mengirimkan data.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await FetchData(
        `api/${type}/${id}`,
        "",
        "PUT",
        formData
      );
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
      setForm();
    }
  }

  return (
    <>
      {type === "album" ? (
        <AlbumForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          message={message}
          deletedData={deletedData}
          setDeletedData={setDeletedData}
        />
      ) : (
        <TrackForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          message={message}
        />
      )}
    </>
  );
}
