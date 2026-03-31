import AgendarContacto from '../componentes/AgendarContacto';
import ListarContactos from '../componentes/ListarContactos';
import EliminarContacto from '../componentes/EliminarContacto';
import BuscarContacto from '../componentes/BuscarContacto';
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans dark:bg-black text-black dark:text-zinc-50">

      <header className="w-full border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black px-8 py-5">
        <h1 className="text-xl font-medium tracking-tight whitespace-nowrap">
          Este es mi proyecto de agenda de contactos
        </h1>
      </header>

      {/* Área principal donde se acomodan las funcionalidades o bloques */}
      <main className="flex-1 w-full max-w-6xl mx-auto p-8 flex flex-col md:flex-row gap-10 items-start">

        {/* Lado izquierdo: Bloque para cargar y eliminar datos */}
        <section className="w-full md:w-1/3 flex flex-col gap-10">

          {/* Bloque: Agregar */}
          <div className="flex flex-col">
            <div className="mb-2">
              <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                Guarda un nuevo contacto
              </h2>
            </div>
            <div className="-mt-4">
              <AgendarContacto />
            </div>
          </div>
          <div className="flex flex-col border-t border-zinc-200 dark:border-zinc-800 pt-6">
            <div className="mb-2">
              <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                Eliminar contacto
              </h2>
            </div>
            <div className="-mt-4">
              <EliminarContacto />
            </div>
          </div>

          <div className="flex flex-col border-t border-zinc-200 dark:border-zinc-800 pt-6">
            <div className="mb-2">
              <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                Buscar contacto
              </h2>
            </div>
            <div className="-mt-4">
              <BuscarContacto />
            </div>
          </div>
        </section>

        {/* Lado derecho: Lista de Contactos */}
        <section className="w-full md:w-2/3 flex flex-col pt-2 md:pt-0">
          <ListarContactos />

        </section>

      </main>
    </div>
  );
}
