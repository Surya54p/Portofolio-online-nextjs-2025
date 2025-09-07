"use client";

import { useEffect, useState } from "react";

interface ModalProps {
  ModalTitle: string;
  description: string;
  isOpen: boolean;
  onSubmit?: (data: { id?: string; title: string; src: string | null; summary: string }) => void;
  onClose: () => void;
  actions?: React.ReactNode;
  selectedData?: {
    id: string;
    title: string;
    src: string | null;
    summary: string;
    createdAt: Date | string;
  } | null;
}

export default function BasicModal({
  ModalTitle,
  description,
  isOpen,
  onClose,
  onSubmit,
  selectedData,
  actions,
}: ModalProps) {
  const [title, setTitle] = useState(selectedData?.title || "");
  const [src, setSrc] = useState(selectedData?.src || "");
  const [summary, setSummary] = useState(selectedData?.summary || "");

  useEffect(() => {
    setTitle(selectedData?.title || "");
    setSrc(selectedData?.src || "");
    setSummary(selectedData?.summary || "");
  }, [selectedData]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ id: selectedData?.id, title, src, summary });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-[750px]">
        <div className="flex items-center justify-between ">
          <h2 className="text-xl font-semibold ">{ModalTitle}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className=" rounded-md p-4 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {/* simple X icon (SVG) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 8.586L15.293 3.293a1 1 0 111.414 1.414L11.414 10l5.293 5.293a1 1 0 01-1.414 1.414L10 11.414l-5.293 5.293a1 1 0 01-1.414-1.414L8.586 10 3.293 4.707A1 1 0 014.707 3.293L10 8.586z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="mb-4">{description}</div>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
          {/* Title */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Certificate Title"
              className="border px-3 py-2 rounded"
            />
          </div>

          {/* Source */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold">Source</label>
            <input
              type="text"
              value={src ?? ""}
              onChange={(e) => setSrc(e.target.value)}
              placeholder="Source URL"
              className="border px-3 py-2 rounded"
            />
          </div>

          {/* Summary */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold">Summary</label>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Certificate Summary"
              className="border px-4 py-4 rounded min-h-[180px]"
            />
          </div>

          {/* CreatedAt ditampilkan saja, tidak bisa diubah */}
          {selectedData && (
            <div>
              <span className="font-semibold">Created At: </span>
              {new Date(selectedData.createdAt).toLocaleDateString()}
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between gap-2 mt-4">
            {actions ? (
              actions
            ) : (
              <>
                <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
                  Cancel
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
