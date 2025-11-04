import { ShieldCheck } from "lucide-react";

export default function BrandHeader() {
  return (
    <header className="w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50">
      <div className="mx-auto max-w-7xl px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-[#0F3460] flex items-center justify-center text-white">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Al-Midrar Certified Translator</h1>
            <p className="text-sm text-gray-600">Precision. Authenticity. Excellence in Certified Translation.</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-[#0F3460]/10 px-3 py-1 text-xs font-medium text-[#0F3460]">Navy Blue</span>
          <span className="inline-flex items-center rounded-full bg-[#E8AA42]/10 px-3 py-1 text-xs font-medium text-[#E8AA42]">Gold</span>
          <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">White</span>
        </div>
      </div>
    </header>
  );
}
