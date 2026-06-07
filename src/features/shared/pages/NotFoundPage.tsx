export function NotFoundPage() {
  return (
    <div className="rounded-lg border border-slate-800 bg-[#111820] p-6">
      <h2 className="text-xl font-semibold text-white">Pagina no encontrada</h2>
      <p className="mt-2 text-sm text-slate-400">
        La ruta solicitada no existe en este croquis.
      </p>
    </div>
  );
}
