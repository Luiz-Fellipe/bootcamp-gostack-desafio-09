import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { MdAdd, MdSearch } from 'react-icons/md';

import api from '~/services/api';

import NotResultsFound from '~/components/NotResultsFound';
import TableDeliveries from './TableDeliveries';
import Pagination from '~/components/Pagination';

import {
  Container,
  ButtonCadastrar,
  DivSearchAndButton,
  DivInput,
} from './styles';

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadDeliveries() {
      try {
        setLoading(true);

        const response = await api.get('deliveries', {
          params: {
            page,
            product: searchValue,
          },
        });

        if (response) {
          const { deliveries: deliveriesData, totalPages } = response.data;

          const data = deliveriesData.map(delivery => {
            let status;

            if (delivery.initiated && !delivery.finished) {
              status = 'RETIRADA';
            } else if (delivery.initiated && delivery.finished) {
              status = 'ENTREGUE';
            } else if (delivery.canceled) {
              status = 'CANCELADA';
            } else {
              status = 'PENDENTE';
            }
            return {
              ...delivery,
              status,
            };
          });
          setDeliveries(data);
          setTotalPage(totalPages);
          setLoading(false);
        }
      } catch (error) {
        toast.error('Erro ao carregar informações das entregas.');
      }
    }

    loadDeliveries();
  }, [page, searchValue]);

  function handlePrevPage() {
    if (page === 1) return;
    setPage(page - 1);
  }

  function handleNextPage() {
    if (page === totalPage || totalPage === 0) return;
    setPage(page + 1);
  }

  function handleInputChange(e) {
    setSearchValue(e.target.value);

    // volta para primeira página sempre que o valor do input search muda.
    if (page !== 1) {
      setPage(1);
    }
  }

  return (
    <Container>
      <h1>Gerenciando Encomendas</h1>

      <DivSearchAndButton>
        <DivInput>
          <MdSearch size={20} color="#999999" />
          <input
            type="text"
            placeholder="Busca por encomendas"
            value={searchValue}
            onChange={handleInputChange}
          />
        </DivInput>
        <ButtonCadastrar type="button">
          <MdAdd size={25} />
          <span>CADASTRAR</span>
        </ButtonCadastrar>
      </DivSearchAndButton>

      {/* Se estiver carregando ele exibe o loading */}
      {!loading ? (
        <>
          {/* Se não estiver carregando eo deliveres continuar vazio, é pq ele não encontrou nenhuma encomenda */}
          {!deliveries.length ? (
            <NotResultsFound text="Nenhuma encomenda foi encontrada." />
          ) : (
            <>
              <TableDeliveries deliveries={deliveries} />
              <Pagination
                page={page}
                totalPage={totalPage}
                prevPage={handlePrevPage}
                nextPage={handleNextPage}
              />
            </>
          )}
        </>
      ) : (
        <h3>Carregando...</h3>
      )}
    </Container>
  );
}
