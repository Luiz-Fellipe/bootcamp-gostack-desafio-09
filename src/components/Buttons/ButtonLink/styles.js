import styled from 'styled-components';
import { Link } from 'react-router-dom';
import colors from '~/styles/colors';

export const Button = styled(Link)`
  display: flex;
  font-weight: bold;
  align-items: center;
  border: 0;
  border-radius: 4px;
  padding: 6px 20px;
  background: ${props => props.background || colors.purple};
  color: ${colors.white};

  span {
    margin-left: 5px;
  }
`;
