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
        <p className="name">Chambre Hogwarts</p>
        <div className="count">
          <p className="capacity--title">Capacités</p>
          <p className="capacity--nbr">40</p>
          <p className="free--title">Libre</p>
          <p className="free--nbr">5</p>
        </div>
      </div>
      <div className="room">
        <p className="name">Chambre Beauxbâtons</p>
        <div className="count">
          <p className="capacity--title">Capacités</p>
          <p className="capacity--nbr">40</p>
          <p className="free--title">Libre</p>
          <p className="free--nbr">5</p>
        </div>
      </div>
      <div className="room">
        <p className="name">Chambre Ilvermorny</p>
        <div className="count">
          <p className="capacity--title">Capacités</p>
          <p className="capacity--nbr">40</p>
          <p className="free--title">Libre</p>
          <p className="free--nbr">5</p>
        </div>
      </div>

    </div>
  );
};

// == Export
export default Activity;
