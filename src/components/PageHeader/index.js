import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content } from './styles';

export default function PageHeader({ textTitle, children }) {
  return (
    <Container>
      <h1>{textTitle}</h1>
      {children && <Content>{children}</Content>}
    </Container>
  );
}
PageHeader.defaultProps = {
  children: null,
};

PageHeader.propTypes = {
  textTitle: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.element),
};
