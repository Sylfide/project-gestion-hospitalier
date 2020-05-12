// == Import npm
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { logout } from 'src/store/actions';
import styled from 'styled-components';

// ==> Components
import { Layout, Button, Popconfirm } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
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
      <Popconfirm
        title="Confirmez-vous la déconnexion ?"
        okText="Oui"
        cancelText="Non"
        onConfirm={() => {
          dispatch(logout(history));
        }}
      >
        <Button
          type="primary"
          shape="circle"
          size="large"
          icon={<PoweroffOutlined />}
        />
      </Popconfirm>
    </Container>
  );
};

// == Export
export default Menu;
