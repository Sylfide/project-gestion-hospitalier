// ==> Import npm
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router';
import { Route, Redirect } from 'react-router-dom';
import { } from 'src/store/actions';
import styled from 'styled-components';

// ==> Components
import Menu from 'src/components/Menu';
import TitleSection from 'src/components/TitleSection';
import ContentNav from 'src/components/ContentNav';
import FormMaker from 'src/components/FormMaker';
import GrafForm from 'src/components/GrafForm';
import DeceasedForm from 'src/components/DeceasedForm';
import Activity from 'src/components/Activity';
import Accordion from 'src/components/Accordion';

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

  return (
    <Container>
      <Menu />
      <Content>
        {/* <TitleSection />
        <ContentNav /> */}
        <Route path="/chambres">
          {role === 'admin' ? <Accordion header="Chambres" /> : <Redirect to="/" />}
        </Route>
        <Route path="/graphs">
          {role === 'admin' ? <GrafForm /> : <Redirect to="/" />}
        </Route>
        <Route path="/employes">
          {role === 'admin' ? <Accordion header="Employés" /> : <Redirect to="/" />}
        </Route>
        <Route path="/defunts">
          <Accordion header="Défunts" />
        </Route>
        <Route path="/thanatos">
          <Accordion header="Thanatopracteurs" />
        </Route>
      </Content>
      <Activity />
    </Container>
  );
};

// == Export
export default Obole;
