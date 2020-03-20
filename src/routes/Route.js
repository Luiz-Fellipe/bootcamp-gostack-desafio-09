import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

export default function RouteWrapper({
  component: Component,
  isPrivate = false,
  ...rest
}) {
  const signed = false;

  // Se a rota é privada e o usuário não esta logado, ele volta pro login
  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  // Se a rota não for privada e ele estiver logado , ele volta pro deliveries
  if (signed && !isPrivate) {
    return <Redirect to="/deliveries" />;
  }

  return <Route {...rest} component={Component} />;
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
