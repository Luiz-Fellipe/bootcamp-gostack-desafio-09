import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { ModalContent } from './styles';

const customStyles = {
  overlay: {
    zIndex: 100,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: 450,
    height: 350,
    transform: 'translate(-50%, -50%)',
  },
};

export default function ModalDelivery({ modalIsOpen, handleModal, delivery }) {
  const dataFormatted = date => format(date, 'P', { locale: pt });
  ReactModal.setAppElement('#root');

  return (
    <ReactModal
      isOpen={modalIsOpen}
      style={customStyles}
      onRequestClose={handleModal}
      contentLabel="Example Modal"
    >
      <ModalContent>
        <strong>Informações da encomenda </strong>
        <span>
          {delivery.recipient.street} , {delivery.recipient.number}
        </span>
        <span>
          {delivery.recipient.city} - {delivery.recipient.uf}
        </span>
        <span>{delivery.recipient.zip_code}</span>
        <hr />
        <strong>Datas</strong>
        <span>
          <strong>Retirada: </strong>
          {delivery.start_date
            ? dataFormatted(parseISO(delivery.start_date))
            : 'Encomenda ainda não foi retirada'}
        </span>
        <span>
          <strong>Entrega: </strong>
          {delivery.end_date
            ? dataFormatted(parseISO(delivery.end_date))
            : 'Encomenda ainda não foi entregue'}
        </span>
        <hr />
        <strong>Assinatura do destinatário</strong>
        {delivery.signature ? (
          <img src={delivery.signature.url} alt="Assinatura" />
        ) : (
          <span>A entrega ainda não foi assinada</span>
        )}
      </ModalContent>
    </ReactModal>
  );
}

ModalDelivery.propTypes = {
  modalIsOpen: PropTypes.bool.isRequired,
  handleModal: PropTypes.func.isRequired,

  delivery: PropTypes.shape({
    start_date: PropTypes.string,
    end_date: PropTypes.string,

    recipient: PropTypes.shape({
      street: PropTypes.string,
      city: PropTypes.string,
      uf: PropTypes.string,
      zip_code: PropTypes.string,
      number: PropTypes.string,
    }).isRequired,

    signature: PropTypes.shape({
      url: PropTypes.string,
    }),
  }).isRequired,
};
