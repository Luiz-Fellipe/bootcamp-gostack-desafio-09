import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'react-avatar';
// import { Container } from './styles';

const AvatarColorsBackground = [
  '#F4EFFC',
  '#FCF4EE',
  '#EBFBFA',
  '#FFEEF1',
  '#F4F9EF',
  '#FCFCEF',
];

const AvatarColorsText = [
  '#A28FD0',
  '#CB946C',
  '#83CEC9',
  '#CC7584',
  '#A8D080',
  '#CCCC8B',
];

export default function AvatarDeliveryman({
  name,
  size,
  textSizeRatio,
  src,
  hasBorder,
}) {
  return (
    <Avatar
      name={name}
      color={Avatar.getRandomColor(name, AvatarColorsBackground)}
      round
      style={{
        borderSpacing: 0,
        width: hasBorder ? size + 4 : size,
        height: hasBorder ? size + 4 : size,
        border: hasBorder
          ? `2px dashed ${Avatar.getRandomColor(name, AvatarColorsText)}`
          : 'none',
      }}
      fgColor={Avatar.getRandomColor(name, AvatarColorsText)}
      maxInitials={2}
      textSizeRatio={textSizeRatio}
      src={src}
      size={size}
    />
  );
}

AvatarDeliveryman.propTypes = {
  name: PropTypes.string.isRequired,
  src: PropTypes.string,
  size: PropTypes.number.isRequired,
  textSizeRatio: PropTypes.number,
  hasBorder: PropTypes.bool,
};

AvatarDeliveryman.defaultProps = {
  src: null,
  textSizeRatio: 0,
  hasBorder: false,
};
