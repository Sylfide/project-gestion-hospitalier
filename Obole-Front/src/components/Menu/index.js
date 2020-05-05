// == Import npm
import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router';
import { } from 'src/store/actions';
import styled from 'styled-components';

// ==> Components
import { Layout, Button } from 'antd';
import Nav from 'src/components/Nav';

// ==> Styles
import logo from './logo-obole.svg';
import './styles.scss';

// Ant Design sub components
const { Sider } = Layout;

// ==> CSS in JS
const Container = styled(Sider)`
  & > *{
    display: grid;
    grid-template-rows: max-content 1fr max-content;
  }
  img {
    height: 70px;
    justify-self: center;
    margin-top: 7em;
  }
  Button {
    justify-self: center;
    margin-bottom: 10em;
    background: #2c88d9;
    border-radius: 5px;
  }
`;

// ==> Composant
const Menu = () => {
  // const dispatch = useDispatch();
  // const clickCount = useSelector((state) => state.counter);

  return (
    <Container className="obole--menuContainer" theme="light">
      <img alt="logo" src={logo} />
      <Nav />
      <Button type="primary">Profil</Button>
    </Container>
  );
};

// == Export
export default Menu;
