import React from 'react';
import cssModules from 'react-css-modules';

import styles from './styles.styl';

export function ProjectsEmpty() {
  return (
    <div styleName="prompt">
      No projects yet... Add one!
    </div>
  );
}

export default cssModules(ProjectsEmpty, styles);
