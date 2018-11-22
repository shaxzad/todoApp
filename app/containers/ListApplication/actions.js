/*
 *
 * ListApplication actions
 *
 */

import * as c from './constants';

export const addItemAction = payload => ({
  type: c.ADD_NEW_LIST,
  payload,
});

export const editItemAction = payload => ({
  type: c.EDIT_LIST,
  payload,
});

export const deleteItemAction = payload => ({
  type: c.DELETE_LIST,
  payload,
});

export const submitAction = () => ({
  type: c.SUBMIT_LISTS,
});
