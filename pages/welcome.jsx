import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectCurrentUser,
  selectCurrentToken,
} from '../features/auth/authSlice';
import Link from 'next/link';
import RequireAuth from '../components/RequireAuth';

export default function Welcome() {
  const email = useSelector((state) => state.auth.email);
  const token = useSelector((state) => state.auth.token);

  console.log('token (welcome) => ', token);
  const tokenAbbr = `${token.slice(0, 9)}...${token.slice(-9)}`;

  return (
    <RequireAuth>
      <section>
        <h1>{email ? `Welcome ${email}!` : 'Welcome Guest!'}</h1>
        <p>Token: {tokenAbbr}</p>
        <Link href="/users" passHref>
          <a>Go to Users List</a>
        </Link>
        <br />
        <Link href="/welcome" passHref>
          <a>Refresh</a>
        </Link>
      </section>
    </RequireAuth>
  );
}
