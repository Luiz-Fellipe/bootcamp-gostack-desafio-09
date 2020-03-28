import styled from 'styled-components';
import { Link } from 'react-router-dom';
import colors from '~/styles/colors';

export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

export const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  div {
    display: flex;
  }
`;

export const FormBody = styled.div`
  background: ${colors.white};
  padding: 25px;
  border-radius: 4px;
`;

export const ButtonSave = styled.button`
  display: flex;
  align-items: center;
  font-weight: bold;
  border: 0;
  border-radius: 4px;
  padding: 6px 15px;
  background: ${colors.purple};
  color: ${colors.white};

  span {
    margin-left: 5px;
    text-align: center;
  }
`;
export const ButtonBack = styled(Link)`
  margin-right: 15px;
  display: flex;
  align-items: center;
  font-weight: bold;
  border: 0;
  border-radius: 4px;
  padding: 6px 15px;
  background: #cccccc;
  color: ${colors.white};

  span {
    text-align: center;
  }
`;

export const InputGroup = styled.div`
  display: grid;
  gap: 25px;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 10px;
`;

export const InputBlock = styled.div`
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: ${colors.label};
  }

  span.error {
    display: block;
    margin-top: 10px;
    font-weight: bold;
    color: ${colors.red};
  }
  input {
    color: ${colors.lightGray};
  }

  input#product {
    width: 100%;
    height: 36px;
    border-radius: 4px;
    border: 1px solid ${colors.lightGray};
    padding: 10px;
    &:hover {
      border-color: ${colors.purple};
    }
  }
`;
