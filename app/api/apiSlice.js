import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logOut } from '../../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8080/api',
  credentials: 'include', //! will send back "httpOnly cookie" for every request
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log('result => ', result);

  if (result?.error?.status === 403) {
    console.log('sending refresh token...');
    //! send refresh token to get new access token
    const refreshResult = await baseQuery('/refresh-token', api, extraOptions);
    console.log('refreshResult =>', refreshResult);

    if (refreshResult?.data) {
      const email = api.getState().auth.email;
      //! store new token
      api.dispatch(setCredentials({ ...refreshResult.data, email }));
      //! retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({}),
});
