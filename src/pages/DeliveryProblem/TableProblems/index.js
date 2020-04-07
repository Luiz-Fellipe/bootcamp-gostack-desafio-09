import React, { useState } from 'react';
import { MdVisibility, MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';
import colors from '~/styles/colors';
import api from '~/services/api';

import Table from '~/components/Table';
import Popover from '~/components/Popover';
import ModalProblem from '~/pages/DeliveryProblem/ModalProblem';

import { PopoverItem, Description } from './styles';

export default function TableProblems({ problems, callback, prevPage }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [problemDescriptionModal, setProblemDescriptionModal] = useState('');

  function handleModal(problemDescription = {}) {
    if (problemDescription && !modalIsOpen) {
      setProblemDescriptionModal(problemDescription);
    }

    if (modalIsOpen) {
      setProblemDescriptionModal({});
    }

    setModalIsOpen(!modalIsOpen);
  }

  async function handleRecipientDelete(id) {
    const confirmed = window.confirm(
      'Tem certeza que deseja cancelar essa encomenda ?'
    );

    if (confirmed) {
      await api
        .delete(`/problem/${id}/cancel-delivery`)
        .then(() => {
          callback();

          // se o usuário excluir o ultimo item de uma pagina, ele volta pra anterior
          if (problems.length === 1) {
            prevPage();
          }

          toast.error('Encomenda cancelada com sucesso !');
        })
        .catch(() => {
          toast.warn('Erro ao cancelar a encomenda');
        });
    }
  }

  const THead = () => (
    <thead>
      <tr>
        <th>Encomenda</th>
        <th>Problema</th>
        <th>Ações</th>
      </tr>
    </thead>
  );

  const TBody = () => (
    <tbody>
      {problems.map(problem => (
        <tr key={problem.id}>
          <td>#{problem.delivery.id}</td>

          <Description>{problem.description}</Description>

          <td>
            <Popover width={210}>
              <PopoverItem>
                <button
                  type="button"
                  onClick={() => handleModal(problem.description)}
                >
                  <MdVisibility size={16} color="#8E5BE8" />
                  <span>Visualizar</span>
                </button>
                <hr />
              </PopoverItem>
              <PopoverItem>
                <button
                  type="button"
                  onClick={() => handleRecipientDelete(problem.id)}
                >
                  <MdDeleteForever size={16} color={colors.red} />
                  <span>Cancelar encomenda</span>
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
        <ModalProblem
          modalIsOpen={modalIsOpen}
          problemDescription={problemDescriptionModal}
          handleModal={() => handleModal()}
        />
      )}
    </>
  );
}

TableProblems.propTypes = {
  problems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      description: PropTypes.string,
      delivery: PropTypes.shape({
        id: PropTypes.number,
      }),
    })
  ).isRequired,
  callback: PropTypes.func.isRequired,
  prevPage: PropTypes.func.isRequired,
};
