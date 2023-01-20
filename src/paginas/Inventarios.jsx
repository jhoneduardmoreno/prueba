import useInventario from "../hooks/useInventario";
import { Item } from "../components/Item";
import { Alerta } from "../components/Alerta";



export const Inventarios = () => {

  const {data, handlePageChange, page, alerta, totalpages, buscadorUsado, handleBotonVolver} = useInventario();

  const {msg} = alerta;

  return (
    <>
      <h1 className="text-4xl font-black">Inventario: </h1>

      <div className="flex justify-center">
        <div className=" w-full md:w-1/3 lg:w-1/4">
          {msg && <Alerta alerta={alerta} />}
        </div>
      </div>
      

      <div className="bg-white shadow mt-10 rounded-lg">
        {data.items?.length ? 
        data.items.map(item => (
          <Item 
            key={item.id}
            item={item}
          />
        ))
        : <p className="text-center my-5 p-10">No hay items en el inventario</p>}
      </div>

      {buscadorUsado 
      ? 
        <div className="flex mt-5 gap-2 justify-center items-center">
          <button
            className="bg-sky-600 px-4 py-2 text-white uppercase font-bold text-sm rounded-lg"
            onClick={handleBotonVolver}
          >Volver a ver todos los Items</button>
        </div>
      : (
        <div className="flex mt-5 gap-2 justify-center items-center">
          <button
              className="bg-sky-600 px-4 py-2 text-white uppercase font-bold text-sm rounded-lg"
              onClick={() => handlePageChange(page - 1)} disabled={page === 1}
          >Anterior</button>

          <div className="border px-4 py-2 font-bold">
            {page}
          </div>

          <button
            className="bg-sky-600 px-4 py-2 text-white uppercase font-bold text-sm rounded-lg"
            onClick={() => handlePageChange(page + 1) } disabled={page === totalpages - 1}
          >Siguiente</button>
        </div>
      )
      }

    </>
  )
}
