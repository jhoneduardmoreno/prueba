import useInventario from "../hooks/useInventario"

export const Header = () => {

    const { handleBotonCerrarSesion } = useInventario();

  return (
    <header className="px-4 py-5 bg-white border-b">
        <div className="lg:flex lg:justify-between">

            <div>
                <h2 className="text-4xl text-sky-600 font-black text-center">
                    Enerbit Inventario
                </h2>
            </div>

            <div className='flex items-center gap-4 block justify-center mt-2 sm:flex sm:items-center'>
                <button
                    type='button'
                    className='text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold'
                    onClick={handleBotonCerrarSesion}
                >Cerrar Sesión</button>
            </div>
            

        </div>
    </header>
  )
}