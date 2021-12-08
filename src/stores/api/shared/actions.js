export const getNeedsReviewCompliance = (payload, resolve = () => {}, reject = () => {}) => ({
  type: 'GET_NEEDS_REVIEW_COMP',
  payload,
  resolve, 
  reject,
});

export const getComplianceDetail = (payload, resolve = () => {}, reject = () => {}) => ({
  type: 'GET_COMPLIANCE_DETAIL',
  payload,
  resolve, 
  reject,
});

export const getAllMilestones = (payload, resolve = () => {}, reject = () => {}) => ({
  type: 'GET_ALL_MILESTONES',
  payload,
  resolve, 
  reject,
});

export const getInvoices = (payload, resolve = () => {}, reject = () => {}) => ({
  type: 'GET_INVOICES',
  payload,
  resolve, 
  reject,
});

export const markPaid = (payload, resolve = () => {}, reject = () => {}) => ({
  type: 'MARK_PAID',
  payload,
  resolve, 
  reject,
});


export const downloadAllMilestones = (payload, resolve = () => {}, reject = () => {}) => ({
  type: 'DOWNLOAD_ALL_MILESTONES',
  payload,
  resolve, 
  reject,
});

export const downloadInvoices = (payload, resolve = () => {}, reject = () => {}) => ({
  type: 'DOWNLOAD_INVOICES',
  payload,
  resolve, 
  reject,
});

export const getApprovedCompliance = (payload, resolve = () => {}, reject = () => {}) => ({
  type: 'GET_APPROVED_COMP',
  payload,
  resolve, 
  reject,
});

export const getDeniedCompliance = (payload, resolve = () => {}, reject = () => {}) => ({
  type: 'GET_DENIED_COMP',
  payload,
  resolve, 
  reject,
});

export const getPreGrants = (payload, resolve = () => {}, reject = () => {}) => ({
  type: 'GET_PRE_GRANTS',
  payload,
  resolve, 
  reject,
});

export const getActiveGrants = (payload, resolve = () => {}, reject = () => {}) => ({
  type: 'GET_ACTIVE_GRANTS',
  payload,
  resolve, 
  reject,
});

export const getPendingGrants = (payload, resolve = () => {}, reject = () => {}) => ({
  type: 'GET_PENDING_GRANTS',
  payload,
  resolve, 
  reject,
});

export const getCompletedGrants = (payload, resolve = () => {}, reject = () => {}) => ({
  type: 'GET_COMPLETED_GRANTS',
  payload,
  resolve, 
  reject,
});

export const getVoteDetail = (payload, resolve = () => {}, reject = () => {}) => ({
  type: 'GET_VOTE_DETAIL',
  payload,
  resolve, 
  reject,
});

export const getVoteResult = (payload, resolve = () => {}, reject = () => {}) => ({
  type: 'GET_VOTE_RESULT',
  payload,
  resolve, 
  reject,
});

export const getUserNotVoted = (payload, resolve = () => {}, reject = () => {}) => ({
  type: 'GET_USER_NOT_VOTED',
  payload,
  resolve, 
  reject,
});

export const getProposalDetail = (payload, resolve = () => {}, reject = () => {}) => ({
  type: 'GET_PROPOSAL_DETAIL',
  payload,
  resolve, 
  reject,
});

export const approveCompliance = (payload, resolve = () => {}, reject = () => {}) => ({
  type: 'APPROVE_COMPLIANCE',
  payload,
  resolve, 
  reject,
});

export const denyCompliance = (payload, resolve = () => {}, reject = () => {}) => ({
  type: 'DENY_COMPLIANCE',
  payload,
  resolve, 
  reject,
});

export const remindGA = (payload, resolve = () => {}, reject = () => {}) => ({
  type: 'REMIND_GA',
  payload,
  resolve, 
  reject,
});

export const resendGA = (payload, resolve = () => {}, reject = () => {}) => ({
  type: 'RESEND_GA',
  payload,
  resolve, 
  reject,
});

export const getMilestoneProposals = (payload, resolve = () => {}, reject = () => {}) => ({
  type: 'GET_MILESTONE_PROPOSALS',
  payload,
  resolve, 
  reject,
});

export const getMilestoneUsers = (payload, resolve = () => {}, reject = () => {}) => ({
  type: 'GET_MILESTONE_USERS',
  payload,
  resolve, 
  reject,
});

export const getMetrics = (payload, resolve = () => {}, reject = () => {}) => ({
  type: 'GET_METRICS',
  payload,
  resolve, 
  reject,
});

export const getDosFee = (payload, resolve = () => {}, reject = () => {}) => ({
  type: 'GET_DOS_FEE',
  payload,
  resolve, 
  reject,
});

export const downloadDosFee = (payload, resolve = () => {}, reject = () => {}) => ({
  type: 'DOWNLOAD_DOS_FEE',
  payload,
  resolve, 
  reject,
});

export const getPendingAddresses = (resolve = () => {}, reject = () => {}) => ({
  type: 'GET_PENDING_ADDRESSES',
  resolve, 
  reject,
});

export const getCurrentAddresses = (resolve = () => {}, reject = () => {}) => ({
  type: 'GET_CURRENT_ADDRESSES',
  resolve, 
  reject,
});

export const getVAUsers = (resolve = () => {}, reject = () => {}) => ({
  type: 'GET_VA_USERS',
  resolve, 
  reject,
});

export const addAddress = (payload, resolve = () => {}, reject = () => {}) => ({
  type: 'ADD_ADDRESS',
  payload,
  resolve, 
  reject,
});

export const updateAddress = (payload, resolve = () => {}, reject = () => {}) => ({
  type: 'UPDATE_ADDRESS',
  payload,
  resolve, 
  reject,
});

export const voidAddress = (payload, resolve = () => {}, reject = () => {}) => ({
  type: 'VOID_ADDRESS',
  payload,
  resolve, 
  reject,
});

export const confirmAddress = (payload, resolve = () => {}, reject = () => {}) => ({
  type: 'CONFIRM_ADDRESS',
  payload,
  resolve, 
  reject,
});
