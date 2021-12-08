import { combineReducers } from 'redux';
import { apiControllerReducer } from './common/reducers';
import { authReducer } from './auth/reducers';

const appReducer = combineReducers({
  authReducer,
  apiControllerReducer
});

export default appReducer;
