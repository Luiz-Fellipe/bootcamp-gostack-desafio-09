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

export const InputGroup = styled.div`
  display: grid;
  gap: 25px;
  grid-template-columns: 4fr 1fr 1fr;
  margin-bottom: 15px;

  &.last-input-group {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
