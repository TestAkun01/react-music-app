"use client";

import React, { useState, useEffect } from "react";
import FetchData from "@/components/FetchData/FetchData";
import AlbumForm from "./AlbumForm";
import TrackForm from "./TrackForm";
import ArtistForm from "./ArtistForm";

export default function EditItems({ id, type }) {
  const [formData, setFormData] = useState(
    type === "album"
      ? {
          title: null,
          artist: [],
          type: null,
          release_date: null,
          category: [],
          cover: null,
          track: [],
        }
      : type === "track"
      ? {
          album_id: {},
          cover: null,
          artist: [],
          title: null,
          duration: null,
          file_url: null,
        }
      : {
          artist: null,
          image_url: null,
          biography: null,
        }
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  async function setForm() {
    const response = await FetchData(`api/${type}/${id}`);
    setFormData(response);
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
          !formData.type ||
          !formData.release_date ||
          formData.category.length === 0 ||
          !formData.cover ||
          formData.track.length === 0)) ||
      (type === "track" &&
        (!formData.title ||
          !formData.artist.length === 0 ||
          !formData.cover ||
          !formData.file_url)) ||
      (type === "artist" && (!formData.artist || !formData.image_url))
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
        />
      ) : type === "track" ? (
        <TrackForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          message={message}
        />
      ) : (
        <ArtistForm
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
