// == Import npm
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { } from 'src/store/actions';

// == Import Components
// import FormMaker from 'src/components/FormMaker';
// import DeceasedForm from 'src/components/DeceasedForm';
import Chambres from 'src/components/Chambres';

// Ant Design
import { Menu } from 'antd';

// == Styles

// Styles
const NavMenu = styled(Menu)`
  background: #dfe6ed;
`;

// == Composant
const Nav = () => {
  const role = useSelector((state) => state.user.role);
​
  if (role === 'admin') {
    return (
      <NavMenu mode="inline">
        <Menu.Item key="1">
          <Link to="/chambres">Chambres</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/graphs">Graphiques</Link>
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
