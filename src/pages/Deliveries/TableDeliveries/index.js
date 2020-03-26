import React from 'react';
import { MdCreate, MdDeleteForever, MdVisibility } from 'react-icons/md';

import PropTypes from 'prop-types';
import colors from '~/styles/colors';

import AvatarDeliveryman from '~/components/AvatarDeliveryman';
import Table from '~/components/Table';
import Popover from '~/components/Popover';

import {
  StatusContainer,
  PopoverContent,
  TableHead,
  TableBody,
} from './styles';

export default function TableDeliveries({ deliveries }) {
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
          {deliveries.map(delivery => (
            <tr key={delivery.id}>
              <td>#{delivery.id}</td>
              <td>{delivery.recipient.name}</td>
              <td id="tdEntregador">
                <AvatarDeliveryman
                  name={delivery.deliveryman.name}
                  src={delivery.deliveryman.avatar_url || ''}
                />
                <span>{delivery.deliveryman.name}</span>
              </td>
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
                  <PopoverContent>
                    <button type="button">
                      <MdVisibility size={16} color="#8E5BE8" />
                      <span>Visualizar</span>
                    </button>
                    <hr />
                    <button type="button">
                      <MdCreate size={16} color={colors.blue} />
                      <span>Editar</span>
                    </button>
                    <hr />
                    <button type="button">
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
    </>
  );
}

TableDeliveries.propTypes = {
  deliveries: PropTypes.shape({
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
  }).isRequired,
};
