import styled from 'styled-components';
import colors from '~/styles/colors';

export const TableContent = styled.table`
  margin-top: 20px;
  width: 100%;
  border-collapse: separate;

  border-spacing: 0 20px;

  thead {
    text-align: left;
    tr {
      th {
        font-size: 16px;
        padding: 0px 20px;
      }
    }
  }

  tbody {
    color: ${colors.gray};
    font-size: 16px;
    tr {
      background: ${colors.white};

      td {
        padding: 20px;

        &:first-child {
          border-radius: 4px 0px 0px 4px;
        }

        &:last-child {
          border-radius: 0px 4px 4px 0px;
        }
      }
    }
  }
`;
