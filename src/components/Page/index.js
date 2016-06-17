import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';

import styles from './styles.styl';
import Header from 'components/Header';

@cssModules(styles)
class Page extends Component {
  static propTypes = {
    storageLoaded: PropTypes.bool.isRequired,
    children: PropTypes.element,
  };

  render() {
    if (this.props.storageLoaded) {
      return (
        <div styleName="page">
          <Header />
          {this.props.children}
        </div>
      );
    }

    return (
      <div styleName="page">
        <div>Loading</div>
      </div>
    );
  }
}

import { connect } from 'react-redux';

export default connect(
  state => ({
    storageLoaded: state.storage.loaded,
  }),
)(Page);
