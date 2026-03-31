"use client";

import { useState } from "react";

export default function EliminarContacto() {
  const [id, setId] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch(`http://localhost:3000/contactos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("No se pudo eliminar el contacto. Verifica el ID.");
      }

      setStatus("success");
      setMessage(`Contacto #${id} eliminado.`);
      setId("");

      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 3000);
    } catch (error: any) {
      console.error(error);
      setStatus("error");
      setMessage("Error al intentar conectarse al servidor.");
    }
  };

  return (
    <div className="w-full max-w-sm mt-8 border border-zinc-200 dark:border-zinc-800 p-6 rounded-lg bg-white dark:bg-black">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="delete-id" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            ID del Contacto
          </label>
          <input
            id="delete-id"
            type="number"
            required
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="px-3 py-2 text-sm border rounded-md border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-red-600 dark:focus:ring-red-500"

          />
        </div>

        <button
          type="submit"
          disabled={status === "loading" || !id}
          className="w-full px-4 py-2 mt-2 text-sm font-medium text-white bg-red-600 dark:bg-red-700 rounded-md disabled:opacity-50 hover:bg-red-700 dark:hover:bg-red-600 transition-colors"
        >
          {status === "loading" ? "Eliminando..." : "Eliminar Contacto"}
        </button>

        {message && (
          <p className={`text-sm text-center ${status === "success" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
