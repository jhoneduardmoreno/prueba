import {useState, createContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';



const InventarioContext = createContext();

const InventarioProvider = ({children}) => {

    const [ ModalFormularioItem, setModalFormularioItem ] = useState(false);
    const [data, setData] = useState([]);
    const [articulo, setArticulo] = useState({});
    const[modalFormularioVerItem, SetModalFormularioVerItem] = useState(false);
    const [modalEliminarItem, setModalEliminarItem] = useState(false);
    const [alerta, setAlerta] = useState({});
    const [busqueda, setBusqueda] = useState('');
    const [buscadorUsado, SetBuscadorUsado] = useState(false);

    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [totalpages, SeTotalPages] = useState('');

    const handleModalItem = () => {
        setModalFormularioItem(!ModalFormularioItem)
        setArticulo({});
    }

    const handleModalVerItemFormulario = () => {
        SetModalFormularioVerItem(!modalFormularioVerItem)
    }

    const crearItem = async item => {

        if(item?.id){
            await editarItem(item)
        } else {
            await insertarItem(item)
        }
    }

    const insertarItem = async item => {

        try {

            const response = await fetch('https://ops.enerbit.dev/learning/api/v1/meters', {
                method: 'POST',
                body: JSON.stringify(item),
                headers: { 'Content-Type': 'application/json' }
            });
            const articulo = await response.json();


            //Agregar el item al state
            const itemsActualizado = {...data}
            itemsActualizado.items = [...data.items, articulo ]
            setData(itemsActualizado);
            setModalFormularioItem(false);
            setAlerta({
                msg: 'El item ha sido creado',
                error: false
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);
            
        } catch (error) {
            console.log(error)
        }
    }

    const editarItem = async item => {
        try {
            

            const response = await fetch(`https://ops.enerbit.dev/learning/api/v1/meters/${articulo.id}`, {
                method: 'PATCH',
                body: JSON.stringify(item),
                headers: { 'Content-Type': 'application/json' }
            });
            const articulo2 = await response.json();
            
            const itemsActualizado = {...data}
            itemsActualizado.items = itemsActualizado.items.map(itemState => itemState.id === articulo2.id ? articulo2 : itemState)
            setData(itemsActualizado);
            setModalFormularioItem(false);
            setAlerta({
                msg: 'El item ha sido Editado',
                error: false
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        
      const obtenerItems = async () => {
          try {
            const response = await fetch(`https://ops.enerbit.dev/learning/api/v1/meters?page=${page}&size=${size}`);
            const data = await response.json();
            setData(data);
            SeTotalPages(data.pages);
        } catch (error) {
            console.log(error)
        }
      }

      obtenerItems()
    }, [page, size])

    const handlePageChange = newPage => {
        setPage(newPage);
    }
   

    const handleModalVerItem = articulo => {
        setArticulo(articulo);
        SetModalFormularioVerItem(true);
    }

    const handleModalEditarTarea = articulo => {
        setArticulo(articulo);
        setModalFormularioItem(true);
        SetModalFormularioVerItem(false);
    }

    const handleModalEliminarItem = articulo => {
        setArticulo(articulo);
        setModalEliminarItem(!modalEliminarItem);
        SetModalFormularioVerItem(false);
    }

    const eliminarItem = async () => {
        try {

            const response = await fetch(`https://ops.enerbit.dev/learning/api/v1/meters/${articulo.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            
            const articulo3 = await response.json();
            
            const itemsActualizado = {...data}
            itemsActualizado.items = itemsActualizado.items.filter(itemState => itemState.id !== articulo3.id)
            setData(itemsActualizado);
            setModalEliminarItem(false);
            setAlerta({
                msg: 'El item ha sido eliminado',
                error: true
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);
            setArticulo({})
            
        } catch (error) {
            console.log(error);
        }
    }

    const handleBusqueda = (event) => { 

        const itemsActualizadoBusqueda = {...data}
        itemsActualizadoBusqueda.items =itemsActualizadoBusqueda.items?.filter(itemState => itemState.serial.toString() === busqueda);
        console.log(itemsActualizadoBusqueda);

        if (event.key === 'Enter' && itemsActualizadoBusqueda.items.length > 0) {
            setData(itemsActualizadoBusqueda);

            setAlerta({
                msg: `Resultados de la busqueda del serial: ${busqueda}`,
                error: false
            })

            setTimeout(() => {
                setAlerta({})
            }, 4000);

            SetBuscadorUsado(true);
            return
        } 

        if(event.key === 'Enter' && itemsActualizadoBusqueda.items.length === 0){
            setAlerta({
                msg: 'No hay items con ese serial',
                error: true
            })

            setTimeout(() => {
                setAlerta({})
            }, 3000);
            return
        }

    }

    

    const handleBotonVolver = () => {
        
        setData(data);
        SetBuscadorUsado(false);
        
    }


    const navigate = useNavigate();
    const credenciales = JSON.parse(localStorage.getItem('credenciales'));

    const handleBotonCerrarSesion = () => {
        navigate('/');
        credenciales.acceso = false;
        localStorage.setItem('credenciales', JSON.stringify(credenciales));

    }
    
    return (
        <InventarioContext.Provider
            value={{
                ModalFormularioItem,
                handleModalItem,
                crearItem,
                data,
                handleModalVerItem,
                articulo,
                handleModalVerItemFormulario,
                modalFormularioVerItem,
                handleModalEditarTarea,
                handlePageChange,
                page,
                handleModalEliminarItem,
                modalEliminarItem,
                eliminarItem,
                alerta,
                totalpages,
                setBusqueda,
                busqueda,
                handleBusqueda,
                buscadorUsado,
                handleBotonVolver,
                handleBotonCerrarSesion
            }}
        >{children}</InventarioContext.Provider>
    )
}

export{
    InventarioProvider
}

export default InventarioContext;