import { addItemAction } from '../actions';
import { ADD_NEW_LIST } from '../constants';

describe('ListApplication actions', () => {
  describe('Add item Action', () => {
    it('has a type of ADD_NEW_LIST', () => {
      const expected = {
        type: ADD_NEW_LIST,
      };
      expect(addItemAction()).toEqual(expected);
    });
  });
});
