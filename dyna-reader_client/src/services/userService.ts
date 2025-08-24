import { api } from './api'

// Endpoint Login
export const loginUser = async (email: string, password: string) => {
    try {
        const response = await api.post('auth/login', { email, password })
        const jwtToken = response.data.token
        return response
    }
    catch (error) {
        throw error
    }
}

// Endpoint Esqueci minha senha
export const forgotPassword = async (email: string) => {
    try {
        const response = await api.post('auth/forgot-password', {email})
        return response
    }
    catch (error) {
        throw error
    }
}

// Endpoint de criação de conta
export const signUp = async (email: string, username: string, password: string) => {
    try {
        const response = await api.post('users/signup', {email, username, password})
        return response
    }
    catch (error) {
        throw error
    }

}
