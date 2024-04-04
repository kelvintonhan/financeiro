import React, {useContext} from 'react'
import {FcGoogle} from 'react-icons/fc'
import {authContext} from '@/lib/store/auth-context'

function Signin() {
    const {googleLoginHandler} = useContext(authContext);

  return (
    <main className='container max-w-2xl px-6 mx-auto my-auto'>
        <h1 className='mb-6 text-4xl font-bold text-center'>financeiro</h1>
        <div className='flex flex-col overflow-hidden shadow-md bg-slate-800 rounded-2xl'>
            <div className='h-52'>
                <img
                    className='object-cover w-full h-full'
                    src=''
                />
            </div>
            <div className='flex flex-row justify-center gap-4 items-center p-4'>
                <h3 className='text-2xl text-center'>Entrar</h3>
                <button
                    onClick={googleLoginHandler}
                    className='flex gap-2 p-4 font-medium text-white align-middle bg-gray-700 rounded-lg'>
                    <FcGoogle className='text-2xl'/> Google
                </button>
            </div>
        </div>
    </main>
  )
}

export default Signin