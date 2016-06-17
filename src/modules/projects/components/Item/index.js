import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import Icon from 'react-svgcon';

import styles from './styles.styl';
import deleteIcon from 'assets/icons/delete.svg';
import editIcon from 'assets/icons/edit.svg';
import Input from './Input';

@cssModules(styles)
export class ProjectsItem extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    actions: PropTypes.shape({
      updateRecord: PropTypes.func.isRequired,
      deleteRecord: PropTypes.func.isRequired,
      viewRecord: PropTypes.func.isRequired,
    }),
  };

  state = {
    editing: false,
  };

  edit = () => this.setState({ editing: true });

  update = name => {
    this.props.actions.updateRecord(this.props.id, { name });
    this.setState({ editing: false });
  };

  delete = () => this.props.actions.deleteRecord(this.props.id, this.props.active);

  view = () => {
    if (!this.props.active) {
      this.props.actions.viewRecord(this.props.id);
    }
  };

  render() {
    if (this.state.editing) {
      return <Input name={this.props.name} actions={{ update: this.update }} />;
    }

    return (
      <div styleName={this.props.active ? 'item--active' : 'item'}>
        <div styleName="name" onClick={this.view}>
          {this.props.name}
        </div>
        <div styleName="delete" onClick={this.delete}>
          <Icon path={deleteIcon} color="currentColor" width="1em" />
        </div>
        <div styleName="edit" onClick={this.edit}>
          <Icon path={editIcon} color="currentColor" width="1em" />
        </div>
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { createStructuredActions } from 'helpers/actions';
import { findRecord } from 'modules/projects/selectors';
import { updateRecord, deleteRecord, viewRecord } from 'modules/projects/actions';
import { selectors as routerSelectors } from 'modules/router';

export default connect(
  (state, props) => ({
    ...findRecord(state, props.id),
    active: routerSelectors.getPathname(state).indexOf(`/projects/${props.id}`) === 0,
  }),
  createStructuredActions({ updateRecord, deleteRecord, viewRecord })
)(ProjectsItem);
