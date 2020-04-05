import React, { useState, useRef, useEffect } from 'react';
import { Form } from '@unform/web';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import api, { apiViaCep } from '~/services/api';
import history from '~/services/history';

import FormHeader from '~/components/FormHeader';
import FormBody from '~/components/FormBody';
import Input from '~/components/Input';
import maskCep from '~/utils/maskCep';

import { Container, InputBlock, InputGroup } from './styles';

export default function FormRecipient({ match }) {
  const formRef = useRef(null);
  const { id } = match.params;
  const [mascaraCep, setMascaraCep] = useState('');
  const [recipient, setRecipient] = useState({});

  function handleMaskCep(e) {
    setMascaraCep(maskCep(e.target.value));
  }

  // busca informações na api do viacep.com.br e carrega no formulário
  async function handleZipCode() {
    if (!mascaraCep) return;
    await apiViaCep
      .get(`${mascaraCep}/json/`)
      .then(response => {
        if (response.data.erro) {
          throw new Error();
        }
        const data = {
          ...recipient,
          street: response.data.logradouro,
          city: response.data.localidade,
          uf: response.data.uf,
          zip_code: response.data.cep,
        };

        setRecipient(data);
      })
      .catch(() => {
        toast.error(
          'erro ao buscar informações vinculadas ao CEP, verifique se a informação é válida!'
        );
      });
  }

  async function loadRecipientEditData(idRecipient) {
    await api
      .get(`/recipients/${idRecipient}`)
      .then(response => {
        setRecipient(response.data);
        setMascaraCep(response.data.zip_code);
      })
      .catch(() => {
        toast.error('Erro ao carregar informações do destinatário');
      });
  }

  useEffect(() => {
    if (id) {
      loadRecipientEditData(id);
    }
  }, [id]);

  async function handleSubmit(dataForm, reset) {
    if (!id) {
      await api
        .post('/recipients', dataForm)
        .then(() => {
          toast.success('Destinatário cadastrado com sucesso');
          reset();
        })
        .catch(() => {
          toast.error('Erro ao cadastrar destinatário, verifique os dados');
        });
    } else {
      await api
        .put(`/recipients/${id}`, dataForm)
        .then(() => {
          toast.success('Destinatário editado com sucesso');
          history.push('/destinatarios');
        })
        .catch(() => {
          toast.error('Erro ao editar destinatário, verifique os dados');
        });
    }
  }

  async function handleValidation(dataForm, { reset }) {
    // Remove all previous errors
    formRef.current.setErrors({});
    const schema = Yup.object().shape({
      name: Yup.string().required('O nome é obrigatório'),
      street: Yup.string().required('A rua é obrigatória'),
      number: Yup.string(),
      complement: Yup.string().required('O complemento é obrigatório'),
      city: Yup.string().required('A cidade é obrigatória'),
      uf: Yup.string().required('O estado é obrigatório'),
      zip_code: Yup.string().required('O CEP é obrigatório'),
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
      <Form onSubmit={handleValidation} ref={formRef} initialData={recipient}>
        <FormHeader
          title={id ? 'Edição de destinatário' : 'Cadastro de destinatário'}
          buttonBackTo="/destinatarios"
        />
        <FormBody>
          <InputBlock>
            <label htmlFor="name">Nome</label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Nome Completo"
            />
          </InputBlock>
          <InputGroup>
            <InputBlock>
              <label htmlFor="street">Rua</label>
              <Input
                type="text"
                name="street"
                id="street"
                placeholder="Rua"
                disabled
              />
            </InputBlock>
            <InputBlock>
              <label htmlFor="number">Número</label>
              <Input
                type="text"
                name="number"
                id="number"
                placeholder="Número"
              />
            </InputBlock>
            <InputBlock>
              <label htmlFor="number">Complemento</label>
              <Input
                type="text"
                name="complement"
                id="complement"
                placeholder="Complemento"
              />
            </InputBlock>
          </InputGroup>
          <InputGroup className="last-input-group">
            <InputBlock>
              <label htmlFor="city">Cidade</label>
              <Input
                type="text"
                name="city"
                id="city"
                placeholder="Cidade"
                disabled
              />
            </InputBlock>
            <InputBlock>
              <label htmlFor="uf">Estado</label>
              <Input
                type="text"
                name="uf"
                id="uf"
                placeholder="Estado"
                disabled
              />
            </InputBlock>
            <InputBlock>
              <label htmlFor="zip_code">CEP</label>
              <Input
                type="text"
                name="zip_code"
                id="zip_code"
                placeholder="CEP"
                value={mascaraCep}
                onChange={handleMaskCep}
                onBlur={handleZipCode}
              />
            </InputBlock>
          </InputGroup>
        </FormBody>
      </Form>
    </Container>
  );
}

FormRecipient.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
