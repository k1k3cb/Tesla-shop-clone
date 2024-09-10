// https://tailwindcomponents.com/component/hoverable-table

import Title from '@/components/ui/title/Title';
import { UsersTable } from '@/components/users/UsersTable';
import { getPaginatedUsers } from '@/src/actions/users/get-paginted-users';
import { redirect } from 'next/navigation';

export default async function UsersPage() {
  const { ok, users = [] } = await getPaginatedUsers();

  if (!ok) redirect('/auth/login');

  return (
    <>
      <Title title='Mantenimiento de usuarios' />

      <div className='mb-10'>
        <UsersTable users={users} />
      </div>
    </>
  );
}
