import React from 'react';
import PropTypes from 'prop-types';
import { Button } from './styles';

export default function ButtonLink({
  style,
  Icon,
  textButton,
  backgroundButton,
  to,
}) {
  return (
    <Button to={to} background={backgroundButton} style={style}>
      {Icon && <Icon size={25} />}
      <span>{textButton}</span>
    </Button>
  );
}

ButtonLink.propTypes = {
  Icon: PropTypes.func.isRequired,
  textButton: PropTypes.string.isRequired,
  backgroundButton: PropTypes.string.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  to: PropTypes.string.isRequired,
};

ButtonLink.defaultProps = {
  style: {},
};
