import './App.css';

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import LoginComponent from './components/auth/LoginComponent'
import './vibe/scss/styles.scss';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={DashboardLayout} />
        <Route component={LoginComponent} />
      </Switch>
    </BrowserRouter>
     
  );
}

export default App;
