import styled from 'styled-components';

import colors from '~/styles/colors';

export const Container = styled.div`
  h1 {
    font-size: 24px;
    color: ${colors.label};
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;
