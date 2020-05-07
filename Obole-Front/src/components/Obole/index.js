// == Import npm
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import { } from 'src/store/actions';
import styled from 'styled-components';

// == Import Components
import Menu from 'src/components/Menu';
import TitleSection from 'src/components/TitleSection';
import ContentNav from 'src/components/ContentNav';
import Form from 'src/components/Form';
import Activity from 'src/components/Activity';
import Chambres from 'src/components/Chambres';
import Defunts from 'src/components/Defunts';
import Employes from 'src/components/Employes';


// Ant Design
import { Layout } from 'antd';

// == Styles

const { Sider, Content } = Layout;

const Container = styled(Layout)`
  min-height: 100vh;
  text-align: center;
`;

// == Composant
const Obole = () => {
  const dispatch = useDispatch();
  const clickCount = useSelector((state) => state.counter);

  return (
    <Container>
      <Menu />
      <Content>
        <TitleSection />
        <ContentNav />
        <Form />    
      </Content>
      <Activity />
    </Container>
  );
};

// == Export
export default Obole;
