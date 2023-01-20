import {Outlet, Navigate} from 'react-router-dom';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';


export const RutaProtegida = () => {

    const credenciales = JSON.parse(localStorage.getItem('credenciales'));

  return (

    <>
        {credenciales.acceso ? (
          <div className='bg-gray-100'>
            <Header />

            <div className='md:flex md:min-h-screen'>
              <Sidebar />

              <main className='flex-1 p-10'>
                <Outlet />
              </main>
            </div>

          </div>
        ) : <Navigate to='/'/>}
    </>
  )
}