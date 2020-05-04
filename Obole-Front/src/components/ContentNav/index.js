// == Import npm
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { } from 'src/store/actions';

// == Import antd
import { Button } from 'antd';

// == Styles
import './styles.scss';

// == Composant
const ContentNav = () => {
  const dispatch = useDispatch();
  const clickCount = useSelector((state) => state.counter);

  return (
    <div className="obole--contentNav">
      <Button className="obole--contentNav--button" block>Nouveau</Button>
      <Button className="obole--contentNav--button" block>Liste</Button>
      <Button className="obole--contentNav--button" block>Historique</Button>
    </div>
   
  );
};

// == Export
export default ContentNav;