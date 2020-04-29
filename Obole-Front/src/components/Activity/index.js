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
      <div className="room">
        <p className="name">chambre A</p>
        <div className="count">
          <p className="free">5</p>
          <p className="capacity">40</p>
        </div>
      </div>
      <div className="room">
        <p className="name">chambre B</p>
        <div className="count">
          <p className="free">5</p>
          <p className="capacity">40</p>
        </div>
      </div>
      <div className="room">
        <p className="name">chambre C</p>
        <div className="count">
          <p className="free">5</p>
          <p className="capacity">40</p>
        </div>
      </div>

    </div>
  );
};

// == Export
export default Activity;
