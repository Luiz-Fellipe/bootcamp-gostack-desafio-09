import styled from 'styled-components';
import colors from '~/styles/colors';

export const Container = styled.div`
  h1 {
    font-size: 24px;
    color: ${colors.label};
    margin-bottom: 20px;
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
