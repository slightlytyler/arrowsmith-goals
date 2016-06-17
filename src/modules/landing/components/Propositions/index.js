import React from 'react';
import cssModules from 'react-css-modules';

import styles from './styles.styl';

export function LandingPropositions() {
  return (
    <div styleName="propositions">
      <span>Propositions</span>
    </div>
  );
}

export default cssModules(LandingPropositions, styles);
