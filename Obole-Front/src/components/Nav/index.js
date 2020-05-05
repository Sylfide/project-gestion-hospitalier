// == Import npm
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { } from 'src/store/actions';

// Ant Design
import { Menu } from 'antd';

// == Styles

// Styles
const NavMenu = styled(Menu)`
  background: #dfe6ed;
`;

// == Composant
const Nav = () => {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);

  return (
    <NavMenu
      mode="inline"
    >
      <Menu.Item key="1">
        <Link to="">Chambres</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="">Graphiques</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="">Employés</Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to="">Défunts</Link>
      </Menu.Item>
      <Menu.Item key="5">
        <Link to="/chambres">Thanatopracteurs</Link>
      </Menu.Item>
    </NavMenu>
  );
};

// == Export
export default Nav;
