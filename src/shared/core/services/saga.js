import { ApiService } from './api';
import { logout } from '@stores/auth/actions';
import { put as putSaga } from 'redux-saga/effects';

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
    if (res.data?.message === 'Unauthenticated.') {
      localStorage.clear();
      yield putSaga(logout({}));
      window.location.href = '/auth/login';
      const e = {
        response: { status : 401, data: res.data },
      }
      throw e;
    }
    return res.data;
  } catch (e) {
    throw new ErrorHandler(e.response.status, e.response.data);
  }
}

export function* post(url, params = {}, headers = {}) {
  try {
    const res = yield apiService.doPost(url, params, headers);
    if (res.data?.message === 'Unauthenticated.') {
      localStorage.clear();
      yield putSaga(logout({}));
      window.location.href = '/auth/login';
      const e = {
        response: { status : 401, data: res.data },
      }
      throw e;
    }
    return res.data;
  } catch (e) {
    throw new ErrorHandler(e.response.status, e.response.data);
  }
}

export function* put(url, params = {}, headers = {}) {
  try {
    const res = yield apiService.doPut(url, params, headers);
    if (res.data?.message === 'Unauthenticated.') {
      localStorage.clear();
      yield putSaga(logout({}));
      window.location.href = '/auth/login';
      const e = {
        response: { status : 401, data: res.data },
      }
      throw e;
    }
    return res.data;
  } catch (e) {
    throw new ErrorHandler(e.response.status, e.response.data);
  }
}

export function* destroy(url, params = {}, headers = {}) {
  try {
    const res = yield apiService.doDelete(url, params, headers);
    if (res.data?.message === 'Unauthenticated.') {
      localStorage.clear();
      yield putSaga(logout({}));
      window.location.href = '/auth/login';
      const e = {
        response: { status : 401, data: res.data },
      }
      throw e;
    }
    return res.data;
  } catch (e) {
    throw new ErrorHandler(e.response.status, e.response.data);
  }
}
