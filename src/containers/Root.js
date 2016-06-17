import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { Root as NotificationsRoot } from 'modules/notifications';

import 'styles/app.styl';
import 'sweetalert/dist/sweetalert.css';

export default class Root extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    routes: PropTypes.element.isRequired,
    store: PropTypes.object.isRequired,
  };


  get content() {
    return (
      <Router history={this.props.history}>
        {this.props.routes}
      </Router>
    );
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <div>
          {this.content}
          <NotificationsRoot />
        </div>
      </Provider>
    );
  }
}
