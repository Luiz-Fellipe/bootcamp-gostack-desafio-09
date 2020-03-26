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

  hr {
    width: 100%;
    border: 0.5px solid #eeeeee;
    margin: 5px 0px;
  }

  span {
    color: ${colors.gray};
    strong {
      color: ${colors.gray};
    }
  }

  img {
    margin-top: 10px;
    max-width: 310px;
  }
`;
