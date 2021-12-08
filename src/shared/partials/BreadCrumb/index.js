import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ReactComponent as IconArrowLeft } from '@assets/icons/ic-arrow-left.svg';

export const BreadCrumb = ({ url, text }) => {
  const history = useHistory();

  const goBack = () => {
    if (url) {
      history.push(url);
    } else {
      history.goBack();
    }
  }
  return (
    <Link className="flex items-center gap-2.5 mb-4" onClick={() => goBack()}>
      <IconArrowLeft className="text-primary" /> {text || 'Back'}
    </Link>
  )
};
