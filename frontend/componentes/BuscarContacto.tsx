"use client";

import { useState } from "react";

type Contacto = {
  id: number;
  nombre: string;
  mail: string;
};

export default function BuscarContacto() {
  const [id, setId] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [contacto, setContacto] = useState<Contacto | null>(null);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    setStatus("loading");
    setMessage("");
    setContacto(null);

    try {
      const response = await fetch(`http://localhost:3000/contactos/${id}`);

      if (response.status === 404) {
        throw new Error("No se encontró ningún contacto con ese ID.");
      }

      const isJson = response.headers.get("content-type")?.includes("application/json");
      const data = isJson ? await response.json() : null;

      if (!response.ok || !data || !data.nombre) {
        throw new Error("No se encontró el contacto. Verifica el ID.");
      }

      setContacto(data);
      setStatus("success");
    } catch (error: any) {
      console.error(error);
      setStatus("error");
      setMessage(error.message || "Error al intentar conectarse al servidor.");
    }
  };


  return (
    <div className="w-full max-w-sm mt-8 border border-zinc-200 dark:border-zinc-800 p-6 rounded-lg bg-white dark:bg-black">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="search-id" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            ID del Contacto
          </label>
          <input
            id="search-id"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            required
            value={id}
            onChange={(e) => {
              const soloNumeros = e.target.value.replace(/[^0-9]/g, '');
              setId(soloNumeros);
            }}
            className="px-3 py-2 text-sm border rounded-md border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-blue-500"
            placeholder="Ej: 5"
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading" || !id}
          className="w-full px-4 py-2 mt-2 text-sm font-medium text-white bg-blue-600 dark:bg-blue-700 rounded-md disabled:opacity-50 hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
        >
          {status === "loading" ? "Buscando..." : "Buscar Contacto"}
        </button>

        {message && status === "error" && (
          <p className="text-sm text-center text-red-600 dark:text-red-400 mt-2">
            {message}
          </p>
        )}

        {status === "success" && contacto && (
          <div className="mt-2 p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-zinc-50 dark:bg-zinc-900/50">
            <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-3 border-b border-zinc-200 dark:border-zinc-700 pb-2">
              Resultado de búsqueda
            </h3>
            <div className="flex flex-col gap-1.5">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                <span className="font-medium text-zinc-800 dark:text-zinc-300">ID:</span> {contacto.id}
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                <span className="font-medium text-zinc-800 dark:text-zinc-300">Nombre:</span> {contacto.nombre}
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 break-all">
                <span className="font-medium text-zinc-800 dark:text-zinc-300">Email:</span> {contacto.mail}
              </p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
