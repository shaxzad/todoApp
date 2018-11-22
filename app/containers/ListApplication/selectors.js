import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the listApplication state domain
 */

const selectListApplicationDomain = state =>
  state.get('listApplication', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ListApplication
 */

const makeSelectListApplication = () =>
  createSelector(selectListApplicationDomain, substate => substate.toJS());

export default makeSelectListApplication;
export { selectListApplicationDomain };
