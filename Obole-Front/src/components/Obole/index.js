/* eslint-disable linebreak-style */
/* eslint-disable import/no-unresolved */
// ==> Import npm
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { } from 'src/store/actions';
import styled from 'styled-components';

// ==> Components
import Menu from 'src/components/Menu';
import Accordion from 'src/components/Accordion';
import Profil from 'src/components/Profil';
import Activity from 'src/components/Activity';
import CardDeceased from 'src/components/CardDeceased';
import CardEmbalmer from 'src/components/CardEmbalmer';
import Graph from 'src/components/Graph';

// Ant Design
import { Layout, Spin } from 'antd';

// ==> Styles
import { SyncOutlined } from '@ant-design/icons';

// ==> Ant Design sub components
const { Content } = Layout;

// ==> CSS in JS
const Container = styled(Layout)`
  height: 100vh;
  text-align: center;
  .loader {
    position: fixed;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
    z-index: 999;
  }
`;

// ==> Composant
const Obole = () => {
  // const dispatch = useDispatch();
  const role = useSelector((state) => state.user.role);
  const loading = useSelector((state) => state.loading);
  const { lastname } = useSelector((state) => state.embalmerCard);
  const { firstname } = useSelector((state) => state.deceasedCard);

  return (
    <Container>
      <Spin
        spinning={loading}
        className="loader"
        size="large"
        indicator={<SyncOutlined spin />}
      />
      <Menu />
      <Content>
        <Route path="/chambres">
          {role === 'admin' ? <Accordion header="Chambres" /> : <Redirect to="/" />}
        </Route>
        <Route path="/graph">
          <Graph />
        </Route>
        <Route path="/employes">
          {role === 'admin' ? <Accordion header="Employés" /> : <Redirect to="/" />}
        </Route>
        <Route path="/defunts">
          <Accordion header="Défunts" />
        </Route>
        <Route path="/defunt/:id">
          {firstname ? <CardDeceased /> : <Redirect to="/defunts" />}
        </Route>
        <Route path="/thanatos">
          <Accordion header="Thanatopracteurs" />
        </Route>
        <Route path="/thanato/:id">
          {lastname ? <CardEmbalmer /> : <Redirect to="/thanatos" />}
        </Route>
        <Route path="/compte">
          <Profil />
        </Route>
      </Content>
      <Activity />
    </Container>
  );
};

// == Export
export default Obole;
