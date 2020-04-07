import styled from 'styled-components';
import colors from '~/styles/colors';

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 8px;
  line-height: 1.8em;
  strong {
    color: ${colors.label};
  }

  span {
    color: ${colors.gray};
    strong {
      color: ${colors.gray};
    }
  }
`;
