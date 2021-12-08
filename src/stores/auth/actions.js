export const getGlobalSettings = (payload, resolve = () => {}, reject = () => {}) => ({
  type: 'GET_GLOBAL_SETTINGS',
  payload,
  resolve, 
  reject,
});

export const setSettings = payload => ({
  type: 'SET_SETTINGS',
  payload,
});

export const login = (payload, resolve = () => {}, reject = () => {}) => ({
  type: 'LOGIN',
  payload,
  resolve,
  reject,
});

export const getUserInfo = (payload, resolve = () => {}, reject = () => {}) => ({
  type: 'GET_USER_INFO',
  payload,
  resolve,
  reject,
});

export const changePassword = (payload, resolve = () => {}, reject = () => {}) => ({
  type: 'CHANGE_PASSWORD',
  payload,
  resolve,
  reject,
});

export const logout = (resolve = () => {}, reject = () => {}) => ({
  type: 'LOGOUT',
  resolve,
  reject,
});

export const setUser = payload => ({
  type: 'SET_USER',
  payload,
});

export const updateUser = payload => ({
  type: 'UPDATE_USER',
  payload,
});

export const clearUser = () => ({
  type: 'CLEAR_USER',
});

export const endUserLogin = (payload, resolve = () => {}, reject = () => {}) => ({
  type: 'END_USER_LOGIN',
  payload,
  resolve,
  reject,
});

export const setEndUser = payload => ({
  type: 'SET_END_USER',
  payload,
});

export const clearEndUser = () => ({
  type: 'CLEAR_END_USER',
});
