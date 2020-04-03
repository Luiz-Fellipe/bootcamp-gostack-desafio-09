import React from 'react';
import PropTypes from 'prop-types';
import { MdNavigateBefore, MdDone } from 'react-icons/md';
import { Container } from './styles';
import colors from '~/styles/colors';

import { ButtonLink, ButtonSubmit } from '~/components/Buttons';

export default function FormHeader({ title, buttonBackTo }) {
  return (
    <Container>
      <h1>{title}</h1>
      <div>
        <ButtonLink
          style={{ marginRight: 15 }}
          Icon={MdNavigateBefore}
          textButton="VOLTAR"
          backgroundButton="#cccccc"
          to={buttonBackTo}
        />
        <ButtonSubmit
          Icon={MdDone}
          textButton="SALVAR"
          backgroundButton={colors.purple}
        />
      </div>
    </Container>
  );
}

FormHeader.propTypes = {
  title: PropTypes.string.isRequired,
  buttonBackTo: PropTypes.string.isRequired,
};
