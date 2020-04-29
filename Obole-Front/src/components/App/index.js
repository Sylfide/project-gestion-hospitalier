// == Import npm
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Styles
import './styles.scss';

// == Import Components
import Menu from 'src/components/Menu';
import Activity from 'src/components/Activity';


// == Composant
const App = () => {
  const dispatch = useDispatch();
  const clickCount = useSelector((state) => state.counter);

  return (
    <div id = "layout" >
      <Menu />
      <div>
        <p>fifoufoui</p>
      </div>
      <Activity />
    </div>
  );
};

// == Export
export default App;
