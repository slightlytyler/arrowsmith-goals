import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import keycode from 'keycode';

import styles from './styles.styl';

@cssModules(styles)
export class ProjectsCreator extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      createRecord: PropTypes.func.isRequired,
    }),
  };

  handleKeyDown = e => {
    const { which, target } = e;

    if (keycode(which) === 'enter') {
      this.props.actions.createRecord(target.value);
      target.value = '';
    }
  };

  render() {
    return (
      <div>
        <input
          ref="input"
          styleName="input"
          placeholder="+ Add Project"
          onKeyDown={this.handleKeyDown}
        />
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { createStructuredActions } from 'helpers/actions';
import { createRecord } from 'modules/projects/actions';

export default connect(
  undefined,
  createStructuredActions({ createRecord })
)(ProjectsCreator);
