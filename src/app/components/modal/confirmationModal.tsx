"use client";

import { useEffect, useState } from "react";

interface ModalProps {
  ModalTitle: string;
  description: string;
  isOpen: boolean;
  onSubmit?: (data: { id?: string; title: string }) => void;
  onClose: () => void;
  actions?: React.ReactNode;
  selectedData?: {
    id: string;
    title: string;
  } | null;
}

export default function ConfirmationModal({
  ModalTitle,
  description,
  isOpen,
  onClose,
  onSubmit,
  selectedData,
}: ModalProps) {
  const [inputValue, setInputValue] = useState("");
  const isMatch = inputValue === selectedData?.title;
  // Reset input kalau ganti data atau buka modal baru
  useEffect(() => {
    setInputValue("");
  }, [selectedData, isOpen]);
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isMatch) {
      onSubmit?.({ id: selectedData?.id, title: selectedData?.title ?? "" });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-[750px]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{ModalTitle}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-md p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 8.586L15.293 3.293a1 1 0 111.414 1.414L11.414 10l5.293 5.293a1 1 0 01-1.414 1.414L10 11.414l-5.293 5.293a1 1 0 01-1.414-1.414L8.586 10 3.293 4.707A1 1 0 014.707 3.293L10 8.586z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <p className="mb-4">
          {description} <strong>{selectedData?.title}</strong>
        </p>

        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={`Type "${selectedData?.title}" to confirm`}
            className="border px-3 py-2 rounded"
          />

          <div className="flex justify-between gap-2 mt-4">
            <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
              Cancel
            </button>

            <button
              type="submit"
              disabled={!isMatch}
              className={`px-4 py-2 rounded text-white ${
                isMatch ? "bg-red-500 hover:bg-red-600" : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
