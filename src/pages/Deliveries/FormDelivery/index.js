import React, { useRef, useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import api from '~/services/api';

import Input from '~/components/Input';
import InputSelect from '~/components/InputSelect';
import FormHeader from '~/components/FormHeader';

import { Container, FormBody, InputGroup, InputBlock } from './styles';

export default function FormDelivery({ match }) {
  const formRef = useRef(null);
  const { id } = match.params;
  const [deliverymen, setDeliverymen] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [deliveryEditData, setDeliveryEditData] = useState([]);

  async function loadDeliverymen(inputValue, callback) {
    await api
      .get('/deliverymen', {
        params: {
          name: inputValue,
        },
      })
      .then(response => {
        if (response) {
          const deliverymenOptions = response.data.map(deliveryman => {
            return {
              value: deliveryman.id,
              label: deliveryman.name,
            };
          });

          if (inputValue) {
            callback(deliverymenOptions);
          } else {
            setDeliverymen(deliverymenOptions);
          }
        }
      })
      .catch(() => {
        toast.error('Erro ao carregar dados dos entregadores.');
      });
  }

  async function loadRecipients(inputValue, callback) {
    await api
      .get('/recipients', {
        params: {
          name: inputValue,
        },
      })
      .then(response => {
        if (response) {
          const recipientsOptions = response.data.map(recipient => {
            return {
              value: recipient.id,
              label: recipient.name,
            };
          });

          if (inputValue) {
            callback(recipientsOptions);
          } else {
            setRecipients(recipientsOptions);
          }
        }
      })
      .catch(() => {
        toast.error('Erro ao carregar dados dos destinatários.');
      });
  }

  async function loadDeliveryEditData(idDelivery) {
    await api
      .get(`/deliveries/${idDelivery}`)
      .then(async response => {
        const data = {
          product: response.data.product,
        };

        setDeliveryEditData(data);

        // seta nos campos do react-select o nome do entregador e do destinatário
        await formRef.current.setFieldValue('deliveryman_id', {
          value: response.data.deliveryman.id,
          label: response.data.deliveryman.name,
        });

        await formRef.current.setFieldValue('recipient_id', {
          value: response.data.recipient.id,
          label: response.data.recipient.name,
        });
      })
      .catch(err => {
        console.tron.log(err);
        toast.error('Erro ao carregar dados da encomenda');
      });
  }

  useEffect(() => {
    if (id) {
      loadDeliveryEditData(id);
    }
    loadDeliverymen();
    loadRecipients();
  }, [id]);

  async function handleSubmit(dataForm) {
    const { recipient_id, deliveryman_id, product } = dataForm;

    if (!id) {
      await api
        .post('/deliveries', {
          recipient_id,
          deliveryman_id,
          product,
        })
        .then(() => {
          toast.success('Encomenda cadastrada com sucesso');
        })
        .catch(() => {
          toast.error('Erro ao cadastrar encomenda');
        });
    } else {
      await api
        .put(`/deliveries/${id}`, {
          recipient_id,
          deliveryman_id,
          product,
        })
        .then(() => {
          toast.success('Encomenda editada com sucesso');
        })
        .catch(() => {
          toast.error('Erro ao editar encomenda');
        });
    }
  }

  async function handleValidation(dataForm) {
    // Remove all previous errors
    formRef.current.setErrors({});
    const schema = Yup.object().shape({
      recipient_id: Yup.string().required('O Destinatário é obrigatório'),
      deliveryman_id: Yup.string().required('O Entregador é obrigatório'),
      product: Yup.string().required('O Produto é obrigatório'),
    });
    await schema
      .validate(dataForm, {
        abortEarly: false,
      })
      .then(() => {
        // se passou na validação, faz o cadastro
        handleSubmit(dataForm);
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
      <Form
        ref={formRef}
        onSubmit={handleValidation}
        initialData={deliveryEditData && deliveryEditData}
      >
        <FormHeader
          title={id ? 'Edição de encomendas' : 'Cadastro de encomendas'}
        />
        <FormBody>
          <InputGroup>
            <InputBlock>
              <label htmlFor="recipient_id">Destinatário</label>
              <InputSelect
                id="recipient_id"
                name="recipient_id"
                defaultOptions={recipients}
                loadOptions={loadRecipients}
                placeholder="Informe o nome do destinatário"
              />
            </InputBlock>
            <InputBlock>
              <label htmlFor="deliveryman_id">Entregador</label>
              <InputSelect
                id="deliveryman_id"
                name="deliveryman_id"
                defaultOptions={deliverymen}
                loadOptions={loadDeliverymen}
                placeholder="Informe o nome do entregador"
              />
            </InputBlock>
          </InputGroup>
          <InputBlock>
            <label htmlFor="product">Nome do Produto</label>
            <Input
              type="text"
              id="product"
              name="product"
              placeholder="Informe o nome do produto"
            />
          </InputBlock>
        </FormBody>
      </Form>
    </Container>
  );
}

FormDelivery.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
