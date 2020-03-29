import React from 'react';
import PropTypes from 'prop-types';
import { ButtonLink } from './styles';

export default function Button({ Icon, textButton, backgroundButton, to }) {
  return (
    <ButtonLink to={to} background={backgroundButton}>
      {Icon && <Icon size={25} />}
      <span>{textButton}</span>
    </ButtonLink>
  );
}

Button.propTypes = {
  Icon: PropTypes.func.isRequired,
  textButton: PropTypes.string.isRequired,
  backgroundButton: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};
