"use client";

import { useState } from "react";

export default function ContactoForm() {
  const [nombre, setNombre] = useState("");
  const [mail, setMail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  // 1. parte principal, la que hace un POST al backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("http://localhost:3000/contactos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, mail }),
      });

      if (!response.ok) {
        throw new Error("Error al guardar el contacto");
      }

      setStatus("success");
      setMessage("Contacto guardado.");
      setNombre("");
      setMail("");

      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 3000);
    } catch (error: any) {
      console.error(error);
      setStatus("error");
      setMessage("Ocurrió un error.");
    }
  };

  // 2. la ui
  return (
    <div className="w-full max-w-sm mt-8 border border-zinc-200 dark:border-zinc-800 p-6 rounded-lg bg-white dark:bg-black">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="nombre" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Nombre
          </label>
          <input
            id="nombre"
            type="text"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="px-3 py-2 text-sm border rounded-md border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="mail" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Email
          </label>
          <input
            id="mail"
            type="email"
            required
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            className="px-3 py-2 text-sm border rounded-md border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full px-4 py-2 mt-2 text-sm font-medium text-white bg-black dark:bg-white dark:text-black rounded-md disabled:opacity-50 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
        >
          {status === "loading" ? "Guardando..." : "Guardar"}
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
