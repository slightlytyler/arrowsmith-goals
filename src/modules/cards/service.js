import stripe from 'stripe';
import { mapKeys, snakeCase, camelCase } from 'lodash';
import client from 'api/client';

const deserializeRecord = response => {
  const record = mapKeys(response.data, (value, key) => camelCase(key));
  record.id = record.cardId;
  delete record.cardId;

  return record;
};

export const createRecord = async (userId, card) => {
  const token = await new Promise((resolve, reject) =>
    stripe.card.createToken(
      mapKeys(card, (value, key) => snakeCase(key)
    ),
    (status, response) => {
      if (response.error) reject(response.error.message);
      else resolve(response.id);
    })
  );

  const response = await client.post('stripe', `customers/${userId}/cards`, { token });
  return deserializeRecord(response);
};

export const updateRecord = async (userId, card) => {
  const response = await client.put('stripe', `customers/${userId}/cards`, card);
  return deserializeRecord(response);
};

export const fetchRecord = async userId => {
  const response = await client.get('stripe', `customers/${userId}/cards`);
  return deserializeRecord(response);
};
