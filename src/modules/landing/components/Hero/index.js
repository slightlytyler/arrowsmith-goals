import React from 'react';
import cssModules from 'react-css-modules';

import styles from './styles.styl';

export function LandingHero() {
  return (
    <div styleName="hero">
      <span>Hero</span>
    </div>
  );
}

export default cssModules(LandingHero, styles);
