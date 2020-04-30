// == Import npm
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { } from 'src/store/actions';

// == Import


// == Composant
const GrafForm = () => {
  const dispatch = useDispatch();
  const clickCount = useSelector((state) => state.counter);

  return (
   <p>Formulaire de la génération des graphiques</p>
  );
};

// == Export
export default GrafForm;