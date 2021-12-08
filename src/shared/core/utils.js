import { format } from 'date-fns';
import { LICENSES, DECIMALS } from '@shared/core/constant';

export const formatDate = (time, formatType = 'dd/MM/yyyy') => {
  if (!time) return '';
  const timeConvert = new Date(time);
  if (timeConvert.toString() === 'Invalid Date') return timeConvert.toString();
  return format(timeConvert, formatType);
};

export const getShortNodeAddress = address => {
  if (address) {
    return `${address.substr(0, 10)}...${address.substr(-4)}`;
  }
  return '-';
};

export const numberWithCommas = str =>
  str ? str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0';

export const detectTypeUser = user => {
  if (user?.is_pa) {
    return 'compliance assistant';
  }
  if (user?.is_super_admin) {
    return 'super admin';
  }
  return '';
}

export const formatPrice = (price, roundUp = null, unit = '€') => {
  let priceNum = price;
  if (!priceNum) {
    return `${unit}0`;
  }
  if (roundUp) {
    priceNum = parseFloat(priceNum.toFixed(roundUp))
  }
  const [intNum, surNum] = priceNum?.toString().split('.');
  return `${unit} ${numberWithCommas(intNum)}.${surNum || ''}`;
}

export const getLicenses = (license, license_other) => {
  if (+license === 5) {
    return license_other?.trim();
  } else {
    return LICENSES.find(x => +x.key === +license)?.title;
  }
}


export const getQuorumRate = (vote, settings) => {
  if (!vote || !settings) {
    return "";
  }
  let quorum_rate = "";
  if (vote.content_type === "grant") quorum_rate = settings.quorum_rate || "";
  else if (vote.content_type === "simple")
    quorum_rate = settings.quorum_rate_simple || "";
  else quorum_rate = settings.quorum_rate_milestone || "";

  if (quorum_rate) quorum_rate = quorum_rate + "%";
  return quorum_rate;
}

export const formatDecimals = (num, decimals = DECIMALS) => {
  return num?.toFixed(DECIMALS);
}