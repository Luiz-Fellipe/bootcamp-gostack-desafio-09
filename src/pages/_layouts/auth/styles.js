import styled from 'styled-components';
import { darken } from 'polished';
import colors from '~/styles/colors';

export const Wrapper = styled.div`
  height: 100%;
  background: ${colors.purple};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 360px;
  background: ${colors.white};
  border-radius: 4px;
  padding: 50px 30px;
  display: flex;
  flex-direction: column;

  form {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    label {
      text-align: left;
      color: ${colors.label};
      font-weight: bold;
      margin-top: 15px;
    }

    input {
      margin-top: 10px;
      width: 100%;
      background: none;
      border: 1px solid ${colors.lightGray};
      border-radius: 4px;
      padding: 13px;
    }
    span {
      margin-bottom: 10px;
      font-weight: bold;
      color: ${colors.red};
    }

    button {
      margin-top: 15px;
      background: ${colors.purple};
      border: none;
      border-radius: 4px;
      padding: 13px;
      color: ${colors.white};
      font-weight: bold;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, colors.purple)};
      }
    }
  }
  img {
    width: 250px;
    align-self: center;
  }
`;
