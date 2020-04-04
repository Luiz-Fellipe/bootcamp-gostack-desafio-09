import React, { useRef } from 'react';
import { Form } from '@unform/web';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import api from '~/services/api';

import FormHeader from '~/components/FormHeader';
import FormBody from '~/components/FormBody';
import Input from '~/components/Input';
import AvatarInput from '~/pages/Deliverymen/AvatarInput';

import { Container, InputBlock } from './styles';

export default function FormDeliveryman({ match }) {
  const { id } = match.params;
  const formRef = useRef(null);

  async function handleSubmit(dataForm, reset) {
    await api
      .post('/deliverymen', dataForm)
      .then(() => {
        toast.success('Entregador cadastrado com sucesso');
        reset();
      })
      .catch(() => {
        toast.error('Erro ao cadastrar entregador, Verifique os dados');
      });
  }

  async function handleValidation(dataForm, { reset }) {
    // Remove all previous errors
    formRef.current.setErrors({});
    const schema = Yup.object().shape({
      name: Yup.string().required('O nome é obrigatório'),
      email: Yup.string().required('O e-mail é obrigatório'),
    });
    await schema
      .validate(dataForm, {
        abortEarly: false,
      })
      .then(() => {
        // se passou na validação, faz o cadastro
        handleSubmit(dataForm, reset);
      })
      .catch(err => {
        const validationErrors = {};
        if (err instanceof Yup.ValidationError) {
          err.inner.forEach(error => {
            validationErrors[error.path] = error.message;
          });
          formRef.current.setErrors(validationErrors);
        }
      });
  }

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleValidation}>
        <FormHeader
          title={id ? 'Edição de entregadores' : 'Cadastro de entregadores'}
          buttonBackTo="/entregadores"
        />
        <FormBody>
          <InputBlock>
            <AvatarInput name="avatar_id" accept="image/*" />
          </InputBlock>
          <InputBlock>
            <label htmlFor="name">Nome</label>
            <Input type="text" name="name" id="name" />
          </InputBlock>
          <InputBlock>
            <label htmlFor="email">Email</label>
            <Input type="email" name="email" id="email" />
          </InputBlock>
        </FormBody>
      </Form>
    </Container>
  );
}

FormDeliveryman.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
