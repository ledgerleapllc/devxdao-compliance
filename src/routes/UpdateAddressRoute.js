import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getUpdateAddressToken } from '@shared/core/services/auth';

const UpdateAddressRoute = ({ component: Component, ...rest }) => {
  const token = getUpdateAddressToken();

  return (
    <>
      <Route {...rest} render={(matchProps) => <Component {...matchProps} />} />
      {!token && <Redirect to="/updateaddress" /> }
    </>
  );
};

export default UpdateAddressRoute;
