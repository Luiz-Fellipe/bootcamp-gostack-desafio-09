import React, { useState, useEffect } from 'react';

import { toast } from 'react-toastify';

import api from '~/services/api';

import PageHeader from '~/components/PageHeader';

import TableProblems from './TableProblems';
import Pagination from '~/components/Pagination';
import TableLoading from '~/components/TableLoading';
import NotResultsFound from '~/components/NotResultsFound';

import { Container } from './styles';

export default function DeliveryProblem() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const NotResults = !loading && !problems.length;
  const ResultsFound = !loading && problems.length > 0;

  async function loadProblems() {
    setLoading(true);
    await api
      .get('/delivery/problems', {
        params: {
          page,
        },
      })
      .then(response => {
        const { problemDeliveries, totalPages } = response.data;
        console.tron.log(problemDeliveries);
        setProblems(problemDeliveries);

        setTotalPage(totalPages);
      })
      .catch(() => {
        toast.error('Erro ao carregar dados das entregas com problema');
      });
    setLoading(false);
  }

  useEffect(() => {
    loadProblems();
  }, [page]);

  function handlePrevPage() {
    if (page === 1) return;

    setPage(page - 1);
  }

  function handleNextPage() {
    if (page === totalPage) return;

    setPage(page + 1);
  }

  return (
    <Container>
      <PageHeader textTitle="Problemas na entrega" />
      {loading && <TableLoading />}
      {NotResults && <NotResultsFound text="Nenhum problema foi encontrado." />}
      {ResultsFound && (
        <TableProblems
          callback={loadProblems}
          prevPage={handlePrevPage}
          problems={problems}
        />
      )}
      <Pagination
        page={page}
        totalPage={totalPage}
        nextPage={handleNextPage}
        prevPage={handlePrevPage}
      />
    </Container>
  );
}
