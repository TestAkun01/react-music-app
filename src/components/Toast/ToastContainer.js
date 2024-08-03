"use client";

import React, { useState } from "react";
import Toast from "./Toast";

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  function addToast(message, type) {
    setToasts([...toasts, { message, type }]);
    setTimeout(() => {
      setToasts((toasts) => toasts.slice(1));
    }, 3000);
  }

  return (
    <div className="fixed bottom-0 left-0 flex flex-col items-start p-4 z-50">
      {toasts.map((toast, index) => (
        <Toast
          key={index}
          message={toast.message}
          type={toast.type}
          onClose={() => setToasts(toasts.filter((_, i) => i !== index))}
        />
      ))}
      <button onClick={() => addToast("This is a success toast!", "success")}>
        Add Success Toast
      </button>
      <button onClick={() => addToast("This is an error toast!", "error")}>
        Add Error Toast
      </button>
      <button onClick={() => addToast("This is an info toast!", "info")}>
        Add Info Toast
      </button>
    </div>
  );
}
