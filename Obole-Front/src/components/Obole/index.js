// == Import npm
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { } from 'src/store/actions';
import styled from 'styled-components';

// == Import Components
import Menu from 'src/components/Menu';
import TitleSection from 'src/components/TitleSection';
import ContentNav from 'src/components/ContentNav';
import Form from 'src/components/Form';
import Activity from 'src/components/Activity';

// Ant Design
import { Layout } from 'antd';

// == Styles
// import './styles.scss';
// import logo from './logo-obole.svg';

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
      <Sider theme="light">
        <Activity />
      </Sider>
    </Container>
  );
};

// == Export
export default Obole;
