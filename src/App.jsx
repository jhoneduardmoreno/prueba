import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { InventarioProvider } from './context/InventarioProvider';
import { RutaProtegida } from './layouts/RutaProtegida';
import { Inventarios } from './paginas/Inventarios';
import { Login } from './paginas/Login';

function App() {


  return (
    <BrowserRouter>
      <AuthProvider>
        <InventarioProvider>
          <Routes>
            <Route path='/' element={<Login />}></Route>
            <Route path='/inventario' element={<RutaProtegida />}>
              <Route index element={<Inventarios />} />
            </Route>
          </Routes>
        </InventarioProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
