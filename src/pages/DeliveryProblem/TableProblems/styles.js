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

export const Description = styled.td`
  white-space: nowrap;
  max-width: 600px;
  overflow: hidden;
  text-overflow: ellipsis;
`;
