import { useCallback, useMemo, useState } from "react";
import { Upload, FileText, Image as ImageIcon } from "lucide-react";

export default function UploadStep({ file, setFile }) {
  const [isDragging, setIsDragging] = useState(false);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f) handleFileSelect(f);
  }, []);

  const handleFileSelect = (f) => {
    const allowed = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "image/tiff",
    ];
    if (!allowed.includes(f.type)) {
      alert("Please upload a PDF, DOCX, or image file (PNG/JPG/WEBP/TIFF).");
      return;
    }
    setFile(Object.assign(f, { preview: URL.createObjectURL(f) }));
  };

  const fileKind = useMemo(() => {
    if (!file) return null;
    if (file.type === "application/pdf") return "pdf";
    if (file.type.includes("wordprocessingml")) return "docx";
    if (file.type.startsWith("image/")) return "image";
    return "file";
  }, [file]);

  return (
    <section className="w-full">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        className={
          "relative flex flex-col items-center justify-center rounded-2xl border border-dashed p-8 sm:p-12 transition " +
          (isDragging
            ? "border-[#0F3460] bg-[#0F3460]/5"
            : "border-gray-300 bg-white")
        }
      >
        <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-[#0F3460]/10 text-[#0F3460]">
          <Upload className="h-7 w-7" />
        </div>
        <h2 className="mt-4 text-lg font-semibold text-gray-900 text-center">
          Upload your certificate (PDF, DOCX, or Image)
        </h2>
        <p className="mt-1 text-sm text-gray-600 text-center">
          Drag & drop your file here, or click to browse.
        </p>
        <input
          type="file"
          accept=".pdf,.docx,image/png,image/jpeg,image/webp,image/tiff"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFileSelect(f);
          }}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />

        {file && (
          <div className="mt-6 w-full max-w-2xl">
            <div className="rounded-xl border bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700">
                  {fileKind === "image" ? (
                    <ImageIcon className="h-6 w-6" />
                  ) : (
                    <FileText className="h-6 w-6" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-gray-900">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type}
                  </p>
                </div>
                <button
                  className="ml-auto text-sm text-[#0F3460] hover:underline"
                  onClick={() => setFile(null)}
                >
                  Remove
                </button>
              </div>
              {fileKind === "image" && (
                <div className="mt-4 overflow-hidden rounded-lg border">
                  <img
                    src={file.preview}
                    alt="Uploaded preview"
                    className="max-h-80 w-full object-contain bg-gray-50"
                  />
                </div>
              )}
              {fileKind === "pdf" && (
                <div className="mt-4 overflow-hidden rounded-lg border bg-gray-50">
                  <div className="p-4 text-sm text-gray-600">
                    PDF preview support is limited in-browser. The system will render high-resolution pages during processing.
                  </div>
                </div>
              )}
              {fileKind === "docx" && (
                <div className="mt-4 overflow-hidden rounded-lg border bg-gray-50">
                  <div className="p-4 text-sm text-gray-600">
                    DOCX detected. The system will extract text and preserve layout during rendering.
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
