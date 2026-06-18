import { createContext, useContext, useState } from "react";
import { supabase } from "../services/supabaseClient";
import { Alert } from "react-native";
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';

// Asegura que el navegador se cierre correctamente tras autenticarse
WebBrowser.maybeCompleteAuthSession(); 

type User = {
    token: string;
    email: string;
    pwd?: string;
} | null;

type AuthContextType = {
    user: User | null; 
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    loginWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error ("useAuth debe usarse dentro de AuthProvider");
    return context;
}

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<User>(null);

    const setUserSession = (data: any) => {
        const session = data.session; 
        if(session && session.user) {
            setUser({
                token: session.access_token,
                email: session.user.email,
            });
        } else {
            setUser(null);
        }
    }

    const login = async (email: string, password: string) => {
        const {data, error} = await supabase.auth.signInWithPassword({
            email,
            password
        }); 
        
        if (error){
            Alert.alert("Error al iniciar sesión", error.message);
        }
        setUserSession(data);        
    }

    const loginWithGoogle = async () => {
    try {
        // 1. Definimos explícitamente el esquema de tu app
        const scheme = 'miappmovil';
        // 2. Creamos la URL de redirección exacta
        const redirectUrl = 'miappmovil://auth-callback';

        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: redirectUrl, // Esto debe ser miappmovil://auth-callback
                skipBrowserRedirect: true, // Forzamos a que no intente abrir nada más
            },
        });

        if (error) {
            Alert.alert("Error con Google", error.message);
            return;
        }

        if (data?.url) {
            // 3. Abrimos la sesión y le decimos al navegador qué URL escuchar para cerrarse
            const result = await WebBrowser.openAuthSessionAsync(data.url, redirectUrl);
            
            if (result.type === 'success') {
                // Si llegamos aquí, el navegador se cerró correctamente
                const { data: sessionData } = await supabase.auth.getSession();
                if (sessionData?.session) {
                    setUserSession(sessionData);
                }
            }
        }
    } catch (error: any) {
        console.log("Error en OAuth:", error);
    }
};

    const logout = async () => {
       await supabase.auth.signOut();
       setUser(null);
    };
    
    return (
        <AuthContext.Provider value={{user, login, logout, loginWithGoogle}}>
            {children}
        </AuthContext.Provider>
    );
}