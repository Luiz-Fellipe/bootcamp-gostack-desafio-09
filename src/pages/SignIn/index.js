import React, { useRef } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import Input from '~/components/Input';
// import { Container } from './styles';

import logo from '~/assets/images/logo.png';

export default function SignIn() {
  const formRef = useRef(null);

  async function handleSubmit(data) {
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
      console.tron.log(data);
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

        <button type="submit">Entrar no sistema</button>
      </Form>
    </>
  );
}
