import React, { useRef, useEffect, useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';
import { MdInsertPhoto } from 'react-icons/md';
import colors from '~/styles/colors';
import api from '~/services/api';

import AvatarDeliveryman from '~/components/AvatarDeliveryman';

import { Container, NoImage, TextAddFoto } from './styles';

// se a prop DeliverymanName for informada é pq ele esta editando um
// usuário que não possui um avatar
const AvatarInput = ({ name, DeliverymanName, ...rest }) => {
  const inputRef = useRef(null);

  const { fieldName, registerField, defaultValue } = useField(name);

  const [preview, setPreview] = useState(defaultValue);
  const [idFile, setIdFile] = useState(defaultValue);

  const handleChange = useCallback(async e => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append('file', e.target.files[0]);

    await api
      .post('/files', data)
      .then(response => {
        const { id: idAvatar } = response.data;

        setIdFile(idAvatar);

        if (file) {
          const previewURL = URL.createObjectURL(file);
          setPreview(previewURL);
        } else {
          setPreview(null);
        }
      })
      .catch(() => {
        toast.error('Erro ao salvar a imagem do avatar');
      });
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'dataset.file',
      clearValue(ref) {
        ref.value = '';
        setPreview(null);
      },
      setValue(_, value) {
        setPreview(value);
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <label htmlFor="avatar">
        {preview && <img src={preview} alt="Preview" />}
        {DeliverymanName && !preview && (
          <AvatarDeliveryman
            size={150}
            name={DeliverymanName}
            textSizeRatio={2}
            hasBorder
          />
        )}
        {!DeliverymanName && !preview && (
          <NoImage>
            <MdInsertPhoto size={50} color={colors.lightGray} />
            <TextAddFoto>Adicionar foto</TextAddFoto>
          </NoImage>
        )}

        <input
          type="file"
          id="avatar"
          ref={inputRef}
          data-file={idFile}
          onChange={handleChange}
          {...rest}
        />
      </label>
    </Container>
  );
};

AvatarInput.defaultProps = {
  DeliverymanName: '',
};

AvatarInput.propTypes = {
  name: PropTypes.string.isRequired,
  DeliverymanName: PropTypes.string,
};

export default AvatarInput;
