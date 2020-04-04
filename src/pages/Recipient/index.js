import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';
import { toast } from 'react-toastify';
import colors from '~/styles/colors';
import api from '~/services/api';

import PageHeader from '~/components/PageHeader';
import InputSearch from '~/components/InputSearch';
import { ButtonLink } from '~/components/Buttons';
import TableRecipients from './TableRecipients';
import Pagination from '~/components/Pagination';
import TableLoading from '~/components/TableLoading';
import NotResultsFound from '~/components/NotResultsFound';

import { Container } from './styles';

export default function Recipient() {
  const [searchValue, setSearchValue] = useState('');
  const [recipients, setRecipients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const NotResults = !loading && !recipients.length;
  const ResultsFound = !loading && recipients.length > 0;

  async function loadRecipients() {
    setLoading(true);
    await api
      .get('/recipients', {
        params: {
          page,
          name: searchValue,
        },
      })
      .then(response => {
        setRecipients(response.data.recipients);
        setTotalPages(response.data.totalPages);
      })
      .catch(() => {
        toast.error('Erro ao carregar dados do destinatário');
      });
    setLoading(false);
  }

  useEffect(() => {
    loadRecipients();
  }, [page, searchValue]);

  function handlePrevPage() {
    if (page === 1) return;

    setPage(page - 1);
  }

  function handleNextPage() {
    if (page === totalPages) return;

    setPage(page + 1);
  }

  function handleInputChange(e) {
    setSearchValue(e.target.value);
  }

  return (
    <Container>
      <PageHeader textTitle="Gerenciando Destinatários">
        <InputSearch
          type="text"
          placeholder="Buscar por destinatarios"
          value={searchValue}
          onChange={handleInputChange}
        />
        <ButtonLink
          Icon={MdAdd}
          textButton="CADASTRAR"
          to="destinatarios/cadastrar"
          backgroundButton={colors.purple}
        />
      </PageHeader>
      {loading && <TableLoading />}
      {NotResults && (
        <NotResultsFound text="Nenhum destinatário foi encontrado." />
      )}
      {ResultsFound && (
        <TableRecipients
          callback={loadRecipients}
          prevPage={handlePrevPage}
          recipients={recipients}
        />
      )}
      <Pagination
        page={page}
        totalPage={totalPages}
        nextPage={handleNextPage}
        prevPage={handlePrevPage}
      />
    </Container>
  );
}
