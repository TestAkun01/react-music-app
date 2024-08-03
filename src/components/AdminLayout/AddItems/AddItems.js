"use client";

import React, { useState } from "react";
import TrackForm from "../EditItems/TrackForm";
import ArtistForm from "../EditItems/ArtistForm";
import AlbumForm from "../EditItems/AlbumForm";
import FetchData from "@/components/FetchData/FetchData";

export default function AddItems({ type }) {
  const [formData, setFormData] = useState(
    type === "album"
      ? {
          title: "",
          artist: [],
          type: "",
          release_date: "",
          category: [],
          cover: "",
          track: [],
        }
      : type === "track"
      ? {
          title: "",
          artist: [],
          album_id: "",
          cover: "",
          duration: "",
          file_url: "",
        }
      : {
          artist: "",
          image_url: "",
          biography: "",
        }
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

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
          !formData.file_url)) ||
      (type === "artist" && (!formData.artist || !formData.image_url))
    ) {
      alert("Harap lengkapi semua field sebelum mengirimkan data.");
      return;
    }
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await FetchData(`api/${type}`, "", "POST", formData);
      if (!response) {
        throw new Error("Network response was not ok");
      }

      alert("Item added successfully");
      setMessage("Item added successfully");
    } catch (error) {
      console.error("Error adding item:", error);
      setMessage("Failed to add item. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-4">
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
    </div>
  );
}
