import styled, { css } from 'styled-components';
import colors from '~/styles/colors';

export const Container = styled.div`
  h1 {
    font-size: 24px;
    color: ${colors.label};
    margin-bottom: 20px;
  }

  table {
    .actions {
      text-align: center;
    }
    tbody {
      tr {
        td#tdEntregador {
          display: flex;
          align-items: center;
          > span {
            margin-left: 5px;
          }
        }
      }
    }
  }
`;

export const DivInput = styled.div`
  display: flex;
  align-items: center;
  background: ${colors.white};
  border: 1px solid #dddddd;
  border-radius: 4px;
  padding: 0px 15px;
  input {
    margin-left: 5px;
    height: 36px;
    border-radius: 4px;
    border: none;
    text-align: start;
  }
`;

export const DivSearchAndButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ButtonCadastrar = styled.button`
  display: flex;
  font-weight: bold;
  align-items: center;
  border: 0;
  border-radius: 4px;
  padding: 4px 20px;
  background: ${colors.purple};
  color: ${colors.white};

  span {
    margin-left: 5px;
  }
`;

export const PopoverContent = styled.div`
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

export const StatusContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 5px;
  border-radius: 12px;
  
  ${props =>
    !props.initiated &&
    !props.finished &&
    !props.canceled &&
    css`
      background: ${colors.lightGreenShit};
      max-width: 110px;
      &::before {
        content: '';
        right: 0;
        top: 0;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: ${colors.greenShit};
        margin-right: 5px;
      }

      span {
        color: ${colors.greenShit};
        font-weight: bold;
        font-size: 14px;
      }
    `}

  ${props =>
    props.initiated &&
    !props.finished &&
    !props.canceled &&
    css`
      background: ${colors.lightBlue};
      max-width: 110px;
      &::before {
        content: '';
        right: 0;
        top: 0;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: ${colors.blue};
        margin-right: 5px;
      }

      span {
        color: ${colors.blue};
        font-weight: bold;
        font-size: 14px;
      }
    `}

    ${props =>
      !props.initiated &&
      !props.finished &&
      props.canceled &&
      css`
        background: ${colors.lightRed};
        max-width: 120px;
        &::before {
          content: '';
          right: 0;
          top: 0;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: ${colors.red};
          margin-right: 5px;
        }

        span {
          color: ${colors.red};
          font-weight: bold;
          font-size: 14px;
        }
      `}

      ${props =>
        props.initiated &&
        props.finished &&
        !props.canceled &&
        css`
          background: ${colors.lightGreen};
          max-width: 120px;
          &::before {
            content: '';
            right: 0;
            top: 0;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: ${colors.green};
            margin-right: 5px;
          }

          span {
            color: ${colors.green};
            font-weight: bold;
            font-size: 14px;
          }
        `}
`;
