import React, { PropTypes } from 'react';
import cssModules from 'react-css-modules';

import styles from './styles.styl';

function UserDashboard({ children }) {
  return (
    <div styleName="dashboard">{children}</div>
  );
}

UserDashboard.propTypes = {
  children: PropTypes.element,
};

export default cssModules(UserDashboard, styles);
