'use client';

import { loginAction } from '@/src/actions/auth/auth-actions';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import { useState } from 'react';

const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);
 

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();  
    const formData = new FormData(event.currentTarget);
    const values = {
      email: formData.get('email') as string,
      password: formData.get('password') as string
    };

    try {
      const result = await loginAction(values);
     

      if (result?.error) {
        setError(result.error);
      } else {
        setError(null)
        // Redirigir o hacer otra acción en caso de éxito, y actualiza la página
        window.location.replace('/');
        console.log('Login successful!');
      }
    } catch (err) {
      setError('Ocurrió un error inesperado.');
    }
  };
  return (
    <form onSubmit={handleSubmit} className='flex flex-col'>
      <label htmlFor='email'>Correo electrónico</label>
      <input
        name='email'
        className='px-5 py-2 border bg-gray-200 rounded mb-5'
        type='email'
      />
      <label htmlFor='password'>Contraseña</label>
      <input
        name='password'
        className='px-5 py-2 border bg-gray-200 rounded mb-5'
        type='password'
      />
      {error && <p className='text-red-500'>{error}</p>}{' '}
      {/* Mostrar error si ocurre */}
      <button type='submit' className='btn-primary'>
        Ingresar
      </button>
      {/* divisor line */}
      <div className='flex items-center my-5'>
        <div className='flex-1 border-t border-gray-500'></div>
        <div className='px-2 text-gray-800'>O</div>
        <div className='flex-1 border-t border-gray-500'></div>
      </div>
      <Link href='/auth/new-account' className='btn-secondary text-center'>
        Crear una nueva cuenta
      </Link>
    </form>
  );
};

export default LoginForm;
