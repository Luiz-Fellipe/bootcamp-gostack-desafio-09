import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MdMoreHoriz } from 'react-icons/md';
import { Container, Badge, PopoverContent } from './styles';

export default function Popover({ children }) {
  const [visible, setVisible] = useState(false);

  return (
    <Container>
      <Badge onClick={() => setVisible(!visible)}>
        <MdMoreHoriz size={25} color="#C6C6C6" />
      </Badge>

      <PopoverContent visible={visible}>{children}</PopoverContent>
    </Container>
  );
}

Popover.propTypes = {
  children: PropTypes.element.isRequired,
};
