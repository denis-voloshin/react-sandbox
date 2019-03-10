import * as R from 'ramda';
import { handleActions } from 'redux-actions';

import * as userActions from '@Actions/userActions';

const initialState = {
  firstName: 'Denis',
  lastName: 'Voloshin'
};

const userReducer = handleActions({
  [userActions.setFirstName]: (state, { payload: firstName }) => R.assoc('firstName', firstName, state),
  [userActions.setLastName]: (state, { payload: lastName }) => R.assoc('lastName', lastName, state)
}, initialState);

export { userReducer };
