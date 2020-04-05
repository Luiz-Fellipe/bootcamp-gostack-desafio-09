import React, { useState } from 'react';
import { MdCreate, MdDeleteForever, MdVisibility } from 'react-icons/md';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';
import colors from '~/styles/colors';
import api from '~/services/api';
import history from '~/services/history';

import AvatarDeliveryman from '~/components/AvatarDeliveryman';
import Table from '~/components/Table';
import Popover from '~/components/Popover';
import ModalDelivery from '~/pages/Deliveries/ModalDelivery';

import { StatusContainer, PopoverItem, TdGroup } from './styles';

export default function TableDeliveries({ deliveries, callback, prevPage }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deliveryModal, setDeliveryModal] = useState({});

  function handleModal(deliveryContent = {}) {
    // se existir um objeto com as informações da encomenda,
    // ele é setado em um estado para ser carregado no modal
    if (deliveryContent && !modalIsOpen) {
      setDeliveryModal(deliveryContent);
    }

    // se ele entrou nessa função com o modal aberto é pq ele vai fechar o modal,
    // então antes de fechar o estado é setado como vazio
    if (modalIsOpen) {
      setDeliveryModal({});
    }

    setModalIsOpen(!modalIsOpen);
  }

  async function handleDeliveryDelete(id) {
    const confirmed = window.confirm(
      'Tem certeza que deseja excluir essa encomenda ?'
    );

    if (confirmed) {
      await api
        .delete(`/deliveries/${id}`)
        .then(() => {
          callback();

          // se o usuário excluir o ultimo item de uma pagina, ele volta pra anterior
          if (deliveries.length === 1) {
            prevPage();
          }

          toast.error('Encomenda deletada com sucesso !');
        })
        .catch(() => {
          toast.warn('Erro ao excluir a entrega.');
        });
    }
  }

  function handleNavigate(deliveryId) {
    history.push(`encomendas/editar/${deliveryId}`);
  }

  const THead = () => (
    <thead>
      <tr>
        <th>ID</th>
        <th>Destinatário</th>
        <th>Entregador</th>
        <th>Cidade</th>
        <th>Estado</th>
        <th>Status</th>
        <th>Ações</th>
      </tr>
    </thead>
  );

  const TBody = () => (
    <tbody>
      {deliveries.map(delivery => (
        <tr key={delivery.id}>
          <td>#{delivery.id}</td>
          <td>{delivery.recipient.name}</td>
          <TdGroup>
            <AvatarDeliveryman
              size={36}
              name={delivery.deliveryman.name}
              src={
                delivery.deliveryman.avatar
                  ? delivery.deliveryman.avatar.url
                  : null
              }
            />
            <span>{delivery.deliveryman.name}</span>
          </TdGroup>
          <td>{delivery.recipient.city}</td>
          <td>{delivery.recipient.uf}</td>
          <td>
            <StatusContainer
              initiated={delivery.initiated}
              finished={delivery.finished}
              canceled={delivery.canceled}
            >
              <span>{delivery.status}</span>
            </StatusContainer>
          </td>
          <td className="actions">
            <Popover>
              <PopoverItem>
                <button type="button" onClick={() => handleModal(delivery)}>
                  <MdVisibility size={16} color="#8E5BE8" />
                  <span>Visualizar</span>
                </button>
                <hr />
              </PopoverItem>
              <PopoverItem>
                <button
                  type="button"
                  onClick={() => handleNavigate(delivery.id)}
                >
                  <MdCreate size={16} color={colors.blue} />
                  <span>Editar</span>
                </button>
                <hr />
              </PopoverItem>
              <PopoverItem>
                <button
                  type="button"
                  onClick={() => handleDeliveryDelete(delivery.id)}
                >
                  <MdDeleteForever size={16} color={colors.red} />
                  <span>Excluir</span>
                </button>
              </PopoverItem>
            </Popover>
          </td>
        </tr>
      ))}
    </tbody>
  );

  return (
    <>
      <Table>
        <THead />
        <TBody />
      </Table>

      {modalIsOpen && (
        <ModalDelivery
          modalIsOpen={modalIsOpen}
          delivery={deliveryModal}
          handleModal={() => handleModal()}
        />
      )}
    </>
  );
}

TableDeliveries.propTypes = {
  deliveries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      initiated: PropTypes.bool,
      finished: PropTypes.bool,
      canceled: PropTypes.bool,
      recipient: PropTypes.shape({
        name: PropTypes.string,
        city: PropTypes.string,
        uf: PropTypes.string,
      }),
      deliveryman: PropTypes.shape({
        name: PropTypes.string,
        avatar_url: PropTypes.string,
      }),
    })
  ).isRequired,
  callback: PropTypes.func.isRequired,
  prevPage: PropTypes.func.isRequired,
};
