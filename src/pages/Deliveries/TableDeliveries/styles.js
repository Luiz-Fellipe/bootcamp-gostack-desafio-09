import styled, { css } from 'styled-components';
import colors from '~/styles/colors';

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
