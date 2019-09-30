import { handleActions } from 'redux-actions';
import produce from 'immer';

import * as userActions from '@Actions/userActions';

const initialState = {
  firstName: 'Denis',
  lastName: 'Voloshin'
};

const userReducer = handleActions({
  [userActions.setFirstName](state, { payload: firstName }) {
    return produce(state, draft => {
      draft.firstName = firstName;
    });
  },
  [userActions.setLastName](state, { payload: lastName }) {
    return produce(state, draft => {
      draft.lastName = lastName;
    });
  }
}, initialState);

export { userReducer };
