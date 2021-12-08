export const setToken = token => {
  localStorage.setItem('ACCESS-TOKEN', token);
};

export const removeToken = () => {
  localStorage.removeItem('ACCESS-TOKEN');
};

export const getToken = () => localStorage.getItem('ACCESS-TOKEN');


export const setUpdateAddressToken = token => {
  localStorage.setItem('UPDATE-ADDRESS-ACCESS-TOKEN', token);
};

export const removeUpdateAddressToken = () => {
  localStorage.removeItem('UPDATE-ADDRESS-ACCESS-TOKEN');
};

export const getUpdateAddressToken = () => localStorage.getItem('UPDATE-ADDRESS-ACCESS-TOKEN');
