// == Import npm
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { } from 'src/store/actions';

// == Import


// == Composant
const tmp_component = () => {
  const dispatch = useDispatch();
  const clickCount = useSelector((state) => state.counter);

  return (
   
  );
};

// == Export
export default tmp_component;