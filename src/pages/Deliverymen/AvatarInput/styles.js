import styled from 'styled-components';
import colors from '~/styles/colors';

export const Container = styled.div`
  align-self: center;

  label {
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }

    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      border: 1px dashed ${colors.lightGray};
      background: #eee;
    }

    input {
      display: none;
    }
  }
`;

export const NoImage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 1px dashed ${colors.lightGray};
  background: none;
  span {
    color: ${colors.lightGray};
    font-size: 16px;
    font-weight: bold;
  }
`;
