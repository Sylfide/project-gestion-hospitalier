// == Import npm
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router';

// Styles

// == Import Components
import LoginForm from 'src/components/LoginForm';
import Obole from 'src/components/Obole';

// == Composant
const App = () => {
  const dispatch = useDispatch();
  const connected = useSelector((state) => state.connected);

  return (
    <>
      <Switch>
        <Route exact path="/">
          <LoginForm />
        </Route>

        <Route
          exact
          path="/obole"
          render={() => {
            if (!connected) {
              return <Redirect to="/" />;
            }
            return <Obole />;
          }}
        />

        <Route>404</Route>
      </Switch>
    </>
  );
};

// == Export
export default App;
