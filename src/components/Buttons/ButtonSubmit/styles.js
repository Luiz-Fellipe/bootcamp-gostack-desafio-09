import styled from 'styled-components';
import colors from '~/styles/colors';

export const Button = styled.button`
  display: flex;
  align-items: center;
  font-weight: bold;
  border: 0;
  border-radius: 4px;
  padding: 6px 15px;
  background: ${props => (props.background ? props.background : colors.purple)};
  color: ${colors.white};

  span {
    margin-left: 5px;
    text-align: center;
  }
`;
