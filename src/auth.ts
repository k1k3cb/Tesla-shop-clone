import bcryptjs from 'bcryptjs';
import NextAuth from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import prisma from './lib/prisma';
import { signInSchema } from './lib/zod';
export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account'
  },
  callbacks: {
    jwt({ token, user }) {

      if (user) {
        token.data = user;
      }
            
      return token;
    },
    session({ session, token,user }) {

      console.log({ session, token, user });
      session.user = token.data as any;
      return session;
    }
  },
  providers: [
    credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {}
      },
      authorize: async credentials => {
        const { data, success } = signInSchema.safeParse(credentials);

        if (!success) {
          throw new Error('Invalid credentials');
        }

        //Buscar correo
        const user = await prisma.user.findUnique({
          where: {
            email: data.email.toLocaleLowerCase()
          }
        });

        if (!user) return null;

        //Comparar contraseña

        if (!bcryptjs.compareSync(data.password, user.password)) {
          return null;
        }

        //Devolver usuario

        const { password: _, ...userWithoutPassword } = user;       
        return userWithoutPassword;
      }
    })
  ]
});
