import styled from 'styled-components';
import colors from '~/styles/colors';

export const Container = styled.div`
  display: flex;
  align-items: center;
  background: ${colors.white};
  border: 1px solid #dddddd;
  border-radius: 4px;
  padding: 0px 15px;
  input {
    margin-left: 5px;
    height: 36px;
    border-radius: 4px;
    border: none;
    text-align: start;
  }
`;
