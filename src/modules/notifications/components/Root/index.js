import React, { Component, PropTypes } from 'react';
import NotificationSystem from 'react-notification-system';

export class NotificationsRoot extends Component {
  static propTypes = {
    notifications: PropTypes.array.isRequired,
    actions: PropTypes.shape({
      pop: PropTypes.func.isRequired,
    }),
  };

  componentDidMount() {
    const { addNotification, removeNotification } = this.refs.notificationSystem;
    this.addNotification = addNotification;
    this.removeNotification = removeNotification;
  }

  componentWillReceiveProps(nextProps) {
    const { notifications } = nextProps;

    if (notifications.length) {
      notifications.forEach(notification => {
        this.addNotification(notification);
        this.props.actions.pop(notification.uid);
      });
    }
  }

  render() {
    return (
      <div>
        <NotificationSystem ref="notificationSystem" />
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { createStructuredActions } from 'helpers/actions';
import { getSubstate } from 'modules/notifications/selectors';
import { pop } from 'modules/notifications/actions';

export default connect(
  createStructuredSelector({ notifications: getSubstate }),
  createStructuredActions({ pop })
)(NotificationsRoot);
