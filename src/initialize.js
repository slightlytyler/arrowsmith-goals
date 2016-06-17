import injectTapEventPlugin from 'react-tap-event-plugin';
import stripe from 'stripe';
import { STRIPE_KEY } from 'config';

export default () => {
  injectTapEventPlugin();
  stripe.setPublishableKey(STRIPE_KEY);
};
