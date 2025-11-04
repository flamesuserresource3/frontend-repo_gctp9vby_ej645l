import { useRef } from "react";
import { Settings, Stamp, QrCode } from "lucide-react";

export default function OptionsPanel({ options, setOptions, setLetterhead }) {
  const letterheadInput = useRef(null);

  return (
    <section className="w-full">
      <div className="rounded-2xl border bg-white p-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-[#E8AA42]/10 text-[#E8AA42] flex items-center justify-center">
            <Settings className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Translation & Rendering Options</h3>
            <p className="text-sm text-gray-600">Arabic RTL layout, fonts, watermark, and overlays.</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-800">Target Language</label>
            <select
              className="w-full rounded-lg border bg-white px-3 py-2 text-sm"
              value={options.language}
              onChange={(e) => setOptions((o) => ({ ...o, language: e.target.value }))}
            >
              <option value="ar">Arabic (Modern Standard)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-800">Arabic Font</label>
            <select
              className="w-full rounded-lg border bg-white px-3 py-2 text-sm"
              value={options.font}
              onChange={(e) => setOptions((o) => ({ ...o, font: e.target.value }))}
            >
              <option value="Cairo">Cairo</option>
              <option value="Amiri">Amiri</option>
              <option value="Noto Naskh Arabic">Noto Naskh Arabic</option>
              <option value="Lateef">Lateef</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-800">Optional Watermark</label>
            <select
              className="w-full rounded-lg border bg-white px-3 py-2 text-sm"
              value={options.watermark}
              onChange={(e) => setOptions((o) => ({ ...o, watermark: e.target.value }))}
            >
              <option value="none">None</option>
              <option value="standard">Certified Arabic Translation by Al Midrar Institute</option>
            </select>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="flex items-center gap-2">
            <input
              id="verifiedFooter"
              type="checkbox"
              checked={options.verifiedFooter}
              onChange={(e) => setOptions((o) => ({ ...o, verifiedFooter: e.target.checked }))}
              className="h-4 w-4 rounded border-gray-300"
            />
            <label htmlFor="verifiedFooter" className="text-sm text-gray-700">
              Add “Translation Verified by {options.verifier || "Your Organization"}” footer
            </label>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-800">Verifier Name</label>
            <input
              type="text"
              value={options.verifier}
              onChange={(e) => setOptions((o) => ({ ...o, verifier: e.target.value }))}
              placeholder="Al Midrar Institute"
              className="w-full rounded-lg border bg-white px-3 py-2 text-sm"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              id="dpi"
              type="checkbox"
              checked={options.highDpi}
              onChange={(e) => setOptions((o) => ({ ...o, highDpi: e.target.checked }))}
              className="h-4 w-4 rounded border-gray-300"
            />
            <label htmlFor="dpi" className="text-sm text-gray-700">
              Enforce 300 DPI output
            </label>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-800 flex items-center gap-2">
              <Stamp className="h-4 w-4 text-[#0F3460]" /> Attach Letterhead Background
            </label>
            <div className="flex items-center gap-3">
              <input
                ref={letterheadInput}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) setLetterhead(Object.assign(f, { preview: URL.createObjectURL(f) }));
                }}
              />
              <button
                className="rounded-lg border bg-white px-3 py-2 text-sm hover:bg-gray-50"
                onClick={() => letterheadInput.current?.click()}
              >
                Upload PNG/JPG
              </button>
              <span className="text-xs text-gray-500">Transparent PNG recommended</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <QrCode className="h-4 w-4 text-[#0F3460]" />
            <span className="text-sm text-gray-700">QR codes, logos, and signatures will be preserved as overlays</span>
          </div>
        </div>
      </div>
    </section>
  );
}
