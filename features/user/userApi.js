import { apiSlice } from '../../app/api/apiSlice';

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/get/user',
    }),
  }),
});

export const { useGetUsersQuery } = userApi;
