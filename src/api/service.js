import { mapKeys, mapValues, snakeCase, camelCase } from 'lodash';
import client from './client';

// Serializing / Deserializing
const isRelationshipId = key => key !== 'id' && key !== '_id' && key.substr(-2) === 'Id';

const deserializeRecord = record => mapValues(record, (value, key) => {
  if (isRelationshipId(key) && Array.isArray(value)) return value[0];
  return value;
});

const deserialize = payload => {
  if (Array.isArray(payload)) return payload.map(deserializeRecord);
  return deserializeRecord(payload);
};

const defaultQueryKeys = ['page', 'perPage', 'totalPages', 'totalElements'];

const serializeQuery = query => mapKeys(query, (value, key) => (
  defaultQueryKeys.indexOf(key) !== -1
  ? snakeCase(key)
  : key
));

const deserializeQuery = query => mapKeys(query, (value, key) => camelCase(key));

// Methods
export const methods = {
  createRecord: async (resource, endpoint, payload) => {
    const response = await client.post(resource, endpoint, payload);
    return deserialize(response.data);
  },
  updateRecord: async (resource, endpoint, id, payload) => {
    const response = await client.patch(resource, `${endpoint}/${id}`, payload);
    return deserialize(response.data);
  },
  deleteRecord: async (resource, endpoint, id) => {
    const response = await client.delete(resource, `${endpoint}/${id}`);
    return deserialize(response.data);
  },
  fetchRecord: async (resource, endpoint, id) => {
    const response = await client.get(resource, `${endpoint}/${id}`);
    return deserialize(response.data);
  },
  fetchCollection: async (resource, endpoint, query) => {
    const response = await client.get(resource, `${endpoint}/find/owner`, serializeQuery(query));
    return {
      data: deserialize(response.data.data),
      pagination: deserializeQuery(response.data.pagination),
    };
  },
};

// Constructor
export const createService = config => {
  const resource = Array.isArray(config) ? config[0] : 'cobject';
  const endpoint = Array.isArray(config) ? config[1] : config;

  if (typeof endpoint === 'function') {
    return endpointArgs => {
      const options = [resource, endpoint(endpointArgs)];

      return {
        createRecord: payload => methods.createRecord(...options, payload),
        updateRecord: (id, payload) => methods.updateRecord(...options, id, payload),
        deleteRecord: id => methods.deleteRecord(...options, id),
        fetchRecord: id => methods.fetchRecord(...options, id),
        fetchCollection: query => methods.fetchCollection(...options, query),
      };
    };
  }

  const options = [resource, endpoint];

  return {
    createRecord: payload => methods.createRecord(...options, payload),
    updateRecord: (id, payload) => methods.updateRecord(...options, id, payload),
    deleteRecord: id => methods.deleteRecord(...options, id),
    fetchRecord: id => methods.fetchRecord(...options, id),
    fetchCollection: query => methods.fetchCollection(...options, query),
  };
};

export default createService;
