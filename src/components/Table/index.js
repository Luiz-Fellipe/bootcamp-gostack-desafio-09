import React from 'react';
import PropTypes from 'prop-types';

import { TableContent } from './styles';

export default function Table({ children }) {
  return <TableContent>{children}</TableContent>;
}

Table.propTypes = {
  children: PropTypes.element.isRequired,
};
