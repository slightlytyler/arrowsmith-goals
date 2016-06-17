import createService from 'api/service';
import { service as userService } from 'modules/user';
import { service as cardsService } from 'modules/cards';

const endpoint = userId => `customers/${userId}/subscriptions`;
const service = createService(['stripe', endpoint]);

export const createRecord = async (userId, planId, card, address) => {
  await userService.createCustomer(userId);
  await cardsService.createRecord(userId, card);

  const subscription = await service(userId).createRecord({ planId });

  await userService.updateRecord(userId, { address, subscriptionId: subscription.id });

  return subscription;
};

export const updateRecord = (subscriptionId, userId, payload) => (
  service(userId).updateRecord(subscriptionId, payload)
);

export const deleteRecord = (subscriptionId, userId) => (
  service(userId).deleteRecord(subscriptionId)
);

export const fetchRecord = (subscriptionId, userId) => service(userId).fetchRecord(subscriptionId);
