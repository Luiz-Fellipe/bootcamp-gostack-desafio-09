import React, { useRef } from 'react';
import { Form } from '@unform/web';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import Input from '~/components/Input';
// import { Container } from './styles';
import { signInRequest } from '~/store/modules/auth/actions';
import logo from '~/assets/images/logo.png';

export default function SignIn() {
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  async function handleSubmit(data) {
    const { email, password } = data;
    try {
      // Remove all previous errors
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string()
          .email()
          .required('O e-mail é obrigatório'),
        password: Yup.string()
          .min(6)
          .required('A senha é obrigatória'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      // Validation passed
      dispatch(signInRequest(email, password));
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  }

  return (
    <>
      <img src={logo} alt="logo fastfeet" />

      <Form ref={formRef} onSubmit={handleSubmit}>
        <label htmlFor="email">SEU E-MAIL</label>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="exemplo@email.com"
        />

        <label htmlFor="password">SUA SENHA</label>
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="*************"
        />

        <button type="submit">
          {loading ? 'Carregando...' : 'Entrar no sistema'}
        </button>
      </Form>
    </>
  );
}
