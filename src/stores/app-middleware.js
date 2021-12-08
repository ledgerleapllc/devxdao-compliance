import { all } from 'redux-saga/effects';
import { watchAuth } from './auth/middlewares';
import { watchAdmin } from './api/admin/middlewares';
import { watchShared } from './api/shared/middlewares';
import { watchUser } from './api/user/middleware';

export default function* appMiddleware() {
  yield all([
    watchAuth(),
    watchAdmin(),
    watchShared(),
    watchUser(),
  ]);
}
