import { put, takeLatest, all } from 'redux-saga/effects';
import { get, post } from '@shared/core/services/saga';
import { saveApiResponseError } from '../../common/actions';

export function* updateAddress({ payload, resolve, reject }) {
  try {
    const res = yield post([`compliance/user/payment-address/change`], payload);
    resolve(res);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* getUserAddress({ resolve, reject }) {
  try {
    const res = yield get([`compliance/user/payment-address/current`]);
    resolve(res.payment_address);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* watchUser() {
  yield all([takeLatest('UPDATE_ADDRESS', updateAddress)]);
  yield all([takeLatest('GET_USER_ADDRESS', getUserAddress)]);
}
