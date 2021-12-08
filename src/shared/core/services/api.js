import axios from 'axios';
import { getToken, getUpdateAddressToken } from './auth';

function createURL(uri) {
  let paramsUrl;
  if (typeof uri[uri.length - 1] !== 'string') {
    paramsUrl = uri.pop();
    let url = uri.join('/');
    Object.keys(paramsUrl).forEach(x => {
      url = url.replace(`:${x}`, paramsUrl[x]);
    });
    return url;
  }
  return uri.join('/');
}
const API_DOMAIN = process.env.REACT_APP_BASE_URL;

export class ApiService {
  axiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: `${API_DOMAIN}/api/`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.axiosInstance.interceptors.request.use(_config => {
      const token = getToken();
      _config.headers.Authorization = `Bearer ${token ? token : getUpdateAddressToken()}`;
      return _config;
    });
  }

  doGet(uri, moreConfigs = {}) {
    return this.axiosInstance.get(createURL(uri), moreConfigs);
  }

  doPost(uri, data = {}, moreConfigs = {}) {
    return this.axiosInstance.post(createURL(uri), data, moreConfigs);
  }

  doPut(uri, data = {}, moreConfigs = {}) {
    return this.axiosInstance.put(createURL(uri), data, moreConfigs);
  }

  doDelete(uri, data = {}, moreConfigs = {}) {
    return this.axiosInstance.delete(createURL(uri), data, moreConfigs);
  }
}
