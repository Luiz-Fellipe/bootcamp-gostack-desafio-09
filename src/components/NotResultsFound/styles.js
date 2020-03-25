import styled from 'styled-components';
import colors from '~/styles/colors';

export const DeliveriesIsEmpty = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 80px 0px;
  span {
    margin-top: 10px;
    font-weight: bold;
    font-size: 20px;
    color: ${colors.label};
  }
`;
