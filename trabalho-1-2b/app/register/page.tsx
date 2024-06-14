"use client";

import { useForm } from 'react-hook-form';
import { useContext, useState } from "react";
import { AuthContext, SignUpData } from "@/context/AuthContext";
import Navbar from '@/components/NavBar';

const Register = () => {
    const { register, handleSubmit } = useForm<SignUpData>();
    const { registerUser, authError } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const handleRegister = async (data: SignUpData) => {
        setLoading(true);
        await registerUser(data);
        setLoading(false);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Navbar />
            <form className="flex flex-col" onSubmit={handleSubmit(handleRegister)}>
                <label htmlFor="username">Usuário: </label>
                <input 
                    {...register('username')}
                    type="text" 
                    name='username' 
                    id='username' 
                    placeholder="username"
                    aria-label="Username" 
                    className="border border-gray-300 rounded p-1 mb-2"
                />
                <label htmlFor="password">Senha: </label>
                <input 
                    {...register('password')}
                    type="password" 
                    name='password' 
                    id='password' 
                    placeholder="password"
                    aria-label="Password"
                    className="border border-gray-300 rounded p-1 mb-2"
                />
                <button 
                    type="submit" 
                    className="bg-blue-500 text-white py-1 px-4 rounded"
                    disabled={loading}
                >
                    {loading ? 'Carregando...' : 'Registrar'}
                </button>
            </form>
            {authError && <p className="text-red-500 mt-2">{authError}</p>}
        </div>
    );
}

export default Register;
