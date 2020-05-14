/* eslint-disable linebreak-style */
// ==> Import npm
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

// ==> Components
import LoginForm from 'src/components/LoginForm';
import Obole from 'src/components/Obole';

// ==> Styles

// ==> Ant Design sub components

// ==> CSS in JS

// ==> Composant
const App = () => {
  // const dispatch = useDispatch();
  const role = useSelector((state) => state.user.role);

  return (
    <>
      <Switch>
        <Route
          path="/"
          render={() => {
            if (role !== '') {
              return <Obole />;
            }
            return <LoginForm />;
          }}
        />
        <Route>404</Route>
      </Switch>
    </>
  );
};

// == Export
export default App;
