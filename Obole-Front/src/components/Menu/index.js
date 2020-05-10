// == Import npm
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { logout } from 'src/store/actions';
import styled from 'styled-components';

// ==> Components
import { Layout, Button } from 'antd';
import Nav from 'src/components/Nav';

// ==> Styles
import logo from 'src/assets/img/logo-obole.svg';

// Ant Design sub components
const { Sider } = Layout;

// ==> CSS in JS
const Container = styled(Sider)`
  background: #dfe6ed;

  & > *{
    display: grid;
    grid-template-rows: max-content 1fr max-content;
  }
  img {
    height: 70px;
    justify-self: center;
    margin: 5em 0;
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
  const dispatch = useDispatch();
  // const clickCount = useSelector((state) => state.counter);
  const history = useHistory();

  return (
    <Container theme="light">
      <img alt="logo" src={logo} />
      <Nav />
      <Button
        type="primary"
        onClick={() => {
          dispatch(logout(history));
        }}
      >
        *Logout*
        {/* <Link to="/profil">Profil</Link> */}
      </Button>
    </Container>
  );
};

// == Export
export default Menu;
