import React from 'react';
import { Link } from 'react-router';
import cssModules from 'react-css-modules';

import styles from './styles.styl';

export function LandingTrial() {
  return (
    <div styleName="trial">
      <span styleName="call-to-action">Start your free trial now.</span>
      <span styleName="reinforcement">One month free. No credit card required.</span>
      <Link to="/auth/sign-up" styleName="button">Try goals.com for free</Link>
    </div>
  );
}

export default cssModules(LandingTrial, styles);
