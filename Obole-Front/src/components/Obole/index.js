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
import ListUser from 'src/components/ListUser';

// Ant Design
import { Layout } from 'antd';

// == Styles

const { Sider, Content } = Layout;

const Container = styled(Layout)`
  height: 100vh;
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
        <ListUser />
      </Content>
      <Activity />
    </Container>
  );
};

// == Export
export default Obole;
