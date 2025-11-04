import { useState } from "react";
import BrandHeader from "./components/BrandHeader";
import UploadStep from "./components/UploadStep";
import OptionsPanel from "./components/OptionsPanel";
import PreviewPane from "./components/PreviewPane";

export default function App() {
  const [file, setFile] = useState(null);
  const [letterhead, setLetterhead] = useState(null);
  const [options, setOptions] = useState({
    language: "ar",
    font: "Cairo",
    watermark: "standard",
    verifiedFooter: true,
    verifier: "Al Midrar Institute",
    highDpi: true,
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-gray-900">
      <BrandHeader />

      <main className="mx-auto max-w-7xl px-4 py-8 space-y-8">
        <section className="text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Translate with Faithfulness and Form
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Upload your English certificate and receive a layout‑perfect Arabic version. Visual elements remain untouched in their exact positions.
          </p>
        </section>

        <UploadStep file={file} setFile={setFile} />

        <OptionsPanel options={options} setOptions={setOptions} setLetterhead={setLetterhead} />

        <PreviewPane file={file} options={options} letterhead={letterhead} />

        <footer className="py-8 text-center text-xs text-gray-500">
          FlamesBlue Elegant Bureau • Navy-Gold Professional Theme
        </footer>
      </main>
    </div>
  );
}
