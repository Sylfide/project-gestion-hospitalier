// == Import npm
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// == Import


// == Composant
const App = () => {
  const dispatch = useDispatch();
  const clickCount = useSelector((state) => state.counter);

  return (
    <div className="app">

    </div>
  );
};

// == Export
export default App;