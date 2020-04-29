// == Import npm
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { } from 'src/store/actions';

// Styles
import './styles.scss';

// == Import


// == Composant
const Activity = () => {
  const dispatch = useDispatch();
  const clickCount = useSelector((state) => state.counter);

  return (
    <div id="activity">
      <ul>
        <li>
          CH_1
        </li>
        <li>
          CH_2
        </li>
      </ul>
    </div>
  );
};

// == Export
export default Activity;
