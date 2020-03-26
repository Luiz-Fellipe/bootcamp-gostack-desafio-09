import styled from 'styled-components';
import colors from '~/styles/colors';

export const Container = styled.div`
  position: relative;
  text-align: center;
`;

export const Badge = styled.button`
  background: none;
  border: 0;
  position: relative;
`;

export const PopoverContent = styled.div`
  position: absolute;
  width: 200px;
  z-index: 1;
  left: calc(50% - 100px);
  top: calc(100% + 5px);
  background: ${colors.white};
  box-shadow: 0px 0px 2px #00000026;
  border-radius: 4px;
  padding: 15px;
  display: ${props => (props.visible ? 'block' : 'none')};

  @media screen and (max-width: 1440px) {
    left: calc(50% - 80px);
    width: 160px;
  }

  &::before {
    content: '';
    position: absolute;
    z-index: 1;
    left: calc(50% - 5px);
    top: -10px;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 10px solid ${colors.white};
    filter: drop-shadow(1px -1px 2px #00000026);
  }
`;
