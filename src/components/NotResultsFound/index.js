import React from 'react';
import { MdSentimentVeryDissatisfied } from 'react-icons/md';
import PropTypes from 'prop-types';
import colors from '~/styles/colors';
import { DeliveriesIsEmpty } from './styles';

export default function NotResultsFound({ text }) {
  return (
    <DeliveriesIsEmpty>
      <MdSentimentVeryDissatisfied size={40} color={colors.label} />
      <span>{text}</span>
    </DeliveriesIsEmpty>
  );
}

NotResultsFound.propTypes = {
  text: PropTypes.string.isRequired,
};
