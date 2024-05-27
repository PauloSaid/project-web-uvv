"use client";

import { AuthContext, SignIdData } from "@/context/AuthContext";
import { useForm } from 'react-hook-form';
import { useContext } from "react";

const Login = async ({}) => {
    const {register, handleSubmit} = useForm<SignIdData>();
    const { login, authError } = useContext(AuthContext);

    const handleLogin = async (data : SignIdData) => {
        await login(data);
    }

    return (
        <div>
            <form className="flex flex-col" onSubmit={handleSubmit(handleLogin)}>
                <label htmlFor="username">Usuário: </label>
                <input 
                    {...register('username')}
                    type="text" 
                    name='username' 
                    id='username' 
                    placeholder="username" 
                />
                <label htmlFor="password">Senha: </label>
                <input 
                    {...register('password')}
                    type="password" 
                    name='password' 
                    id='password' 
                    placeholder="password" 
                />
                <input type="submit" value="Acessar" />
            </form>
            {authError && <p>{authError}</p>}
        </div>
    );
}

export default Login;