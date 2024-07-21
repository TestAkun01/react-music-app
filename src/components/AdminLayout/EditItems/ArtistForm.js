"use client";

import React from "react";
import InputForm from "../InputForm";

export default function ArtistForm({
  formData,
  setFormData,
  handleSubmit,
  isSubmitting,
  message,
}) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputForm
        title={"Artist"}
        target={"artist"}
        data={formData}
        set={setFormData}
      />
      <InputForm
        title={"Image URL"}
        target={"image_url"}
        data={formData}
        set={setFormData}
      />
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