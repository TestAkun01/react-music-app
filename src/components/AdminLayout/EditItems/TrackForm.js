"use client";

import React from "react";
import InputForm from "../InputForm";
import SelectForm from "../SelectForm";

export default function TrackForm({
  formData,
  setFormData,
  handleSubmit,
  isSubmitting,
  message,
}) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputForm
        title={"Album ID"}
        target={"album_id"}
        data={formData}
        set={setFormData}
        disable={true}
      />
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
      <InputForm
        title={"Duration"}
        target={"duration"}
        data={formData}
        set={setFormData}
      />
      <InputForm
        title={"File URL"}
        target={"file_url"}
        type="url"
        data={formData}
        set={setFormData}
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
