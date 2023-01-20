import { createContext, useEffect, useState} from 'react';


const AuthContext = createContext();

const AuthProvider = ({children}) => {

    useEffect(() => {
        const storedCredentials = localStorage.getItem('credenciales');
        if (!storedCredentials) {
            const credenciales = {usuario: "admin", contraseña: "admin", acceso: false}
            localStorage.setItem('credenciales', JSON.stringify(credenciales));
        }
    }, []);

    
    

    return(
        <AuthContext.Provider
            value={{
                
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}


export {
    AuthProvider
}

export default AuthContext;