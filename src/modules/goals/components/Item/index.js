import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import Icon from 'react-svgcon';

import styles from './styles.styl';
import checkIcon from 'assets/icons/check.svg';
import deleteIcon from 'assets/icons/delete.svg';
import Input from './Input';

@cssModules(styles)
export class GoalsItem extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired,
    actions: PropTypes.shape({
      updateRecord: PropTypes.func.isRequired,
      deleteRecord: PropTypes.func.isRequired,
      toggleRecord: PropTypes.func.isRequired,
    }),
  };

  state = {
    editing: false,
  };

  edit = () => this.setState({ editing: true });

  save = text => {
    if (text) {
      this.props.actions.updateRecord({ text });
      this.setState({ editing: false });
    } else {
      this.props.actions.deleteRecord();
    }
  }

  delete = () => this.props.actions.deleteRecord();

  toggle = () => this.props.actions.toggleRecord();

  renderContent() {
    return (
      <div styleName="content" onDoubleClick={this.edit}>
        <div styleName="checkbox">
          <input
            styleName="input"
            type="checkbox"
            id={`${this.props.id}-checkbox`}
            checked={this.props.complete}
            onChange={this.toggle}
          />
          <label
            styleName="label"
            htmlFor={`${this.props.id}-checkbox`}
          >
            <span styleName="check">
              <Icon path={checkIcon} color="white" width="100%" />
            </span>
          </label>
        </div>
        <div>
          {this.props.text}
        </div>
        <div styleName="delete" onClick={this.delete}>
          <Icon path={deleteIcon} color="currentColor" width="1em" />
        </div>
      </div>
    );
  }

  render() {
    if (this.state.editing) {
      return (
        <div styleName="item">
          <Input
            value={this.props.text}
            actions={{ save: this.save }}
          />
        </div>
      );
    }

    return (
      <div styleName="item">
        {this.renderContent()}
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { createStructuredActions } from 'helpers/actions';
import { findRecord } from 'modules/goals/selectors';
import { updateRecord, deleteRecord, toggleRecord } from 'modules/goals/actions';

export default connect(
  (state, props) => ({ ...findRecord(state, props.id) }),
  createStructuredActions({ updateRecord, deleteRecord, toggleRecord }, 'id')
)(GoalsItem);
