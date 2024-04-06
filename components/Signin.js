import React, { useContext } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { authContext } from '@/lib/store/auth-context';
import { useMediaQuery } from 'react-responsive';

function Signin() {
    const { googleLoginHandler } = useContext(authContext);
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    return (
        <main className='container max-w-2xl px-6 mx-auto my-auto flex justify-center items-center h-screen'>
            <div className='flex flex-col overflow-hidden bg-stone-900 w-full gap-2'>
                <div className='h-auto'>
                    {isMobile ? (
                        <img
                            src='/financeiro-logo-mob.png' // Caminho relativo a partir da pasta 'public'
                            className='object-cover'
                            alt='Descrição da imagem'
                        />
                    ) : (
                        <img
                            src='/financeiro-logo-desk.png' // Caminho relativo a partir da pasta 'public'
                            className='object-cover w-full h-full'
                            alt='Descrição da imagem'
                        />
                    )}
                </div>
                <div className='flex flex-row justify-center gap-4 items-center p-4 bg-stone-900'>
                    <button
                        onClick={googleLoginHandler}
                        className='flex gap-2 p-2 font-medium text-white align-middle rounded-lg bg-sky-800'>
                        <FcGoogle className='text-2xl' /> Entrar com sua conta Google
                    </button>
                </div>
            </div>
        </main>
    );
}

export default Signin;
