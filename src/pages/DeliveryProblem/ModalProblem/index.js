import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

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

export default function ModalProblem({
  modalIsOpen,
  handleModal,
  problemDescription,
}) {
  ReactModal.setAppElement('#root');

  return (
    <ReactModal
      isOpen={modalIsOpen}
      style={customStyles}
      onRequestClose={handleModal}
      contentLabel="Modal Problems"
    >
      <ModalContent>
        <strong>VISUALIZAR PROBLEMA</strong>
        <span>{problemDescription}</span>
      </ModalContent>
    </ReactModal>
  );
}

ModalProblem.propTypes = {
  modalIsOpen: PropTypes.bool.isRequired,
  handleModal: PropTypes.func.isRequired,
  problemDescription: PropTypes.string.isRequired,
};
