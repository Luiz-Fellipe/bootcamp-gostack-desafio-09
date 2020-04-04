import React, { useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { toast } from 'react-toastify';
import api from '~/services/api';
import colors from '~/styles/colors';

import PageHeader from '~/components/PageHeader';
import InputSearch from '~/components/InputSearch';
import { ButtonLink } from '~/components/Buttons';
import NotResultsFound from '~/components/NotResultsFound';
import TableLoading from '~/components/TableLoading';
import TableDeliverymen from '~/pages/Deliverymen/TableDeliverymen';
import Pagination from '~/components/Pagination';

import { Container } from './styles';

export default function Deliverymen() {
  const [loading, setLoading] = useState(false);
  const [deliverymen, setDeliverymen] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');

  const NotResults = !loading && !deliverymen.length;
  const ResultsFound = !loading && deliverymen.length > 0;

  async function loadDeliverymen() {
    setLoading(true);
    await api
      .get('/deliverymen', {
        params: {
          page,
          name: searchValue,
        },
      })
      .then(response => {
        if (response) {
          const { deliverymen: deliverymenData, totalPages } = response.data;

          setDeliverymen(deliverymenData);
          setTotalPage(totalPages);
        }

        setLoading(false);
      })
      .catch(() => {
        toast.error('Erro ao carregar dados dos entregadores');
      });
  }

  useEffect(() => {
    loadDeliverymen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchValue]);

  function handlePrevPage() {
    if (page === 1) return;

    setPage(page - 1);
  }

  function handleNextPage() {
    if (page === totalPage) return;

    setPage(page + 1);
  }

  function handleInputChange(e) {
    setSearchValue(e.target.value);
  }

  return (
    <Container>
      <PageHeader textTitle="Gerenciando entregadores">
        <InputSearch
          type="text"
          placeholder="Buscar por entregadores"
          value={searchValue}
          onChange={handleInputChange}
        />
        <ButtonLink
          Icon={MdAdd}
          textButton="CADASTRAR"
          to="entregadores/cadastrar"
          backgroundButton={colors.purple}
        />
      </PageHeader>

      {loading && <TableLoading />}
      {NotResults && (
        <NotResultsFound text="Nenhuma encomenda foi encontrada." />
      )}
      {ResultsFound && (
        <TableDeliverymen
          callback={loadDeliverymen}
          prevPage={handlePrevPage}
          deliverymen={deliverymen}
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
