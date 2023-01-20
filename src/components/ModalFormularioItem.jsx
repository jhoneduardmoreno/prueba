import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import useInventario from '../hooks/useInventario';
import { Alerta } from '../components/Alerta';
import { generarId } from '../helpers/generarId';

const CONNECTION = ['directa', 'semi-directa', 'indirecta'];
const STORAGE = ['interno', 'externo'];
const CONDITION = ['nuevo', 'usado'];
const OWNER = ['RF', 'OR'];

const ModalFormularioItem = () => {

    const {ModalFormularioItem, handleModalItem, crearItem, articulo} = useInventario();
    const [alerta, setAlerta] = useState({});
    const [id, setId] = useState('');

    const [connection_type, setConnection] = useState('');
    const [storage_system, setStorage] = useState('');
    const [condition, setCondition] = useState('');
    const [owner, setOwner] = useState('');
    const [location, setLocation] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [i_max, setImax] = useState('');
    const [i_b, setIb] = useState('');
    const [i_n, setIn] = useState('');
    const [seals, setSeals] = useState('');

    useEffect(() => {
        if(articulo.id){
            setId(articulo.id)
            setConnection(articulo.connection_type);
            setStorage(articulo.storage_system);
            setCondition(articulo.condition);
            setOwner(articulo.owner);
            setLocation(articulo.location);
            setManufacturer(articulo.manufacturer);
            setImax(articulo.i_max);
            setIb(articulo.i_b);
            setIn(articulo.i_n);
            setSeals(articulo.seals);

            return
        }

        setId('');
        setConnection('');
        setStorage('');
        setCondition('');
        setOwner('');
        setLocation('');
        setManufacturer('');
        setImax('');
        setIb('');
        setIn('');
        setSeals('');
            
    }, [articulo])

    const handleSubmit = async e => {
        e.preventDefault();

        // if([connection_type, storage_system, condition, owner, location, manufacturer, i_max, i_b, i_n, seals].includes('') ) {
        //     setAlerta({
        //         msg: 'Todos los campos son obligatorios',
        //         error: true
        //     })
        //     return
        // }
        const item = { id, serial: generarId(), connection_type, storage_system, condition, owner, location, manufacturer, i_max, i_b, i_n, seals}
        await crearItem(item);
        

        
        setStorage('');
        setConnection('')
        setCondition('')
        setOwner('')
        setLocation('')
        setManufacturer('')
        setImax('')
        setIb('')
        setIn('')
        setSeals('')

    }

    // const { msg } = alerta;
 
    return (
        <Transition.Root show={ ModalFormularioItem  } as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={ handleModalItem }>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay 
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
                        />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">


                            <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    type="button"
                                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={ handleModalItem  }
                                >
                                <span className="sr-only">Cerrar</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>


                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <Dialog.Title as="h3" className="text-lg leading-6 font-bold text-gray-900">
                                        {id ? 'Editar Item': 'Crear Item'}
                                    </Dialog.Title>

                                    {/* {msg && <Alerta alerta={alerta} />} */}

                                    <form 
                                        onSubmit={handleSubmit}
                                        className='my-10'
                                    >
                                        <div className='mb-5'>
                                            <label
                                                className='text-gray-700 uppercase font-bold text-sm' 
                                                htmlFor='connection'
                                            >
                                               Tipo de conexión
                                            </label>
                                            <select
                                                id="connection"
                                                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                value={connection_type}
                                                onChange={e => setConnection(e.target.value)}
                                            >
                                                <option value="">-- Seleccionar --</option>

                                                {CONNECTION.map( opcion => (
                                                    <option key={opcion}>{opcion}</option>
                                                ))}

                                            </select>
                                        </div>

                                        <div className='mb-5'>
                                            <label
                                                className='text-gray-700 uppercase font-bold text-sm' 
                                                htmlFor='storage'
                                            >
                                               Sistema de almacenamiento
                                            </label>
                                            <select
                                                id="storage"
                                                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                value={storage_system}
                                                onChange={e => setStorage(e.target.value)}
                                            >
                                                <option value="">-- Seleccionar --</option>

                                                {STORAGE.map( opcion => (
                                                    <option key={opcion}>{opcion}</option>
                                                ))}

                                            </select>
                                        </div>

                                        <div className='mb-5'>
                                            <label
                                                className='text-gray-700 uppercase font-bold text-sm' 
                                                htmlFor='condition'
                                            >
                                               Condición
                                            </label>
                                            <select
                                                id="condition"
                                                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                value={condition}
                                                onChange={e => setCondition(e.target.value)}
                                            >
                                                <option value="">-- Seleccionar --</option>

                                                {CONDITION.map( opcion => (
                                                    <option key={opcion}>{opcion}</option>
                                                ))}

                                            </select>
                                        </div>

                                        <div className='mb-5'>
                                            <label
                                                className='text-gray-700 uppercase font-bold text-sm' 
                                                htmlFor='owner'
                                            >
                                               Propietario
                                            </label>
                                            <select
                                                id="owner"
                                                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                value={owner}
                                                onChange={e => setOwner(e.target.value)}
                                            >
                                                <option value="">-- Seleccionar --</option>

                                                {OWNER.map( opcion => (
                                                    <option key={opcion}>{opcion}</option>
                                                ))}

                                            </select>
                                        </div>

                                        <div className='mb-5'>
                                            <label
                                                className='text-gray-700 uppercase font-bold text-sm' 
                                                htmlFor='location'
                                            >
                                                Ubicacion
                                            </label>
                                            <input
                                                type="text"
                                                id="location"
                                                placeholder='Ubicación'
                                                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                value={location}
                                                onChange={e => setLocation(e.target.value)}
                                            />
                                        </div>

                                        <div className='mb-5'>
                                            <label
                                                className='text-gray-700 uppercase font-bold text-sm' 
                                                htmlFor='manufacturer'
                                            >
                                                Fabricante
                                            </label>
                                            <input
                                                type="text"
                                                id="manufacturer"
                                                placeholder='Fabricante'
                                                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                value={manufacturer}
                                                onChange={e => setManufacturer(e.target.value)}
                                            />
                                        </div>

                                        <div className='mb-5'>
                                            <label
                                                className='text-gray-700 uppercase font-bold text-sm' 
                                                htmlFor='i_max'
                                            >
                                                I_MAX
                                            </label>
                                            <input
                                                type="number"
                                                id="i_max"
                                                placeholder='I_max'
                                                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                value={i_max}
                                                onChange={e => setImax(e.target.value)}
                                            />
                                        </div>

                                        <div className='mb-5'>
                                            <label
                                                className='text-gray-700 uppercase font-bold text-sm' 
                                                htmlFor='i_b'
                                            >
                                                I_B
                                            </label>
                                            <input
                                                type="number"
                                                id="i_b"
                                                placeholder='I_b'
                                                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                value={i_b}
                                                onChange={e => setIb(e.target.value)}
                                            />
                                        </div>

                                        <div className='mb-5'>
                                            <label
                                                className='text-gray-700 uppercase font-bold text-sm' 
                                                htmlFor='i_n'
                                            >
                                                I_N
                                            </label>
                                            <input
                                                type="number"
                                                id="i_n"
                                                placeholder='I_n'
                                                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                value={i_n}
                                                onChange={e => setIn(e.target.value)}
                                            />
                                        </div>

                                        <div className='mb-5'>
                                            <label
                                                className='text-gray-700 uppercase font-bold text-sm' 
                                                htmlFor='seals'
                                            >
                                                Sellos
                                            </label>
                                            <input
                                                type="number"
                                                id="seals"
                                                placeholder='Sellos'
                                                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                value={seals}
                                                onChange={e => setSeals(e.target.value)}
                                            />
                                        </div>

                                        <input
                                            type="submit"
                                            className='bg-sky-600 hover:bg-sky-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded text-sm'
                                            value={ id ? 'Guardar Cambios': 'Crear Item'}
                                        />

                                    </form>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default ModalFormularioItem