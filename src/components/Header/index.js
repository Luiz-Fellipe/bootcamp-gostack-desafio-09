import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Profile, Content } from './styles';
import logo from '~/assets/images/logo-menu.svg';

export default function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="logo fastfeet" />
          <NavLink exact to="/encomendas">
            ENCOMENDAS
          </NavLink>
          <NavLink exact to="/entregadores">
            ENTREGADORES
          </NavLink>
          <NavLink exact to="/destinatarios">
            DESTINATÁRIOS
          </NavLink>
          <NavLink exact to="/problemas">
            PROBLEMAS
          </NavLink>
        </nav>

        <Profile>
          <span>Admin FastFeet</span>
          <button onClick="">sair do sistema</button>
        </Profile>
      </Content>
    </Container>
  );
}
