import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import { isEqual } from 'lodash';

import styles from './styles.styl';
import { filters } from 'modules/goals/constants';
import GoalCreator from '../Creator';
import GoalList from '../List';
import GoalFilters from '../Filters';

@cssModules(styles)
export class GoalsRoot extends Component {
  static propTypes = {
    activeFilter: PropTypes.oneOf(Object.values(filters)).isRequired,
    projectId: PropTypes.string.isRequired,
    query: PropTypes.object,
    totalPages: PropTypes.number,
    actions: PropTypes.shape({
      fetchCollection: PropTypes.func.isRequired,
    }),
  };

  componentWillMount() {
    this.props.actions.fetchCollection({
      projectId: this.props.projectId,
      ...this.props.query,
    });
  }

  componentWillReceiveProps(nextProps) {
    const diffProjectId = this.props.projectId !== nextProps.projectId;
    const diffQuery = !isEqual(this.props.query, nextProps.query);

    if (diffProjectId || diffQuery) {
      this.props.actions.fetchCollection({
        projectId: nextProps.projectId,
        ...nextProps.query,
      });
    }
  }

  render() {
    const { activeFilter, projectId } = this.props;

    return (
      <div styleName="root">
        <GoalCreator projectId={projectId} />
        <GoalFilters projectId={projectId} activeFilter={activeFilter} />
        <GoalList projectId={projectId} activeFilter={activeFilter} />
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { createStructuredActions } from 'helpers/actions';
import { fetchCollection } from 'modules/goals/actions';
import { selectors as routerSelectors } from 'modules/router';

const getActiveFilter = (state, props) => props.route.filter;
const getProjectId = (state, props) => props.params.projectId;

export default connect(
  createStructuredSelector({
    activeFilter: getActiveFilter,
    projectId: getProjectId,
    query: routerSelectors.getQuery,
  }),
  createStructuredActions({
    fetchCollection,
  })
)(GoalsRoot);
