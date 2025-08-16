import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import jwtDecode from 'jwt-decode'

interface AuthContextType {
    token: string | null
    login: (token: string) => void
    logout: () => void
    isLoggedIn: boolean
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthContext = createContext<AuthContextType>({
    token: null,
    login: () => {},
    logout: () => {},
    isLoggedIn: false,
})

export const AuthProvider: React.FC<AuthProviderProps> = ({ children}) => {
    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        const loadToken = async () => {
            const storedToken = await AsyncStorage.getItem('@userToken')
            if (storedToken && isTokenValid(storedToken)) {
                setToken(storedToken)
            }
            else {
                await AsyncStorage.removeItem('@userToken')
                setToken(null)
            }
        }
        loadToken()
    }, [])

    const login = async (newToken: string) => {
        setToken(newToken)
        await AsyncStorage.setItem('@userToken', newToken)
    }

    const logout = async () => {
        setToken(null)
        await AsyncStorage.removeItem('@userToken')
    }

    const isTokenValid = (t: string) => {
        try {
            const decoded: any = jwtDecode(t)
            return decoded.exp * 1000 > Date.now()
        }
        catch {
            return false
        }
    }

    return (
        <AuthContext.Provider value={{ token, login, logout, isLoggedIn: !!token }}>
            {children}
        </AuthContext.Provider>
    )
}
