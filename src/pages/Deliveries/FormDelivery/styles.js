import styled from 'styled-components';
import colors from '~/styles/colors';

export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

export const FormBody = styled.div`
  background: ${colors.white};
  padding: 25px;
  border-radius: 4px;
`;

export const InputGroup = styled.div`
  display: grid;
  gap: 25px;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 15px;
`;

export const InputBlock = styled.div`
  label {
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
    color: ${colors.label};
  }

  span.error {
    display: block;
    margin-top: 10px;
    font-weight: bold;
    color: ${colors.red};
  }
`;
