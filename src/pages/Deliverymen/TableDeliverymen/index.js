import React from 'react';
import { MdCreate, MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';
import colors from '~/styles/colors';
import api from '~/services/api';
import history from '~/services/history';

import AvatarDeliveryman from '~/components/AvatarDeliveryman';
import Table from '~/components/Table';
import Popover from '~/components/Popover';

import { PopoverItem, TableHead, TableBody } from './styles';

export default function TableDeliverymen({ deliverymen, callback, prevPage }) {
  async function handleDeliveryDelete(id) {
    const confirmed = window.confirm(
      'Tem certeza que deseja excluir esse entregador ?'
    );

    if (confirmed) {
      await api
        .delete(`/deliverymen/${id}`)
        .then(() => {
          callback();

          // se o usuário excluir o ultimo item de uma pagina, ele volta pra anterior
          if (deliverymen.length === 1) {
            prevPage();
          }

          toast.error('Entregador deletado com sucesso !');
        })
        .catch(() => {
          toast.warn(
            'Erro ao excluir o entregador. Verifique se não existe encomendas vinculadas a ele'
          );
        });
    }
  }

  function handleNavigate(deliverymenId) {
    history.push(`entregadores/editar/${deliverymenId}`);
  }

  const THead = () => (
    <TableHead>
      <tr>
        <th>ID</th>
        <th>Foto</th>
        <th>Nome</th>
        <th>Email</th>
        <th className="actions">Ações</th>
      </tr>
    </TableHead>
  );

  const TBody = () => (
    <TableBody>
      {deliverymen.map(deliveryman => (
        <tr key={deliveryman.id}>
          <td>#{deliveryman.id}</td>
          <td id="tdEntregador">
            <AvatarDeliveryman
              size={36}
              name={deliveryman.name}
              src={deliveryman.avatar ? deliveryman.avatar.url : null}
            />
          </td>
          <td>{deliveryman.name}</td>
          <td>{deliveryman.email}</td>

          <td>
            <Popover>
              <PopoverItem>
                <button
                  type="button"
                  onClick={() => handleNavigate(deliveryman.id)}
                >
                  <MdCreate size={16} color={colors.blue} />
                  <span>Editar</span>
                </button>
                <hr />
              </PopoverItem>
              <PopoverItem>
                <button
                  type="button"
                  onClick={() => handleDeliveryDelete(deliveryman.id)}
                >
                  <MdDeleteForever size={16} color={colors.red} />
                  <span>Excluir</span>
                </button>
              </PopoverItem>
            </Popover>
          </td>
        </tr>
      ))}
    </TableBody>
  );

  return (
    <Table>
      <THead />
      <TBody />
    </Table>
  );
}

TableDeliverymen.propTypes = {
  deliverymen: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      email: PropTypes.string,
      avatar: PropTypes.shape({
        url: PropTypes.string,
      }),
    })
  ).isRequired,
  callback: PropTypes.func.isRequired,
  prevPage: PropTypes.func.isRequired,
};
