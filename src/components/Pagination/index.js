import React from 'react';
import PropTypes from 'prop-types';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import { Container } from './styles';

export default function Pagination({ page, totalPage, prevPage, nextPage }) {
  return (
    <Container>
      <button
        type="button"
        disabled={page === 1 && 'disabled'}
        onClick={prevPage}
      >
        <MdNavigateBefore size={16} color="#FFF" />
        Anterior
      </button>
      <button
        type="button"
        disabled={(page === totalPage || totalPage === 0) && 'disabled'}
        onClick={nextPage}
      >
        Próximo
        <MdNavigateNext size={16} color="#FFF" />
      </button>
    </Container>
  );
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  prevPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  totalPage: PropTypes.number.isRequired,
};
