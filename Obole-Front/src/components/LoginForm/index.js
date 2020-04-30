// == Import npm
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import { } from 'src/store/actions';

// == Import


// == Composant
const LoginForm = () => {
  const dispatch = useDispatch();
  const clickCount = useSelector((state) => state.counter);

  return (
    <p>
      <Link to="/obole">LoginForm</Link>
    </p>
  );
};

// == Export
export default LoginForm;
