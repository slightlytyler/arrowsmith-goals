import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';

import styles from './styles.styl';
import ProjectItem from '../Item';

@cssModules(styles)
export class ProjectsList extends Component {
  static propTypes = {
    ids: PropTypes.array.isRequired,
  };

  render() {
    return (
      <div styleName="list">
        {this.props.ids.map(id => <ProjectItem key={id} id={id} />)}
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getAllRecordIds } from 'modules/projects/selectors';

export default connect(
  createStructuredSelector({ ids: getAllRecordIds })
)(ProjectsList);
