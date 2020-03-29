import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content } from './styles';

export default function HeaderPage({ textTitle, children }) {
  return (
    <Container>
      <h1>{textTitle}</h1>
      {children && <Content>{children}</Content>}
    </Container>
  );
}

HeaderPage.propTypes = {
  textTitle: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
