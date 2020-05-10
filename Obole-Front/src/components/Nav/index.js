// ==> Import npm
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// ==> Components
import { Menu } from 'antd';

// ==> Styles

// ==> Ant Design sub components

// ==> CSS in JS
const NavMenu = styled(Menu)`
  background: #dfe6ed;
`;

const Nav = () => {
  const role = useSelector((state) => state.user.role);

  if (role === 'admin') {
    return (
      <NavMenu mode="inline">
        <Menu.Item key="1">
          <Link to="/chambres">Chambres</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/graph">Graphiques</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/employes">Employés</Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/defunts">Défunts</Link>
        </Menu.Item>
        <Menu.Item key="5">
          <Link to="/thanatos">Thanatopracteurs</Link>
        </Menu.Item>
      </NavMenu>
    );
  }
  return (
    <NavMenu mode="inline">
      <Menu.Item key="1">
        <Link to="/defunts">Défunts</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/thanatos">Thanatopracteurs</Link>
      </Menu.Item>
    </NavMenu>
  );
};

// == Export
export default Nav;
