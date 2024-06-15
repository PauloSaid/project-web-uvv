"use client";

import { createContext, useState } from "react";
import { request } from '../services/request';
import { setCookie } from 'nookies';
import { useRouter } from "next/navigation";

export type SignIdData = {
    username: string;
    password: string;
}

export type SignUpData = {
    username: string;
    password: string;
}

type AuthContextType = {
    login: (data: SignIdData) => void;
    registerUser: (data: SignUpData) => void;
    authError: string | null;
}

type UserAuthentication = {
    'x-access-token': string
}

export const AuthContext = createContext({} as AuthContextType);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [authError, setAuthError] = useState<string | null>(null);
    const router = useRouter();

    async function login({ username, password }: SignIdData) {
    try{
        let { 'x-access-token': token } = await request<UserAuthentication>('http://127.0.0.1:8080/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password }),
            referrerPolicy: 'no-referrer',
            cache: 'no-store'
        });

        if (!token){ 
            setAuthError('Usuário ou senha inválidos. Verifique e tente novamente!');
            return;
        }

        setCookie(null, 'auth.token', token, {
                maxAge: 60 * 60 * 1,
            });
            router.push('/books');
        }catch(error) {
                setAuthError('Erro ao realizar login.');
            }
    }

    async function registerUser({ username, password }: SignUpData) {
        try {
            const response = await request('http://127.0.0.1:8080/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password }),
                referrerPolicy: 'no-referrer',
                cache: 'no-store'
            });
    
            if (response instanceof Response && response.ok) {
                router.push('/login');
            } else {
                setAuthError('Erro ao registrar usuário. Tente novamente!');
            }
        } catch (error) {
            setAuthError('Erro ao registrar usuário. Tente novamente!');
        }
    }

    return (
        <AuthContext.Provider value={{ login, registerUser, authError }}>
            {children}
        </AuthContext.Provider>
    );
};
