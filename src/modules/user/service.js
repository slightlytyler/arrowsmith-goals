import client from 'api/client';

export const createRecord = async payload => {
  const response = await client.post('user', 'users', payload);
  return response.data;
};

export const updateRecord = async (id, payload) => {
  const response = await client.put('user', `users/${id}`, payload);
  return response.data;
};

export const deleteRecord = async id => {
  const response = await client.delete('user', `users/${id}`);
  return response.data;
};

export const fetchRecord = async () => {
  const response = await client.get('user', 'getstatus');
  return response.data.user;
};

export const authorize = async (email, password) => {
  const response = await client.authorize({ email, password });
  const user = response.data;
  user.token = response.headers['x-stamplay-jwt'];

  client.registerToken(user.token);

  return user;
};

export const unauthorize = async () => {
  // stamplay forces redirect after unauthorize,
  // waiting on api changes
  // await client.unauthorize();
  client.unregisterToken();
};

export const createCustomer = async userId => {
  const response = await client.post('stripe', 'customers', { userId });
  return response.data;
};
