import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';
import AsyncSelect from 'react-select/async';
import colors from '~/styles/colors';

import { Error } from './styles';

export default function Input({ name, ...rest }) {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  const customStyles = {
    control: (styles, state) => ({
      ...styles,
      borderColor: `${colors.lightGray};`,
      boxShadow: state.isFocused && `none`,
      '&:hover': {
        borderColor: `${colors.purple};`,
      },
    }),
  };

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'select.state.value',
      getValue: ref => {
        if (rest.isMulti) {
          if (!ref.select.state.value) {
            return [];
          }
          return ref.select.state.value.map(option => option.value);
        }
        if (!ref.select.state.value) {
          return '';
        }
        return ref.select.state.value.value;
      },
      clearValue(ref) {
        ref.select.select.clearValue();
      },
      setValue(ref, value) {
        ref.select.select.setValue(value);
      },
    });
  }, [fieldName, registerField, rest.isMulti]);
  return (
    <>
      <AsyncSelect
        cacheOptions
        styles={customStyles}
        defaultValue={defaultValue}
        ref={selectRef}
        classNamePrefix="react-select"
        {...rest}
      />
      {error && <Error className="error">{error}</Error>}
    </>
  );
}
Input.propTypes = {
  name: PropTypes.string.isRequired,
};
