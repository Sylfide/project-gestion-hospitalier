// ==> Import npm
import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router';
import { Route } from 'react-router-dom';
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
import ListUser from 'src/components/ListUser';

// Ant Design


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
  // const clickCount = useSelector((state) => state.counter);

  return (
    <Container>
      <Menu />
      <Content>
        <TitleSection />
        <ContentNav />
        <Route path="/chambres">
          <FormMaker />
        </Route>
        <Route path="/graphs">
          <GrafForm />
        </Route>
        <Route path="/employes">
          <FormMaker />
        </Route>
        <Route path="/defunts">
          <DeceasedForm />
        </Route>
        <Route path="/thanatos">
          <FormMaker />
        </Route>
      </Content>
      <Activity />
    </Container>
  );
};

// == Export
export default Obole;
