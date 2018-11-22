import { fromJS } from 'immutable';
import listApplicationReducer from '../reducer';

describe('listApplicationReducer', () => {
  it('returns the initial state', () => {
    expect(listApplicationReducer(fromJS({}), {})).toEqual(fromJS({}));
  });
});
