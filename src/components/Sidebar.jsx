import { useState } from "react";
import useInventario from "../hooks/useInventario";
import { Alerta } from "./Alerta";
import ModalEliminarItem from "./ModalEliminarItem";
import ModalFormularioItem from "./ModalFormularioItem";
import ModalVerItem from "./ModalVerItem";



export const Sidebar = () => {

    const credenciales = JSON.parse(localStorage.getItem('credenciales'));

    const {handleModalItem, busqueda, setBusqueda, handleBusqueda} = useInventario();



  return (
    <aside className='md:w-80 lg:w-96 px-5 py-10'>
        <p className='text-xl font-bold'>Usuario: {credenciales.usuario}</p>

        <button
          onClick={handleModalItem}
          className='bg-sky-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg mb-4'
        >Nuevo Item</button>

        <input 
          type="search"
          placeholder="Buscar items por serial"
          className="rounded-lg w-full block p-2 border"
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          onKeyDown={handleBusqueda}
        />

        <ModalFormularioItem />
        <ModalVerItem />
        <ModalEliminarItem />
    </aside>
  )
}