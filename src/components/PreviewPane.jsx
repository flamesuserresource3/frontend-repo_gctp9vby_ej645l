import { useMemo, useRef, useState, useEffect } from "react";
import { Download } from "lucide-react";

export default function PreviewPane({ file, options, letterhead }) {
  const [slider, setSlider] = useState(50);
  const containerRef = useRef(null);

  const isImage = useMemo(() => file && file.type?.startsWith("image/"), [file]);

  useEffect(() => {
    return () => {
      // Revoke object URLs on unmount
      if (file?.preview) URL.revokeObjectURL(file.preview);
      if (letterhead?.preview) URL.revokeObjectURL(letterhead.preview);
    };
  }, [file, letterhead]);

  const handleGenerate = (kind) => {
    alert(
      `${kind.toUpperCase()} generation will be performed on the server with layout-preserving rendering, 300 DPI, and overlays. This UI is ready – connect it to the backend endpoints to enable downloads.`
    );
  };

  const arabicSample = "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ — هذه نسخة عربية مطابقة للأصل مع الحفاظ على التخطيط والعناصر البصرية.";

  return (
    <section className="w-full">
      <div className="rounded-2xl border bg-white p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Before & After Preview</h3>
            <p className="text-sm text-gray-600">Drag the handle to compare the original and the Arabic-rendered layout.</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleGenerate("pdf")}
              className="inline-flex items-center gap-2 rounded-lg bg-[#0F3460] px-4 py-2 text-sm font-medium text-white hover:opacity-95"
            >
              <Download className="h-4 w-4" /> PDF (Print‑ready)
            </button>
            <button
              onClick={() => handleGenerate("docx")}
              className="inline-flex items-center gap-2 rounded-lg border border-[#0F3460] px-4 py-2 text-sm font-medium text-[#0F3460] hover:bg-[#0F3460]/5"
            >
              <Download className="h-4 w-4" /> DOCX (Editable)
            </button>
          </div>
        </div>

        <div ref={containerRef} className="relative mt-6 aspect-[4/3] w-full overflow-hidden rounded-xl border bg-gray-50">
          {/* Base: original */}
          <div className="absolute inset-0 grid place-items-center">
            {isImage && file?.preview ? (
              <img src={file.preview} alt="Original" className="max-h-full max-w-full object-contain" />
            ) : (
              <div className="text-center px-6">
                <div className="text-sm text-gray-700 font-medium">Original document</div>
                <div className="mt-2 text-xs text-gray-500">Upload a supported file to see live preview. PDFs/DOCX will render on the server for fidelity.</div>
              </div>
            )}
          </div>

          {/* Letterhead overlay (behind Arabic layer) */}
          {letterhead?.preview && (
            <img
              src={letterhead.preview}
              alt="Letterhead"
              className="pointer-events-none absolute inset-0 h-full w-full object-contain opacity-90"
            />
          )}

          {/* Top: Arabic-rendered mask */}
          <div
            className="absolute inset-0"
            style={{ width: `${slider}%`, overflow: "hidden" }}
            aria-hidden
          >
            <div className="absolute inset-0 grid place-items-center bg-white/0">
              {isImage && file?.preview ? (
                <div className="relative">
                  <img src={file.preview} alt="Arabic Layout" className="max-h-full max-w-full object-contain opacity-0" />
                  {/* Simulated Arabic text overlay */}
                  <div
                    className="pointer-events-none absolute inset-0 grid place-items-center p-6"
                    style={{ direction: "rtl", fontFamily: options.font }}
                  >
                    <div className="max-w-prose rounded-xl bg-white/80 p-4 shadow ring-1 ring-black/5">
                      <p className="text-[18px] leading-8 text-gray-900">{arabicSample}</p>
                      {options.verifiedFooter && (
                        <p className="mt-3 text-xs text-gray-600">
                          تم التحقق من الترجمة بواسطة {options.verifier || "جهتكم"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center px-6">
                  <div className="text-sm text-gray-700 font-medium">Arabic layout mock</div>
                  <div className="mt-2 text-xs text-gray-500">When connected to the backend, this area will display the layout‑preserved Arabic rendition.</div>
                </div>
              )}
            </div>
          </div>

          {/* Watermark */}
          {options.watermark === "standard" && (
            <div className="pointer-events-none absolute inset-0 grid place-items-center">
              <div className="rotate-[-20deg] text-center text-2xl font-semibold text-[#0F3460]/10 select-none">
                Certified Arabic Translation by Al Midrar Institute
              </div>
            </div>
          )}

          {/* Slider */}
          <input
            type="range"
            min={0}
            max={100}
            value={slider}
            onChange={(e) => setSlider(Number(e.target.value))}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 w-2/3 accent-[#0F3460]"
            aria-label="Preview slider"
          />
        </div>

        <p className="mt-4 text-xs text-gray-500">
          Note: This preview illustrates the workflow. The actual engine will extract text, translate to Modern Standard Arabic, and reflow into the same layout with preserved seals, QR codes, and signatures at 300 DPI.
        </p>
      </div>
    </section>
  );
}
