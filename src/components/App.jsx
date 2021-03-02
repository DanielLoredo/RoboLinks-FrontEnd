
import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import './App.scss';

import Navbar from './Navbar';

import { routes } from '../routes';

const App = () => (
  <>
    <Navbar />
    <BrowserRouter>
      <Switch>
        {routes.map(({ path, component, exact }) => (
          <Route
            key={path}
            path={path}
            component={component}
            exact={exact}
          />
        ))}
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  </>
);

export default App;
