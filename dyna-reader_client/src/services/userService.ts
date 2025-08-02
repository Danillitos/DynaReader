import { api } from './api'

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await api.post('auth/login', { email, password })
        return response
    }
    catch (error) {
        throw error
    }
}

export const forgotPassword = async (email: string) => {
    try {
        const response = await api.post('auth/forgot-password', {email})
        return response
    }
    catch (error) {
        throw error
    }
}

export const signUp = async (email: string, username: string, password: string) => {
    try {
        const response = await api.post('users/signup', {email, username, password})
        return response
    }
    catch (error) {
        throw error
    }

}