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
        <h3>Chambre Tinlinlin</h3>
        <div className="count">
          <p>Capacité</p>
          <p className="nbr">40</p>
          <span />
          <p>Libre</p>
          <p className="nbr">5</p>
        </div>
      </div>

      <div className="room">
        <h3>Chambre Truc</h3>
        <div className="count">
          <p>Capacité</p>
          <p className="nbr">30</p>
          <span />
          <p>Libre</p>
          <p className="nbr">10</p>
        </div>
      </div>

    </div>
  );
};

// == Export
export default Activity;
