import React, { useRef, useEffect, useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { useField } from '@unform/core';
import { MdInsertPhoto } from 'react-icons/md';
import colors from '~/styles/colors';
import api from '~/services/api';

import { Container, NoImage } from './styles';

const AvatarInput = ({ name, ...rest }) => {
  const inputRef = useRef(null);

  const { fieldName, registerField, defaultValue, error } = useField(name);

  const [preview, setPreview] = useState(defaultValue && defaultValue.url);
  const [idFile, setIdFile] = useState(defaultValue && defaultValue.id);

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
        {preview ? (
          <img src={preview} alt="Preview" />
        ) : (
          <NoImage>
            <MdInsertPhoto size={50} color={colors.lightGray} />
            <span>Adicionar foto</span>
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

export default AvatarInput;
