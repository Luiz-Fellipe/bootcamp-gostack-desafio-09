import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';

import { TInput, Error } from './styles';

export default function Input({ name, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, defaultValue = '', registerField, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);
  return (
    <>
      <TInput ref={inputRef} defaultValue={defaultValue} {...rest} />
      {error && <Error className="error">{error}</Error>}
    </>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
};
