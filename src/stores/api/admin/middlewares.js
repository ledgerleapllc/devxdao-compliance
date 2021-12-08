import { put, takeLatest, all, delay, debounce } from 'redux-saga/effects';
import { get, post, ErrorHandler } from '@shared/core/services/saga';
import { saveApiResponseError } from '../../common/actions';
import qs from 'qs';

export function* addCM({ payload, resolve, reject }) {
  try {
    const res = yield post([`compliance/admin/users/create-cm-user`], payload);
    if (!res.success) throw new ErrorHandler(400, { message: res.message }); 
    resolve(res);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* getUsers({ payload, user, resolve, reject }) {
  try {
    const query = qs.stringify(payload, { skipNulls: true });
    let res;
    if (user.is_super_admin) {
      res = yield get([`compliance/admin/users?${query}`]);
    } else {
      res = yield get([`compliance/user/all?${query}`]);
    }
    yield delay(500); // => this need for scroll loadmore.
    resolve(res.users, !res.finished);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* getCMs({ payload, resolve, reject }) {
  try {
    const query = qs.stringify({ limit: 9999, ...payload }, { skipNulls: true });
    const res = yield get([`compliance/admin/users?${query}`]);
    const temp = res.users.map(x => ({
      label: x.email,
      value: x.id
    }))
    resolve(temp);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* revokeCM({ payload, resolve, reject }) {
  try {
    const res = yield post([`compliance/admin/users/${payload.id}/revoke`]);
    resolve(res);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* activateCM({ payload, resolve, reject }) {
  try {
    const res = yield post([`compliance/admin/users/${payload.id}/undo-revoke`]);
    resolve(res);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* resetPassword({ payload, resolve, reject }) {
  try {
    const res = yield post([`compliance/admin/users/${payload.id}/reset-password`], payload);
    resolve(res);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* updateComplianceUser({ payload, resolve, reject }) {
  const { id, ...body } = payload;
  try {
    const res = yield post([`compliance/admin/users/${id}/compliance-status`], body);
    resolve(res);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* updatePaidUser({ payload, resolve, reject }) {
  const { id, ...body } = payload;
  try {
    const res = yield post([`compliance/admin/users/${id}/paid-status`], body);
    resolve(res);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* updateAddressUser({ payload, resolve, reject }) {
  const { id, ...body } = payload;
  try {
    const res = yield post([`compliance/admin/users/${id}/address-status`], body);
    resolve(res);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* watchAdmin() {
  yield all([takeLatest('ADD_CM', addCM)]);
  yield all([takeLatest('GET_CMS', getCMs)]);
  yield all([takeLatest('REVOKE_CM', revokeCM)]);
  yield all([takeLatest('ACTIVATE_CM', activateCM)]);
  yield all([takeLatest('RESET_PASSWORD', resetPassword)]);
  yield all([takeLatest('UPDATE_COMPLIANCE_USER', updateComplianceUser)]);
  yield all([takeLatest('UPDATE_PAID_USER', updatePaidUser)]);
  yield all([takeLatest('UPDATE_ADDRESS_USER', updateAddressUser)]);
  yield all([debounce(1000, 'GET_USERS', getUsers)]);
}
