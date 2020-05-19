// ==> Import npm
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router';
import { } from 'src/store/actions';
import styled from 'styled-components';

// ==> Components

// ==> Styles

// ==> Ant Design sub components

// ==> CSS in JS

// ==> Composant
const CardThanato = () => {
  // const dispatch = useDispatch();
  const thanatoCard = useSelector((state) => state.thanatoCard);

  return (
    <h5>{thanatoCard.lastname}</h5>
  );
};

// == Export
export default CardThanato;
