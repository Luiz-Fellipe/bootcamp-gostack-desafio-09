import React from 'react';
import { MdCreate, MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';
import colors from '~/styles/colors';
import api from '~/services/api';
import history from '~/services/history';
import handleStateName from '~/utils/hanldeStateName';

import Table from '~/components/Table';
import Popover from '~/components/Popover';

import { PopoverItem } from './styles';

export default function TableRecipients({ recipients, callback, prevPage }) {
  async function handleRecipientDelete(id) {
    const confirmed = window.confirm(
      'Tem certeza que deseja excluir esse destinatário ?'
    );

    if (confirmed) {
      await api
        .delete(`/recipients/${id}`)
        .then(() => {
          callback();

          // se o usuário excluir o ultimo item de uma pagina, ele volta pra anterior
          if (recipients.length === 1) {
            prevPage();
          }

          toast.error('Destinatário deletado com sucesso !');
        })
        .catch(() => {
          toast.warn(
            'Erro ao excluir o destinatário. Verifique se não existe encomendas vinculadas a ele'
          );
        });
    }
  }

  function handleNavigate(recipientId) {
    history.push(`destinatarios/editar/${recipientId}`);
  }

  const THead = () => (
    <thead>
      <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>Endereço</th>
        <th>Ações</th>
      </tr>
    </thead>
  );

  const TBody = () => (
    <tbody>
      {recipients.map(recipient => (
        <tr key={recipient.id}>
          <td>#{recipient.id}</td>
          <td>{recipient.name}</td>
          <td>
            {recipient.street}, {recipient.number || 'S/N'}, {recipient.city} -{' '}
            {handleStateName(recipient.uf)}
          </td>

          <td>
            <Popover width={200}>
              <PopoverItem>
                <button
                  type="button"
                  onClick={() => handleNavigate(recipient.id)}
                >
                  <MdCreate size={16} color={colors.blue} />
                  <span>Editar</span>
                </button>
                <hr />
              </PopoverItem>
              <PopoverItem>
                <button
                  type="button"
                  onClick={() => handleRecipientDelete(recipient.id)}
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
    <Table>
      <THead />
      <TBody />
    </Table>
  );
}

TableRecipients.propTypes = {
  recipients: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      street: PropTypes.string,
      number: PropTypes.string,
      city: PropTypes.string,
      uf: PropTypes.string,
    })
  ).isRequired,
  callback: PropTypes.func.isRequired,
  prevPage: PropTypes.func.isRequired,
};
