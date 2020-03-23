import styled from 'styled-components';

import colors from '~/styles/colors';

export const Container = styled.div`
  background: ${colors.white};
  border: 1px solid ${colors.lightGray};
`;

export const Content = styled.div`
  height: 64px;
  max-width: 1600px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      padding-right: 20px;
      border-right: 1px solid ${colors.lightGray};
    }

    a {
      font-size: 16px;
      margin-left: 20px;
      font-weight: bold;
      color: #999999;

      &.active {
        color: ${colors.label};
      }
    }
  }
`;

export const Profile = styled.aside`
  text-align: right;
  span {
    display: block;
    font-weight: bold;
    margin-bottom: 10px;
    color: ${colors.gray};
    font-size: 14px;
  }

  button {
    background: none;
    border: 0;
    color: ${colors.red};
  }
`;
