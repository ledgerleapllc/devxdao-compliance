

export const getUsers = (payload, user, resolve = () => {}, reject = () => {}) => ({
  type: 'GET_USERS',
  payload,
  user,
  resolve, 
  reject,
});

/* API FOR COMPLIANCE ADMIN */
export const getCMs = (payload, resolve = () => {}, reject = () => {}) => ({
  type: 'GET_CMS',
  payload,
  resolve, 
  reject,
});

export const addCM = (payload, resolve = () => {}, reject = () => {}) => ({
  type: 'ADD_CM',
  payload,
  resolve, 
  reject,
});

export const revokeCM = (payload, resolve = () => {}, reject = () => {}) => ({
  type: 'REVOKE_CM',
  payload,
  resolve, 
  reject,
});

export const activateCM = (payload, resolve = () => {}, reject = () => {}) => ({
  type: 'ACTIVATE_CM',
  payload,
  resolve, 
  reject,
});

export const resetPassword = (payload, resolve = () => {}, reject = () => {}) => ({
  type: 'RESET_PASSWORD',
  payload,
  resolve, 
  reject,
});

export const updateComplianceUser = (payload, resolve = () => {}, reject = () => {}) => ({
  type: 'UPDATE_COMPLIANCE_USER',
  payload,
  resolve, 
  reject,
});

export const updatePaidUser = (payload, resolve = () => {}, reject = () => {}) => ({
  type: 'UPDATE_PAID_USER',
  payload,
  resolve, 
  reject,
});

export const updateAddressUser = (payload, resolve = () => {}, reject = () => {}) => ({
  type: 'UPDATE_ADDRESS_USER',
  payload,
  resolve, 
  reject,
});
