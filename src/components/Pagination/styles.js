import styled from 'styled-components';
import colors from '~/styles/colors';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;

  button {
    display: flex;
    font-weight: bold;
    align-items: center;
    justify-content: center;
    border: 0;
    border-radius: 4px;
    padding: 4px 20px;
    background: ${colors.purple};
    color: ${colors.white};

    &:disabled {
      opacity: 0.3;
    }
  }
`;
