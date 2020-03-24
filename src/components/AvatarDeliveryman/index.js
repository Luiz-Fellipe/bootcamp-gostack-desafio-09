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

export default function AvatarDeliveryman({ name, src }) {
  return (
    <Avatar
      name={name}
      color={Avatar.getRandomColor(name, AvatarColorsBackground)}
      round
      style={{ borderSpacing: 0 }}
      fgColor={Avatar.getRandomColor(name, AvatarColorsText)}
      maxInitials={2}
      textSizeRatio={0}
      src={src}
      size={36}
    />
  );
}

AvatarDeliveryman.propTypes = {
  name: PropTypes.string.isRequired,
  src: PropTypes.string,
};

AvatarDeliveryman.defaultProps = {
  src: null,
};
