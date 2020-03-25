import styled from 'styled-components';
import colors from '~/styles/colors';

export const Wrapper = styled.div`
  height: 100%;
  overflow: auto;
  background: ${colors.greyBackground};
`;

export const Content = styled.div`
  max-width: 1500px;
  @media screen and (max-width: 1440px) {
    max-width: 1200px;
  }
  margin: 35px auto;
`;
