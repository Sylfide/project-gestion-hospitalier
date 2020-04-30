// == Import npm
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { } from 'src/store/actions';

// == Import


// == Composant
const TitleSection = () => {
  const dispatch = useDispatch();
  const clickCount = useSelector((state) => state.counter);

  return (
   <p>Titre de la section</p>
  );
};

// == Export
export default TitleSection;