import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

export default function FormBody({ children }) {
  return <Container>{children}</Container>;
}

FormBody.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
