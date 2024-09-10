import LoginForm from '@/components/auth/LoginForm';
import { titleFont } from '@/src/config/fonts';

export default function LoginPage() {
  return (
    <div className='flex flex-col min-h-screen pt-32 sm:pt-52'>
      <h1 className={`${titleFont.className} text-4xl mb-5`}>Ingresar</h1>

      <LoginForm />
    </div>
  );
}
