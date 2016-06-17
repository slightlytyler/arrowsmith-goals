import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import cssModules from 'react-css-modules';
import classNames from 'classnames';

import styles from './styles.styl';
import { filters } from 'modules/goals/constants';

@cssModules(styles, { allowMultiple: true })
export class GoalsFilters extends Component {
  static propTypes = {
    remainingGoalsCount: PropTypes.number.isRequired,
    projectId: PropTypes.string.isRequired,
    activeFilter: PropTypes.oneOf(Object.values(filters)),
  };

  render() {
    const { remainingGoalsCount, projectId, activeFilter } = this.props;
    const route = filter => `/projects/${projectId}/goals/${filter}`;

    return (
      <div styleName="filters">
        <div styleName="container">
          <section
            styleName={classNames('remaining-count', {
              complete: remainingGoalsCount === 0,
            })}
          >
            {remainingGoalsCount} goals left
          </section>
          <section styleName="list">
            <Link
              to={route('active')}
              styleName={classNames('item', {
                active: activeFilter === filters.REMAINING_FILTER,
              })}
            >
              Active
            </Link>
            <Link
              to={route('complete')}
              styleName={classNames('item', {
                active: activeFilter === filters.COMPLETED_FILTER,
              })}
            >
              Complete
            </Link>
            <Link
              to={route('all')}
              styleName={classNames('item', {
                active: activeFilter === filters.ALL_FILTER,
              })}
            >
              All
            </Link>
          </section>
        </div>
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import {
  getRecordsById,
  getAllRecordIds,
  getRecordIdsByProject,
  getRemainingCollectionIds,
} from 'modules/goals/selectors';

const getProjectId = (state, props) => props.projectId;
const getRemainingGoalsCount = createSelector(
  getRecordsById,
  getAllRecordIds,
  getProjectId,
  (recordsById, recordIds, projectId) => getRemainingCollectionIds(
    recordsById,
    getRecordIdsByProject(recordsById, recordIds, projectId)
  ).length
);

export default connect(
  createStructuredSelector({ remainingGoalsCount: getRemainingGoalsCount })
)(GoalsFilters);
