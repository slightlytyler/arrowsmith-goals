// JWT Handling
let token;
export const registerToken = newToken => { token = newToken; };
export const unregisterToken = () => { token = undefined; };

// HTTP config
import path from 'path';
import axios from 'axios';
import { API_VERSION, STAMPLAY_APP_ID } from 'config';

const baseUrl = `${STAMPLAY_APP_ID}.stamplayapp.com`;
const apiBaseUrl = path.join(baseUrl, 'api');
const authBaseUrl = path.join(baseUrl, 'auth');

const buildUrl = url => `https://${url}`;

export const buildApiUrl = (resource, endpoint) => (
  buildUrl(path.join(apiBaseUrl, resource, API_VERSION, endpoint))
);

export const buildAuthUrl = endpoint => (
  buildUrl(path.join(authBaseUrl, API_VERSION, endpoint))
);

export const buildResourceUrl = endpoint => buildApiUrl('cobject', endpoint);

export const buildHeaders = (headers = {}) => {
  if (token) {
    return { 'x-stamplay-jwt': token, ...headers };
  }

  return headers;
};

// Methods
export const methods = {
  get: (resource, endpoint, queryParams) => axios.get(buildApiUrl(resource, endpoint), {
    headers: buildHeaders(),
    params: queryParams,
  }),
  post: (resource, endpoint, payload) => (
    axios.post(buildApiUrl(resource, endpoint), payload, {
      headers: buildHeaders(),
    })
  ),
  put: (resource, endpoint, payload) => (
    axios.put(buildApiUrl(resource, endpoint), payload, {
      headers: buildHeaders(),
    })
  ),
  patch: (resource, endpoint, payload) => (
    axios.patch(buildApiUrl(resource, endpoint), payload, {
      headers: buildHeaders(),
    })
  ),
  delete: (resource, endpoint) => (
    axios.delete(buildApiUrl(resource, endpoint), {
      headers: buildHeaders(),
    })
  ),
  authorize: payload => axios.post(buildAuthUrl('local/login'), payload),
  unauthorize: () => axios.get(buildAuthUrl('logout'), {
    headers: buildHeaders(),
  }),
};

export default { ...methods, registerToken, unregisterToken };
