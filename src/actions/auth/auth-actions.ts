'use server';

import { signIn } from '@/src/auth';
import prisma from '@/src/lib/prisma';
import { registerSchema, signInSchema } from '@/src/lib/zod';
import { ok } from 'assert';
import bcryptjs from 'bcryptjs';
import { AuthError } from 'next-auth';
import { z } from 'zod';

export const loginAction = async (values: z.infer<typeof signInSchema>) => {
  try {
    await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }
    return { error: 'error 500' };
  }
};

export const registerAction = async (
  values: z.infer<typeof registerSchema>
) => {
  try {
    const user = await prisma.user.create({
      data: {
        name: values.name,
        email: values.email.toLocaleLowerCase(),
        password: bcryptjs.hashSync(values.password, 10) //encriptar values.password
      },
      select:{
        id: true,
        name: true,
        email: true
      }

    });
    return {
      ok: true,
      user: user,
      message: 'Usuario registrado exitosamente'
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Error al registrar el usuario'
    };
  }
};


export const loginNewUser = async ({email,password}: z.infer<typeof signInSchema>) => {
  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false
    });
    return { success: true };
  } catch (error) {
   console.log(error);
    return { ok: false ,
      message: 'No se puedo iniciar sesión'
    };
  }
}