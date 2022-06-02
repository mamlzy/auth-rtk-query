import { useGetUsersQuery } from '../features/user/userApi';
import Link from 'next/link';
import RequireAuth from '../components/RequireAuth';

export default function Users() {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();

  return (
    <RequireAuth>
      {isLoading && <h1>Loading...</h1>}
      {isSuccess && !isError && (
        <section>
          <h1>Users List</h1>

          <ul>
            {users.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>

          <Link href="/welcome" passHref>
            <a>Go to Welcome Page</a>
          </Link>
        </section>
      )}
      {isError && <h1>{JSON.stringify(error)}</h1>}
    </RequireAuth>
  );
}
