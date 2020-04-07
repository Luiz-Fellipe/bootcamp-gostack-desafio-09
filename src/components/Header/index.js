import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { NavLink } from 'react-router-dom';
import { Container, Profile, Content } from './styles';
import logo from '~/assets/images/logo-menu.svg';

import { signOut } from '~/store/modules/auth/actions';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);
  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="logo fastfeet" />
          <NavLink to="/encomendas">ENCOMENDAS</NavLink>
          <NavLink to="/entregadores">ENTREGADORES</NavLink>
          <NavLink to="/destinatarios">DESTINATÁRIOS</NavLink>
          <NavLink to="/problemas">PROBLEMAS</NavLink>
        </nav>

        <Profile>
          <span>{profile.name}</span>
          <button type="button" onClick={handleSignOut}>
            sair do sistema
          </button>
        </Profile>
      </Content>
    </Container>
  );
}
