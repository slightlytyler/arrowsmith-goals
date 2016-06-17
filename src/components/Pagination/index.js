import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';

import styles from './styles.styl';

@cssModules(styles)
export default class Pagination extends Component {
  static propTypes = {
    page: PropTypes.string.isRequired,
    perPage: PropTypes.string.isRequired,
    totalPages: PropTypes.string.isRequired,

  };

  render() {
    const { page, perPage, totalPages } = this.props;

    return (
      <div>{page}:{perPage}:{totalPages}</div>
    );
  }
}
