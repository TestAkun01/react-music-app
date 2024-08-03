import React, { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";

export default function Toast({ message, type, onClose, duration = 3000 }) {
  const [width, setWidth] = useState(100);
  const [show, setShow] = useState(true);

  const typeClasses = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };

  const typeIcons = {
    success: <CheckCircleIcon className="text-green-500" />,
    error: <ErrorIcon className="text-red-500" />,
    info: <InfoIcon className="text-blue-500" />,
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setWidth((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          setShow(false);
          setTimeout(onClose, 300);
          return 0;
        }
        return prev - 100 / (duration / 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [duration, onClose]);

  return (
    <div
      className={`relative flex items-center gap-2 p-4 w-[350px] max-w-xs text-white rounded-lg shadow bg-black cursor-pointer transition-transform duration-300 transform ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      onClick={onClose}
    >
      <div className="text-xl">{typeIcons[type]}</div>
      <div className="text-sm font-normal flex-grow">{message}</div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-2 right-2 text-white hover:text-gray-300 p-1"
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <CloseIcon className="w-4 h-4" />
      </button>
      <div className="absolute bottom-0 left-0 h-1 w-full">
        <div
          className={`h-1 ${typeClasses[type]}`}
          style={{ width: `${width}%`, transition: "width 0.1s linear" }}
        />
      </div>
    </div>
  );
}
