import React from 'react';
import cssModules from 'react-css-modules';

import styles from './styles.styl';
import { Root as SubscriptionsRoot } from 'modules/subscriptions';
import { Root as CardsRoot } from 'modules/cards';

function UserBilling() {
  return (
    <div styleName="content">
      <section styleName="section">
        <header styleName="header">Subscription</header>
        <SubscriptionsRoot />
      </section>
      <section styleName="section">
        <header styleName="header">Cards</header>
        <CardsRoot />
      </section>
    </div>
  );
}

export default cssModules(UserBilling, styles);
