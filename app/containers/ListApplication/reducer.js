/*
 *
 * ListApplication reducer
 *
 */

import { fromJS } from 'immutable';
import * as c from './constants';

export const initialState = fromJS({
  list: [],
});

function listApplicationReducer(state = initialState, action) {
  switch (action.type) {
    case c.ADD_NEW_LIST: {
      const list = [...state.get('list')];
      list.push(action.payload);
      return state.set('list', list);
    }
    case c.EDIT_LIST: {
      const { selectedItem, item } = action.payload;
      const updatedList = [...state.get('list')];
      const selected = { ...updatedList[selectedItem] };
      selected.item = item;
      updatedList[selectedItem] = selected;
      return state.set('list', updatedList);
    }

    case c.DELETE_LIST: {
      const index = action.payload.selected_item;
      const deleteList = [...state.get('list')];
      deleteList.splice(index, 1);
      return state.set('list', deleteList);
    }

    default:
      return state;
  }
}

export default listApplicationReducer;
