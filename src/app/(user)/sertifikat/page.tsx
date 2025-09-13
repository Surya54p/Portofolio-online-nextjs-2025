"use client";
import { useEffect, useState } from "react";

interface Info {
  id: string;
  img?: string;
  title: string;
  summary: string;
  category: string;
  createdAt?: string;
}

export default function Sertifikat() {
  const [certificate, setCertificate] = useState<Info[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCert, setSelectedCert] = useState<Info | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resCertificate = await fetch("/api/certificate/userCertificate");
        const dataCertif = await resCertificate.json();
        setCertificate(dataCertif);
      } catch (error) {
        console.error("⚠️ Error fetching data certificate:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mx-auto">
      <div className="text-center font-semibold text-[48px]">My Certificate</div>

      {/* List Card */}
      {loading ? (
        <div className="mt-6 text-center">Loading...</div>
      ) : (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 justify-items-center">
          {certificate.map((c) => (
            <div
              key={c.id}
              onClick={() => setSelectedCert(c)}
              className="cursor-pointer border rounded-lg p-3 w-full shadow hover:shadow-lg transition"
            >
              <img
                src={c.img ?? "https://via.placeholder.com/400x200"}
                alt={c.title}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="mt-2 font-semibold">{c.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{c.summary}</p>
              <span className="text-xs bg-gray-200 px-2 py-1 rounded mt-1 inline-block">{c.category}</span>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedCert && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-[90%] overflow-hidden shadow-lg relative">
            {/* Gambar */}
            <div className="relative bg-black flex items-center justify-center">
              <img
                src={selectedCert.img ?? "https://via.placeholder.com/600x300"}
                alt={selectedCert.title}
                className="w-full max-h-80 object-contain"
              />
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-3 right-3 bg-gray-200 hover:bg-gray-300 rounded-full p-2"
              >
                ✕
              </button>
            </div>

            {/* Konten */}
            <div className="p-4 space-y-3">
              <h2 className="text-xl font-semibold">{selectedCert.title}</h2>
              <div className="flex gap-3 text-sm text-gray-500">
                <span>
                  {selectedCert.createdAt ? new Date(selectedCert.createdAt).toLocaleDateString() : "No date"}
                </span>
                <span className="px-2 py-1 bg-gray-200 rounded text-xs">{selectedCert.category}</span>
              </div>
              <p className="text-gray-700 whitespace-pre-line">{selectedCert.summary}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
