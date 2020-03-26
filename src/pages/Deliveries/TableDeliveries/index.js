import React, { useState } from 'react';
import { MdCreate, MdDeleteForever, MdVisibility } from 'react-icons/md';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';
import colors from '~/styles/colors';
import api from '~/services/api';

import AvatarDeliveryman from '~/components/AvatarDeliveryman';
import Table from '~/components/Table';
import Popover from '~/components/Popover';
import ModalDelivery from '~/pages/Deliveries/ModalDelivery';

import {
  StatusContainer,
  PopoverContent,
  TableHead,
  TableBody,
} from './styles';

export default function TableDeliveries({ deliveries, callback, prevPage }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [delivery, setDelivery] = useState({});

  function handleModal(deliveryContent = {}) {
    // se existir um objeto com as informações da encomenda,
    // ele é setado em um estado para ser carregado no modal
    if (deliveryContent && !modalIsOpen) {
      setDelivery(deliveryContent);
    }

    // se ele entrou nessa função com o modal aberto é pq ele vai fechar o modal,
    // então antes de fechar o estado é setado como vazio
    if (modalIsOpen) {
      setDelivery({});
    }

    setModalIsOpen(!modalIsOpen);
  }

  async function handleDeliveryDelete(id) {
    try {
      const confirmed = window.confirm(
        'Tem certeza que deseja excluir essa encomenda ?'
      );

      if (confirmed) {
        await api.delete(`/deliveries/${id}`);

        callback();

        // se o usuário excluir o ultimo item de uma pagina, ele volta pra anterior
        if (deliveries.length === 1) {
          prevPage();
        }

        toast.success('Encomenda deletada com sucesso !');
      }
    } catch (error) {
      toast.error('Erro ao excluir a entrega.');
    }
  }

  return (
    <>
      <Table>
        <TableHead>
          <tr>
            <th>ID</th>
            <th>Destinatário</th>
            <th>Entregador</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Status</th>
            <th className="actions">Ações</th>
          </tr>
        </TableHead>

        <TableBody>
          {deliveries.map(del => (
            <tr key={del.id}>
              <td>#{del.id}</td>
              <td>{del.recipient.name}</td>
              <td id="tdEntregador">
                <AvatarDeliveryman
                  name={del.deliveryman.name}
                  src={del.deliveryman.avatar_url || ''}
                />
                <span>{del.deliveryman.name}</span>
              </td>
              <td>{del.recipient.city}</td>
              <td>{del.recipient.uf}</td>
              <td>
                <StatusContainer
                  initiated={del.initiated}
                  finished={del.finished}
                  canceled={del.canceled}
                >
                  <span>{del.status}</span>
                </StatusContainer>
              </td>
              <td className="actions">
                <Popover>
                  <PopoverContent>
                    <button type="button" onClick={() => handleModal(del)}>
                      <MdVisibility size={16} color="#8E5BE8" />
                      <span>Visualizar</span>
                    </button>
                    <hr />
                    <button type="button">
                      <MdCreate size={16} color={colors.blue} />
                      <span>Editar</span>
                    </button>
                    <hr />
                    <button
                      type="button"
                      onClick={() => handleDeliveryDelete(delivery.id)}
                    >
                      <MdDeleteForever size={16} color={colors.red} />
                      <span>Excluir</span>
                    </button>
                  </PopoverContent>
                </Popover>
              </td>
            </tr>
          ))}
        </TableBody>
      </Table>

      {modalIsOpen && (
        <ModalDelivery
          modalIsOpen={modalIsOpen}
          delivery={delivery}
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
