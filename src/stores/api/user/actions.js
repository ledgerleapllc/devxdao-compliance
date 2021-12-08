export const updateAddress = (payload, resolve = () => {}, reject = () => {}) => ({
  type: 'UPDATE_ADDRESS',
  payload,
  resolve, 
  reject,
});

export const getUserAddress = (resolve = () => {}, reject = () => {}) => ({
  type: 'GET_USER_ADDRESS',
  resolve,
  reject,
});
