import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../features/auth/authSlice';

export default function RequireAuth({ children }) {
  const router = useRouter();
  const token = useSelector(selectCurrentToken);

  useEffect(() => {
    if (!token) {
      router.replace('/login');
    }
  }, [token]);

  return children;
}
