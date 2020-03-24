import React from 'react';
import {
  MdAdd,
  MdCreate,
  MdDeleteForever,
  MdVisibility,
  MdSearch,
} from 'react-icons/md';

import AvatarDeliveryman from '~/components/AvatarDeliveryman';
import Table from '~/components/Table';
import Popover from '~/components/Popover';
import colors from '~/styles/colors';

import {
  Container,
  ButtonCadastrar,
  DivSearchAndButton,
  PopoverContent,
  StatusContainer,
  DivInput,
} from './styles';

export default function Deliveries() {
  return (
    <Container>
      <h1>Gerenciando Encomendas</h1>

      <DivSearchAndButton>
        <DivInput>
          <MdSearch size={20} color="#999999" />
          <input type="text" placeholder="Busca por encomendas" />
        </DivInput>
        <ButtonCadastrar type="button">
          <MdAdd size={25} />
          <span>CADASTRAR</span>
        </ButtonCadastrar>
      </DivSearchAndButton>

      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Destinatário</th>
            <th>Entregador</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Status</th>
            <th className="actions">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#01</td>
            <td>Ludwig van Beethoven</td>
            <td id="tdEntregador">
              <AvatarDeliveryman
                name="John Doe"
                src="https://api.adorabasdle.io/avatars/50/abott@adorable.png"
              />
              <span>John Doe</span>
            </td>
            <td>Rio do Sul</td>
            <td>Santa Catarina</td>
            <td>
              <StatusContainer>
                <span>PENDENTE</span>
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
          <tr>
            <td>#02</td>
            <td>Ludwig van Beethoven</td>
            <td id="tdEntregador">
              <AvatarDeliveryman
                name="Gaspar Antunes"
                src="https://api.adorabasdle.io/avatars/50/abott@adorable.png"
              />
              <span>Gaspar Antunes</span>
            </td>
            <td>Rio do Sul</td>
            <td>Santa Catarina</td>
            <td>
              <StatusContainer initiated finished={false} canceled={false}>
                <span>RETIRADA</span>
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
          <tr>
            <td>#03</td>
            <td>Johann Sebastian Bach</td>
            <td id="tdEntregador">
              <AvatarDeliveryman
                name="Dai Jiang"
                src="https://api.adorabasdle.io/avatars/50/abott@adorable.png"
              />
              <span>Dai Jiang</span>
            </td>
            <td>Rio do Sul</td>
            <td>Santa Catarina</td>
            <td>
              <StatusContainer initiated finished canceled={false}>
                <span>ENTREGUE</span>
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
          <tr>
            <td>#04</td>
            <td>Frédéric Chopin</td>
            <td id="tdEntregador">
              <AvatarDeliveryman
                name="Tom Hanson"
                src="https://api.adorabasdle.io/avatars/50/abott@adorable.png"
              />
              <span>Tom Hanson</span>
            </td>
            <td>Rio do Sul</td>
            <td>Santa Catarina</td>
            <td>
              <StatusContainer initiated={false} finished={false} canceled>
                <span>CANCELADA</span>
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
        </tbody>
      </Table>
    </Container>
  );
}
