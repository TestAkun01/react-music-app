"use client";

import React, { useState, useEffect } from "react";
import InputForm from "../InputForm";
import SelectForm from "../SelectForm";
import SelectSingle from "../SelectSingle";

export default function AlbumForm({
  formData,
  setFormData,
  handleSubmit,
  isSubmitting,
  message,
}) {
  const [selectedArtist, setSelectedArtist] = useState("");

  useEffect(() => {
    if (formData.artist) {
      const artist = formData.artist.map((artist) => artist.artist).join(",");
      setSelectedArtist(artist);
    }
  }, [formData.artist]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputForm
        title={"Title"}
        target={"title"}
        data={formData}
        set={setFormData}
      />
      <SelectForm
        data={formData}
        set={setFormData}
        type="artist"
        label="Artist"
      />
      <SelectSingle
        data={formData}
        set={setFormData}
        type={"type"}
        label={"Type"}
      />
      <InputForm
        title={"Release date"}
        target={"release_date"}
        type="date"
        data={formData}
        set={setFormData}
      />
      <SelectForm
        data={formData}
        set={setFormData}
        type="category"
        label="Category"
      />
      <SelectForm
        data={formData}
        set={setFormData}
        type="track"
        label="Tracks"
        dependentData={selectedArtist}
      />
      <InputForm
        title={"Cover Url"}
        target={"cover"}
        type="url"
        data={formData}
        set={setFormData}
      />
      <div>
        <button
          type="submit"
          className="bg-blue-600 text-md font-semibold text-white px-4 py-2 rounded-md"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Save Changes"}
        </button>
      </div>
      {message && <p>{message}</p>}
    </form>
  );
}
