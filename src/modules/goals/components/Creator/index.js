import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import Icon from 'react-svgcon';

import styles from './styles.styl';
import plusIcon from 'assets/icons/plus.svg';
import Input from './Input';

@cssModules(styles)
export class GoalsCreator extends Component {
  static propTypes = {
    projectId: PropTypes.string.isRequired,
    actions: PropTypes.shape({
      createRecord: PropTypes.func.isRequired,
    }),
  };

  state = {
    active: false,
  };

  placeholder = 'Add new goal';

  activate = () => {
    if (!this.state.active) {
      this.setState({ active: true });
    }
  }

  create = text => {
    if (text) {
      this.props.actions.createRecord(this.props.projectId, text);
    }

    this.setState({ active: false });
  }

  renderPlaceholder() {
    return (
      <div styleName="content">
        <section styleName="add--icon">
          <Icon path={plusIcon} color="#1EB5F9" width="1em" />
        </section>
        <section styleName="prompt">
          {this.placeholder}
        </section>
      </div>
    );
  }

  render() {
    if (this.state.active) {
      return (
        <div styleName="creator--editing">
          <Input placeholder={this.placeholder} actions={{ submit: this.create }} />
        </div>
      );
    }

    return (
      <div styleName="creator" onClick={this.activate}>
        {this.renderPlaceholder()}
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { createRecord } from 'modules/goals/actions';
import { createStructuredActions } from 'helpers/actions';

export default connect(
  undefined,
  createStructuredActions({ createRecord })
)(GoalsCreator);
