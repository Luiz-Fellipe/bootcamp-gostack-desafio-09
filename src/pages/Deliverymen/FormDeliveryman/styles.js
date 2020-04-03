import styled from 'styled-components';
import colors from '~/styles/colors';

export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

export const InputBlock = styled.div`
  display: flex;
  flex-direction: column;
  label {
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
    color: ${colors.label};
  }
  & > label {
    margin-top: 15px;
  }
`;
