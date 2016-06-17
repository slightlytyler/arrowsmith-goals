import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';

import styles from './styles.styl';
import { components as projectsComponents } from 'modules/projects';

const {
  Root: ProjectsRoot,
  Empty: ProjectsEmpty,
} = projectsComponents;

@cssModules(styles)
export class Editor extends Component {
  static propTypes = {
    hasProjects: PropTypes.bool.isRequired,
    children: PropTypes.element,
  };

  render() {
    if (this.props.hasProjects) {
      return (
        <div styleName="editor">
          <ProjectsRoot />
          {this.props.children}
        </div>
      );
    }

    return (
      <div styleName="editor">
        <ProjectsRoot />
        <ProjectsEmpty />
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { getAllRecordIds } from 'modules/projects/selectors';

export default connect(
  state => ({ hasProjects: getAllRecordIds(state).length > 0 })
)(Editor);
