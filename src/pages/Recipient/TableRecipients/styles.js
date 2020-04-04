import styled from 'styled-components';

export const PopoverItem = styled.div`
  button {
    background: none;
    border: 0;
    display: flex;
    align-items: center;

    span {
      margin-left: 10px;
      color: #999999;
      font-size: 16px;
    }
  }

  hr {
    margin: 8px 0px;
    border: 0.5px solid #eeeeee;
  }
`;

export const TableHead = styled.thead`
  .actions {
    text-align: center;
  }
`;

export const TableBody = styled.tbody`
  tr {
    td#tdEntregador {
      display: flex;
      align-items: center;
      > span {
        margin-left: 5px;
      }
    }
  }
`;
