export function Topbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-800 bg-[#0b1014]/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-sm text-slate-400">Operacion diaria</p>
          <h1 className="text-base font-semibold text-white">
            Panel interno del chiringuito
          </h1>
        </div>
        <div className="rounded-md border border-slate-700 px-3 py-2 text-sm text-slate-300">
          MVP
        </div>
      </div>
    </header>
  );
}
