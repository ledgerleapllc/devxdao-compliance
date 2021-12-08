export const LICENSES = [
  {
    title: "MIT License",
    key: "0",
  },
  {
    title: "Apache License 2.0",
    key: "1",
  },
  {
    title: "BSD License",
    key: "2",
  },
  {
    title: "GPL License",
    key: "3",
  },
  {
    title: "MPL-2.0 License",
    key: "4",
  },
  {
    title: "Creative commons (for research and documents only)",
    key: "6",
  },
  {
    title: "Other",
    key: "5",
  },
];

export const GRANTTYPES = [
  "Salary and other personal compensation",
  "Travel and conferences",
  "Software, tools, infrastructure",
  "Legal, accounting, recruiting",
  "Other",
];

export const RELATIONSHIPS = [
  "I am affiliated with the ETA or a sponsor to the ETA",
  "I am a Contributor to the ETA.",
  "My Project Plan exclusively supports the business and/or activities of a Contributor of ETA.",
  "I have a close relationship with a Contributor of ETA and my Project Plan largely supports the business and/or activities of that Contributor.",
  "I am a director, officer, or employee of the ETA.",
  "None of the above",
];

export const VOTE_RESULTS = {
  'no-quorum': 'No quorum',
  'success': 'Success',
  'fail': 'Fail',
}

export const DECIMALS = 5;

export const GRANT_LOGS = {
  system_sent_doc: {
    type: "API doc send",
    details: "System sent document",
  },
  system_completed: {
    type: "Complete",
    details: "Agreement marked complete",
  },
  system_cancelled_doc: {
    type: "API doc cancel",
    details: "System voided document",
  },
  system_reminded_doc: {
    type: "API reminder",
    details: "System sent document",
  },
  admin_reminded: {
    type: "Remind clicked",
    details: "Admin clicked remind link",
  },
  admin_resent: {
    type: "Resent clicked",
    details: "Admin clicked resend link",
  },
  signed: {
    type: "Signature",
    details: "signed",
  },
};
export const DEFAULT_API_RECORDS = 30;