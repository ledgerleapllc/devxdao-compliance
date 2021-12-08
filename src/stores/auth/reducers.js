import { combineReducers } from 'redux';
import { createReducer } from '@shared/core/services/reducer-factory';

const userInitialState = null;
/* user reducer */
const setUser = (state, payload) => {
  return payload
};

const updateUser = (state, payload) => ({ ...state, ...payload });

const clearUser = state => userInitialState;

const userStrategies = {
  SET_USER: setUser,
  UPDATE_USER: updateUser,
  CLEAR_USER: clearUser,
  __default__: state => state,
};

export const user = createReducer(userStrategies, userInitialState);
/* end */


/* end user reducer */
const endUserInitialState = null;

const setEndUser = (state, payload) => {
  return payload
};

const clearEndUser = state => endUserInitialState;

const endUserStrategies = {
  SET_END_USER: setEndUser,
  CLEAR_END_USER: clearEndUser,
  __default__: state => state,
};

export const endUser = createReducer(endUserStrategies, endUserInitialState);
/* end */


/* settings reducer */
const settingsInitialState = null;

const setSettings = (state, payload) => ({ ...state, ...payload });

const settingsStrategies = {
  SET_SETTINGS: setSettings,
  __default__: state => state,
};

export const settings = createReducer(settingsStrategies, settingsInitialState);

export const authReducer = combineReducers({
  user,
  endUser,
  settings
});
