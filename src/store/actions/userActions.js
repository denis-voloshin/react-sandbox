import { createAction } from 'redux-actions';

import { userActionTypes } from '@Store/constants';

export const setFirstName = createAction(userActionTypes.SET_FIRST_NAME);

export const setLastName = createAction(userActionTypes.SET_LAST_NAME);
