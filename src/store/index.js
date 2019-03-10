import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import { userReducer } from '@Reducers/userReducer';

const middleware = [];

export default createStore(
  combineReducers({
    user: userReducer
  }),
  composeWithDevTools(applyMiddleware(...middleware))
);
