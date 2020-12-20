import './App.css';
import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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
    <div>
      <Router>
        <HeaderComponent />
        <SideBarComponent></SideBarComponent>
          <div className="Container">
              <Switch>
                  <Route exact path = "/"  exact component={ListUserComponent}></Route>
                  <Route path = "/users" component={ListUserComponent}></Route>
                  <Route path = "/add-user/:id" component={CreateUserComponent}></Route>

                  <Route path = "/roles" component={ListRoleComponent}></Route>
                  <Route path = "/add-role/:id" component={CreateRoleComponent}></Route>

                  <Route path = "/permissions" component={ListPermissionComponent}></Route>
                  <Route path = "/add-permission/:id" component={CreatePermissionComponent}></Route>

                  <Route path = "/customers" component={ListCustomerComponent}></Route>
                  <Route path = "/add-customer/:id" component={CreateCustomerComponent}></Route>

                  <Route path = "/donors" component={ListDonorComponent}></Route>
                  <Route path = "/add-donor/:id" component={CreateDonorComponent}></Route>
              </Switch>
    
          </div>
      </Router>
    </div>
  );
}

export default App;
