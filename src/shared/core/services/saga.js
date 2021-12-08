import { ApiService } from './api';
import { logout } from '@stores/auth/middlewares';

export class ErrorHandler {
  data;
  statusCode;

  constructor(status, data) {
    this.statusCode = status;
    this.data = data;
  }
}

const apiService = new ApiService();
export function* get(url, params = {}, headers = {}) {
  try {
    const res = yield apiService.doGet(url, params, headers);
    return res.data;
  } catch (e) {
    if (+e.response.status === 401) {
      localStorage.clear();
      yield logout();
    }
    throw new ErrorHandler(e.response.status, e.response.data);
  }
}

export function* post(url, params = {}, headers = {}) {
  try {
    const res = yield apiService.doPost(url, params, headers);
    return res.data;
  } catch (e) {
    if (+e.response.status === 401) {
      localStorage.clear();
      yield logout();
    }
    throw new ErrorHandler(e.response.status, e.response.data);
  }
}

export function* put(url, params = {}, headers = {}) {
  try {
    const res = yield apiService.doPut(url, params, headers);
    return res.data;
  } catch (e) {
    if (+e.response.status === 401) {
      localStorage.clear();
      yield logout();
    }
    throw new ErrorHandler(e.response.status, e.response.data);
  }
}

export function* destroy(url, params = {}, headers = {}) {
  try {
    const res = yield apiService.doDelete(url, params, headers);
    return res.data;
  } catch (e) {
    if (+e.response.status === 401) {
      localStorage.clear();
      yield logout();
    }
    throw new ErrorHandler(e.response.status, e.response.data);
  }
}
