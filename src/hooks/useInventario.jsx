import { useContext } from 'react';
import InventarioContext from '../context/InventarioProvider';

const useInventario = () => {
    return useContext(InventarioContext);
}

export default useInventario;