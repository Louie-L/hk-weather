import React from 'react';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Dashboard from './Dashboard';

function App() {
  return (
    <Switch>
      <Route path='/' exact component={Dashboard} />
    </Switch>
  );
}

export default App;
