// ==> Import npm
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router';
import { } from 'src/store/actions';
import styled from 'styled-components';

// ==> Components
import { Descriptions } from 'antd';

// ==> Styles

// ==> Ant Design sub components

// ==> CSS in JS
const Container = styled.div`
  p {
    border: 1px solid #1aae9f;
    background: #8dd7cf;
    padding: 10px;
    font-size: 2rem;
    font-weight: bold;
    line-height: 1.5715;
  }
`;

// ==> Composant
const CardThanato = () => {
  // const dispatch = useDispatch();
  const thanatoCard = useSelector((state) => state.thanatoCard);

  return (
    <Container>
      <p>Fiche thanatopracteur</p>

      <Descriptions title="User Info" bordered>
        <Descriptions.Item label="Prénom">{thanatoCard.firstname}</Descriptions.Item>
        <Descriptions.Item label="Nom">{thanatoCard.lastname}</Descriptions.Item>
      </Descriptions>
    </Container>
  );
};

// == Export
export default CardThanato;
