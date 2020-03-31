import React from 'react';
import PropTypes from 'prop-types';
import { Button } from './styles';

export default function ButtonSubmit({
  style,
  Icon,
  textButton,
  backgroundButton,
}) {
  return (
    <Button background={backgroundButton} style={style} type="submit">
      {Icon && <Icon size={25} />}
      <span>{textButton}</span>
    </Button>
  );
}

ButtonSubmit.propTypes = {
  Icon: PropTypes.func.isRequired,
  textButton: PropTypes.string.isRequired,
  backgroundButton: PropTypes.string.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

ButtonSubmit.defaultProps = {
  style: {},
};
