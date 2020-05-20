// ==> Import npm
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router';
import { Route, Redirect } from 'react-router-dom';
import { } from 'src/store/actions';
import styled from 'styled-components';

// ==> Components
import Menu from 'src/components/Menu';
import Accordion from 'src/components/Accordion';
import Profil from 'src/components/Profil';
import Activity from 'src/components/Activity';
<<<<<<< HEAD
import CardDeceased from 'src/components/CardDeceased';
=======
>>>>>>> 4334351d17c3510a562c5c6f3b018288daa6e26c
import CardEmbalmer from 'src/components/CardEmbalmer';

// Ant Design
import { Layout } from 'antd';

// ==> Styles

// ==> Ant Design sub components
const { Content } = Layout;

// ==> CSS in JS
const Container = styled(Layout)`
  height: 100vh;
  text-align: center;
`;

// ==> Composant
const Obole = () => {
  // const dispatch = useDispatch();
  const role = useSelector((state) => state.user.role);
  const { lastname } = useSelector((state) => state.embalmerCard);
  const { firstname } = useSelector((state) => state.deceasedCard);

  return (
    <Container>
      <Menu />
      <Content>
        <Route path="/chambres">
          {role === 'admin' ? <Accordion header="Chambres" /> : <Redirect to="/" />}
        </Route>
        <Route path="/graph">
          {role === 'admin' ? <Accordion header="Graphiques" /> : <Redirect to="/" />}
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
