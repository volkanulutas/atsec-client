import './App.css';

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import './vibe/scss/styles.scss';

import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import ListUserComponent from './components/user/ListUserComponent';
import CreateUserComponent from './components/user/CreateUserComponent';
import ListRoleComponent from './components/role/ListRoleComponent';
import CreateRoleComponent from './components/role/CreateRoleComponent';
import ListPermissionComponent from './components/permission/ListPermissionComponent';
import CreatePermissionComponent from './components/permission/CreatePermissionComponent';
import ListDonorComponent from './components/donor/ListDonorComponent';
import CreateDonorComponent from './components/donor/CreateDonorComponent';
import ListCustomerComponent from './components/customer/ListCustomerComponent';
import CreateCustomerComponent from './components/customer/CreateCustomerComponent';
import SideBarComponent from './components/SideBarComponent';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={DashboardLayout} />
      </Switch>
    </BrowserRouter>
     
  );
}

export default App;
