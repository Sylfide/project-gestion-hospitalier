// == Import npm
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router';

// Styles

// == Import Components
import LoginForm from 'src/components/LoginForm';
import Obole from 'src/components/Obole';
import Chambres from 'src/components/Chambres';
import Defunts from 'src/components/Defunts';
import Employes from 'src/components/Employes';

// == Composant
const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.user.role);

  return (
    <>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            if (role === 'admin' || role === 'user') {
              return <Obole />;
            }
            return <LoginForm />;
          }}
        />
        {/* <Obole /> */}
        <Route path="/chambres" component={Chambres} />
        <Route path="/employes" component={Employes} />
        <Route path="/defunts" component={Defunts} />  
        <Route>404</Route>
      </Switch>
    </>
  );
};

// == Export
export default App;
