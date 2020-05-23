// == Import npm
import React from 'react';

// ==> Components
import Presentation from 'src/components/Presentation';

// == Import
import OboleLogo from './obole_team-logo.svg';
import './styles.css';

// == Composant
const App = () => {
  return (
    <div className="app">
      <img className="obole" src={OboleLogo} alt="obole logo" />
      {/* <p className="title">Présentation de la Team Obole</p> */}
      <Presentation />
    </div>
  );
};

// == Export
export default App;
