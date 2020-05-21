// ==> Import npm
import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router';
import { } from 'src/store/actions';
import styled from 'styled-components';

// ==> Components

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
const Graph = () => {
  // const dispatch = useDispatch();
  // const clickCount = useSelector((state) => state.counter);

  return (
    <Container>
      <p>Graphiques</p>
    </Container>
  );
};

// == Export
export default Graph;
