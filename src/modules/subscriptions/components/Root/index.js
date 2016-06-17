import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import moment from 'moment';

import styles from './styles.styl';

@cssModules(styles)
export class SubscriptionsRoot extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    status: PropTypes.string,
    plan: PropTypes.string,
    amount: PropTypes.number,
    start: PropTypes.number,
    periodStart: PropTypes.number,
    periodEnd: PropTypes.number,
    actions: PropTypes.shape({
      fetchRecord: PropTypes.func.isRequired,
    }),
  };

  componentWillMount() {
    this.props.actions.fetchRecord(this.props.id);
  }

  formatDate = date => moment.unix(date).format('MMM Do YY');

  render() {
    return (
      <div styleName="container">
        <header styleName="header">
          <section>ID: {this.props.id}</section>
          <section
            styleName={
              this.props.status === 'active'
              ? 'status--active'
              : 'status'
            }
          >
            {this.props.status}
          </section>
        </header>
        <div styleName="content">
          <section styleName="row">
            <label styleName="label">Plan</label>
            <div styleName="value">
              {this.props.plan} - ${(this.props.amount / 100).toFixed(2)} a month
            </div>
          </section>
          <section styleName="row">
            <label styleName="label">Current Period</label>
            <div styleName="value">
              {this.formatDate(this.props.periodStart)} - {this.formatDate(this.props.periodEnd)}
            </div>
          </section>
        </div>
        <footer styleName="footer">Subscribed since {this.formatDate(this.props.start)}</footer>
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { createStructuredActions } from 'helpers/actions';
import { findRecord } from 'modules/subscriptions/selectors';
import { fetchRecord } from 'modules/subscriptions/actions';
import { selectors as userSelectors } from 'modules/user';

export default connect(
  state => {
    const id = userSelectors.getSubscriptionId(state);
    const subscription = findRecord(state, id);

    if (subscription) {
      return {
        id,
        status: subscription.status,
        plan: subscription.plan.name,
        amount: subscription.plan.amount,
        start: subscription.start,
        periodStart: subscription.current_period_start,
        periodEnd: subscription.current_period_end,
      };
    }

    return { id };
  },
  createStructuredActions({ fetchRecord })
)(SubscriptionsRoot);
