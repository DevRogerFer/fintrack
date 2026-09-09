import { protectedApi, publicApi } from '@/lib/axios';

export const UserService = {
  signup: async (input) => {
    const response = await publicApi.post('/users', {
      first_name: input.first_name,
      last_name: input.last_name,
      email: input.email,
      password: input.password,
    });
    return {
      id: response.data.id,
      email: response.data.email,
      first_name: response.data.first_name,
      last_name: response.data.last_name,
      tokens: response.data.tokens,
    };
  },
  login: async (input) => {
    const response = await publicApi.post('/users/login', {
      email: input.email,
      password: input.password,
    });
    return {
      id: response.data.id,
      email: response.data.email,
      first_name: response.data.first_name,
      last_name: response.data.last_name,
      tokens: response.data.tokens,
    };
  },
  me: async () => {
    const response = await protectedApi.get('/users/me');
    return {
      id: response.data.id,
      email: response.data.email,
      first_name: response.data.first_name,
      last_name: response.data.last_name,
    };
  },
};
