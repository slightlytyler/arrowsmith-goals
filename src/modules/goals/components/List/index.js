import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';

import styles from './styles.styl';
import GoalItem from '../Item';

@cssModules(styles)
export class GoalsList extends Component {
  static propTypes = {
    ids: PropTypes.array.isRequired,
  };

  render() {
    return (
      <div styleName="list">
        {this.props.ids.map(id => <GoalItem key={id} id={id} />)}
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { findCurrentCollection, getFilteredCollectionIds } from 'modules/goals/selectors';

const getActiveFilter = props => props.activeFilter;

export default connect(
  (state, props) => {
    const collection = findCurrentCollection(state);
    const collectionIds = collection ? collection.ids : [];
    const activeFilter = getActiveFilter(props);
    const filteredCollectionIds = getFilteredCollectionIds(state, collectionIds, activeFilter);

    return {
      ids: filteredCollectionIds,
    };
  }
)(GoalsList);
