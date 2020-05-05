// == Import npm
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { } from 'src/store/actions';

// == Import

// == Styles
import './styles.scss';

// == Composant
const TitleSection = () => {
  const dispatch = useDispatch();
  const clickCount = useSelector((state) => state.counter);

  return (
    <div className="obole--titleSection">
      <p>Employés</p>
    </div>
  );
};

// == Export
export default TitleSection;
