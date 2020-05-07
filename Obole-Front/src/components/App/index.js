// == Import npm
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

// Styles

// == Import Components
import LoginForm from 'src/components/LoginForm';
import Obole from 'src/components/Obole';

// == Composant
const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.user.role);

  return (
    <>
      <Switch>
        {/* <Route
          exact
          path="/"
          render={() => {
            if (role === 'admin' || role === 'user') {
              return <Obole />;
            }
            return <LoginForm />;
          }}
        /> */}
        <Obole />
        <Route>404</Route>
      </Switch>
    </>
  );
};

// == Export
export default App;
