import styled from 'styled-components';
import colors from '~styles/colors';

export const TInput = styled.input`
  width: 100%;
  height: 36px;
  border-radius: 4px;
  border: 1px solid ${colors.lightGray};
  padding: 10px;
  &:hover {
    border-color: ${colors.purple};
  }
`;

export const Error = styled.span`
  display: block;
  margin-top: 10px;
  font-weight: bold;
  color: ${colors.red};
`;
