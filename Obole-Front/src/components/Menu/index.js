// == Import npm
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { } from 'src/store/actions';

// Styles
import './styles.scss';
import logo from './logo-obole.svg';

// == Composant
const Menu = () => {
  const dispatch = useDispatch();
  const clickCount = useSelector((state) => state.counter);

  return (
    <nav>
      <img src={logo} />
      <div>
        <a href="">
        <p>chambres</p>
        </a>

        <a href="">
        <p>graphiques</p>
        </a>

        <a href="">
        <p>employés</p>
        </a>

        <a href="">
        <p>défunts</p>
        </a>

        <a href="">
        <p>thanatopracteurs</p>
        </a>
      </div>
    </nav>
  );
};

// == Export
export default Menu;
