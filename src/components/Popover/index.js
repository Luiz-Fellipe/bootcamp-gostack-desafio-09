import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { MdMoreHoriz } from 'react-icons/md';
import { Container, Badge, PopoverContent } from './styles';

export default function Popover({ children }) {
  const outside = useRef();
  const [visible, setVisible] = useState(false);

  // fecha o popover caso o usuário clique fora
  const handleClick = e => {
    if (outside.current && !outside.current.contains(e.target)) {
      setVisible(false);
    }
  };

  useEffect(() => {
    const getClick = () => document.addEventListener('mousedown', handleClick);

    getClick();
  }, []);

  return (
    <Container ref={outside}>
      <Badge onClick={() => setVisible(!visible)}>
        <MdMoreHoriz size={25} color="#C6C6C6" />
      </Badge>

      <PopoverContent visible={visible}>{children}</PopoverContent>
    </Container>
  );
}

Popover.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
