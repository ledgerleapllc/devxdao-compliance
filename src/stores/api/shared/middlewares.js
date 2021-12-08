import { put, takeLatest, all, delay } from 'redux-saga/effects';
import { get, post, put as putApi } from '@shared/core/services/saga';
import { saveApiResponseError } from '../../common/actions';
import qs from 'qs';

export function* getPreGrants({ payload, resolve, reject }) {
  try {
    const query = qs.stringify(payload, { skipNulls: true });
    const res = yield get([`compliance/shared/pending-grant-onboardings?${query}`]);
    yield delay(500); // => this need for scroll loadmore.
    resolve(res.onboardings, !res.finished);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* getVoteDetail({ payload, resolve, reject }) {
  try {
    const res = yield get([`compliance/shared/vote/${payload.id}`]);
    resolve(res.vote);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* getProposalDetail({ payload, resolve, reject }) {
  try {
    const res = yield get([`compliance/shared/proposal/${payload.id}`]);
    resolve(res.proposal);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* getVoteResult({ payload, resolve, reject }) {
  try {
    const {id , ...params} = payload;
    const query = qs.stringify(params, { skipNulls: true });
    const res = yield get([`compliance/shared/vote/${id}/vote-result?${query}`]);
    yield delay(500); // => this need for scroll loadmore.
    resolve(res.vote_results, !res.finished);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* getUserNotVoted({ payload, resolve, reject }) {
  try {
    const {id , ...params} = payload;
    const query = qs.stringify(params, { skipNulls: true });
    const res = yield get([`compliance/shared/vote/${payload.id}/user-not-vote?${query}`]);
    yield delay(500); // => this need for scroll loadmore.
    resolve(res.data, !res.finished);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* approveCompliance({ payload, resolve, reject }) {
  try {
    const res = yield post([`compliance/shared/compliance-review/approve`], payload);
    resolve(res);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* getComplianceDetail({ payload, resolve, reject }) {
  try {
    const res = yield get([`compliance/shared/proposal/${payload.id}/compliance-review`]);
    resolve(res);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* denyCompliance({ payload, resolve, reject }) {
  try {
    const res = yield post([`compliance/shared/compliance-review/deny`], payload);
    resolve(res);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* remindGA({ payload, resolve, reject }) {
  try {
    const res = yield post([`compliance/shared/grant/${payload.id}/remind`]);
    resolve(res);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* resendGA({ payload, resolve, reject }) {
  try {
    const res = yield post([`compliance/shared/grant/${payload.id}/resend`], payload);
    resolve(res);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* getActiveGrants({ payload, resolve, reject }) {
  try {
    const query = qs.stringify({status: 'active', ...payload}, { skipNulls: true });
    const res = yield get([`compliance/shared/grants?${query}`]);
    yield delay(500); // => this need for scroll loadmore.
    resolve(res.proposals, !res.finished);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* getPendingGrants({ payload, resolve, reject }) {
  try {
    const query = qs.stringify({status: 'pending', ...payload}, { skipNulls: true });
    const res = yield get([`compliance/shared/grants?${query}`]);
    yield delay(500); // => this need for scroll loadmore.
    resolve(res.proposals, !res.finished);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* getCompletedGrants({ payload, resolve, reject }) {
  try {
    const query = qs.stringify({status: 'completed', ...payload}, { skipNulls: true });
    const res = yield get([`compliance/shared/grants?${query}`]);
    yield delay(500); // => this need for scroll loadmore.
    resolve(res.proposals, !res.finished);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* getApprovedCompliance({ payload, resolve, reject }) {
  try {
    const query = qs.stringify({status: 'approved', ...payload}, { skipNulls: true });
    const res = yield get([`compliance/shared/compliance-proposal?${query}`]);
    yield delay(500); // => this need for scroll loadmore.
    resolve(res.onboardings, !res.finished);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* getDeniedCompliance({ payload, resolve, reject }) {
  try {
    const query = qs.stringify({status: 'denied', ...payload}, { skipNulls: true });
    const res = yield get([`compliance/shared/compliance-proposal?${query}`]);
    yield delay(500); // => this need for scroll loadmore.
    resolve(res.onboardings, !res.finished);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* getAllMilestones({ payload, resolve, reject }) {
  try {
    const query = qs.stringify({...payload}, { skipNulls: true });
    const res = yield get([`compliance/shared/milestone-all?${query}`]);
    yield delay(500); // => this need for scroll loadmore.
    resolve(res.milestones, !res.finished, res);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* getInvoices({ payload, resolve, reject }) {
  try {
    const query = qs.stringify({...payload}, { skipNulls: true });
    const res = yield get([`compliance/shared/invoice-all?${query}`]);
    yield delay(500); // => this need for scroll loadmore.
    resolve(res.invoices, !res.finished, res);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* getNeedsReviewCompliance({ payload, resolve, reject }) {
  try {
    const query = qs.stringify({status: 'need-review', ...payload}, { skipNulls: true });
    const res = yield get([`compliance/shared/compliance-proposal?${query}`]);
    yield delay(500); // => this need for scroll loadmore.
    resolve(res.onboardings, !res.finished);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* getMilestoneProposals({ payload, resolve, reject }) {
  try {
    const res = yield get([`compliance/shared/milestone-proposal`]);
    resolve(res.proposalIds);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* getMilestoneUsers({ payload, resolve, reject }) {
  try {
    const res = yield get([`compliance/shared/milestone-user`]);
    resolve(res.emails);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* downloadAllMilestones({ payload, resolve, reject }) {
  try {
    const query = qs.stringify({...payload}, { skipNulls: true });
    const res = yield get([`compliance/shared/milestone/export-csv?${query}`], {}, {responseType: 'blob'});
    resolve(res);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* downloadInvoices({ payload, resolve, reject }) {
  try {
    const query = qs.stringify({...payload}, { skipNulls: true });
    const res = yield get([`compliance/shared/invoice-all/export-csv?${query}`], {}, {responseType: 'blob'});
    resolve(res);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* getMetrics({ payload, resolve, reject }) {
  try {
    const res = yield get([`compliance/shared/metrics`]);
    resolve(res.data);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* getDosFee({ payload, resolve, reject }) {
  try {
    const query = qs.stringify({...payload}, { skipNulls: true });
    const res = yield get([`compliance/shared/dos-fee?${query}`]);
    resolve(res.proposals, !res.finished, res);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* downloadDosFee({ payload, resolve, reject }) {
  try {
    const query = qs.stringify({...payload}, { skipNulls: true });
    const res = yield get([`compliance/shared/dos-fee/export-csv?${query}`], {}, {responseType: 'blob'});
    resolve(res);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* markPaid({ payload, resolve, reject }) {
  const {id, ...body} = payload;
  try {
    const res = yield putApi([`compliance/shared/invoice/${id}/paid`], body);
    resolve(res);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* getPendingAddresses({resolve, reject }) {
  try {
    let res = yield get([`compliance/shared/payment-address/pending`]);
    yield delay(500); // => this need for scroll loadmore.
    resolve(res.payment_addresses, !res.finished);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* getCurrentAddresses({resolve, reject }) {
  try {
    let res = yield get([`compliance/shared/payment-address/current`]);
    yield delay(500); // => this need for scroll loadmore.
    resolve(res.payment_addresses, !res.finished);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* getVAUsers({ resolve, reject }) {
  try {
    const res = yield get([`compliance/shared/payment-address/user-va`]);
    resolve(res.users);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* addAddress({ payload, resolve, reject }) {
  try {
    const res = yield post([`compliance/shared/payment-address`], payload);
    resolve(res);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* voidAddress({ payload, resolve, reject }) {
  try {
    const res = yield post([`compliance/shared/payment-address-change/${payload}/void`], payload);
    resolve(res);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* confirmAddress({ payload, resolve, reject }) {
  try {
    const res = yield post([`compliance/shared/payment-address-change/${payload}/confirm-update`], payload);
    resolve(res);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* watchShared() {
  yield all([takeLatest('GET_PRE_GRANTS', getPreGrants)]);
  yield all([takeLatest('GET_VOTE_DETAIL', getVoteDetail)]);
  yield all([takeLatest('GET_VOTE_RESULT', getVoteResult)]);
  yield all([takeLatest('GET_USER_NOT_VOTED', getUserNotVoted)]);
  yield all([takeLatest('GET_PROPOSAL_DETAIL', getProposalDetail)]);
  yield all([takeLatest('APPROVE_COMPLIANCE', approveCompliance)]);
  yield all([takeLatest('DENY_COMPLIANCE', denyCompliance)]);
  yield all([takeLatest('REMIND_GA', remindGA)]);
  yield all([takeLatest('RESEND_GA', resendGA)]);
  yield all([takeLatest('GET_ACTIVE_GRANTS', getActiveGrants)]);
  yield all([takeLatest('GET_PENDING_GRANTS', getPendingGrants)]);
  yield all([takeLatest('GET_COMPLETED_GRANTS', getCompletedGrants)]);
  yield all([takeLatest('GET_NEEDS_REVIEW_COMP', getNeedsReviewCompliance)]);
  yield all([takeLatest('GET_APPROVED_COMP', getApprovedCompliance)]);
  yield all([takeLatest('GET_DENIED_COMP', getDeniedCompliance)]);
  yield all([takeLatest('GET_COMPLIANCE_DETAIL', getComplianceDetail)]);
  yield all([takeLatest('GET_MILESTONE_USERS', getMilestoneUsers)]);
  yield all([takeLatest('GET_MILESTONE_PROPOSALS', getMilestoneProposals)]);
  yield all([takeLatest('GET_ALL_MILESTONES', getAllMilestones)]);
  yield all([takeLatest('GET_INVOICES', getInvoices)]);
  yield all([takeLatest('DOWNLOAD_ALL_MILESTONES', downloadAllMilestones)]);
  yield all([takeLatest('DOWNLOAD_INVOICES', downloadInvoices)]);
  yield all([takeLatest('DOWNLOAD_DOS_FEE', downloadDosFee)]);
  yield all([takeLatest('GET_METRICS', getMetrics)]);
  yield all([takeLatest('GET_DOS_FEE', getDosFee)]);
  yield all([takeLatest('MARK_PAID', markPaid)]);
  yield all([takeLatest('GET_PENDING_ADDRESSES', getPendingAddresses)]);
  yield all([takeLatest('GET_CURRENT_ADDRESSES', getCurrentAddresses)]);
  yield all([takeLatest('GET_VA_USERS', getVAUsers)]);
  yield all([takeLatest('ADD_ADDRESS', addAddress)]);
  yield all([takeLatest('VOID_ADDRESS', voidAddress)]);
  yield all([takeLatest('CONFIRM_ADDRESS', confirmAddress)]);
}
