"use client";

import { useState } from "react";

type Contacto = {
  id: number;
  nombre: string;
  mail: string;
};

export default function ListarContactos() {
  const [contactos, setContactos] = useState<Contacto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasFetched, setHasFetched] = useState(false);

  const fetchContactos = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:3000/contactos");
      if (!response.ok) {
        throw new Error("Error al obtener los contactos");
      }
      const data = await response.json();
      setContactos(data);
      setHasFetched(true);
    } catch (err: any) {
      console.error(err);
      setError("No se pudieron cargar los contactos, verifica que el backend esté corriendo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3 gap-3">
        <div>
          <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
            Lista de Contactos
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            te muestra todos los contactos en la base de datos
          </p>
        </div>
        <button
          onClick={fetchContactos}
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-white bg-black dark:bg-white dark:text-black rounded-md disabled:opacity-50 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
        >
          {loading ? "Cargando..." : "Listar Contactos"}
        </button>
      </div>

      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

      {hasFetched && contactos.length === 0 && !error && (
        <p className="text-sm text-zinc-500 py-4 text-center border border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg">
          No hay contactos guardados todavía.
        </p>
      )}

      {contactos.length > 0 && (
        <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-black">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 uppercase">
              <tr>
                <th className="px-4 py-3 font-medium">ID</th>
                <th className="px-4 py-3 font-medium">Nombre</th>
                <th className="px-4 py-3 font-medium">Email</th>
              </tr>
            </thead>
            <tbody>
              {contactos.map((contacto) => (
                <tr key={contacto.id} className="border-b last:border-0 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                  <td className="px-4 py-3 text-zinc-500 dark:text-zinc-400 w-16">{contacto.id}</td>
                  <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">{contacto.nombre}</td>
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{contacto.mail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
