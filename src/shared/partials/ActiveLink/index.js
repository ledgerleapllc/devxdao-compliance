import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const ActiveLink = ({ children, className, activeClassName, ...props }) => {
  const { pathname } = useLocation();
  let classNameTemp = className;

  if (props.to === '/app') {
    if (pathname === props.to)
    classNameTemp = `${className} ${activeClassName}`.trim();
  } else {
    if (pathname.startsWith(props.to)) {
      classNameTemp = `${className} ${activeClassName}`.trim();
    }
  }

  if (props.to) {
    return (
      <Link className={classNameTemp} {...props}>
        {children}
      </Link>
    )
  } else {
    return (
      <button className={classNameTemp} {...props}>
        {children}
      </button>
    )
  }
};
