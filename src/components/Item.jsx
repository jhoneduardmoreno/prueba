import useInventario from "../hooks/useInventario";

export const Item = ({item}) => {

    const {manufacturer, location, owner, serial} = item;

    const {handleModalVerItem, handleModalEditarTarea, handleModalEliminarItem } = useInventario();
    

  return (
    <div className="border-b p-5 flex justify-between item-center">
        <div className="flex flex-col  items-start">

            <p className="mb-1 text-xl">{`Serial: ${serial}`}</p>
            <p className="mb-1 text-sm text-gray-500 uppercase">{`Ubicación: ${location}`}</p>
            <p className="mb-1 text-sm text-gray-500 uppercase">{`Propietario: ${owner}`}</p>
            <p className="mb-1 text-sm text-gray-500 uppercase">{`Fabricante: ${manufacturer}`}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-2">
            <button
                className="bg-indigo-600 px-4 py-2 text-white uppercase font-bold text-sm rounded-lg"
                onClick={() => handleModalVerItem(item)}
            >Ver producto</button>

            <button
                className=' bg-gray-600 px-4 py-2 text-white uppercase font-bold text-sm rounded-lg'
                onClick={() => handleModalEditarTarea(item)}
            >Editar</button>

            <button
                className="bg-red-600 px-4 py-2 text-white uppercase font-bold text-sm rounded-lg"
                onClick={()=>handleModalEliminarItem(item)}
            >Eliminar</button>
        </div>

    </div>
  )
}
