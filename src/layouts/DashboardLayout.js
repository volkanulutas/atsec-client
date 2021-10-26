import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import {
  Button,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import {
  Header,
  SidebarNav,
  Footer,
  PageContent,
  Avatar,
  PageAlert,
  Page,
} from "../vibe";
import Logo from "../assets/images/vibe-logo.svg";
import nav from "../_nav";
import menuNav from "../_navMenu";
import routes from "../views";
import ContextProviders from "../vibe/components/utilities/ContextProviders";
import handleKeyAccessibility, {
  handleClickAccessibility,
} from "../vibe/helpers/handleTabAccessibility";

import AuthService from "../services/AuthService";

const MOBILE_SIZE = 992;

export default class DashboardLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null, 
      sidebarCollapsed: false,
      isMobile: window.innerWidth <= MOBILE_SIZE,
      showChat1: true,
    };
  }

  logout = (event) => {
    AuthService.logout();
    // this.handleRedirect ();
    this.props.history.push("/login");
  }

  handleResize = () => {
    if (window.innerWidth <= MOBILE_SIZE) {
      this.setState({ sidebarCollapsed: false, isMobile: true });
    } else {
      this.setState({ isMobile: false });
    }
  };

  componentDidUpdate(prev) {
    if (
      this.state.isMobile &&
      prev.location.pathname !== this.props.location.pathname
    ) {
      this.toggleSideCollapse();
    }
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if(user) {
      this.setState({currentUser: user});
      
    }
    window.addEventListener("resize", this.handleResize);
    document.addEventListener("keydown", handleKeyAccessibility);
    document.addEventListener("click", handleClickAccessibility);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  toggleSideCollapse = () => {
    this.setState((prevState) => ({
      sidebarCollapsed: !prevState.sidebarCollapsed,
    }));
  };

  filterRoutes = () => {
    /*
      let user = AuthService.getCurrentUser();
      let pageList = [];
    
      if(user != null){
        let permissions = user.permissions;
        if(permissions != null) {
          for (var i = 0; i < permissions.length; i++) {
            let permission = permissions[i];
              for(var j=0; j<routes.length; j++){
                if(routes[j].id === permission.name){
                  pageList.push(routes[j]);
                }
              }
            }
          }
        }
        return pageList;
        */

        return routes;
  }

  findMenu = (menuNavParam, requestedName) => {
    for(var i = 0; i < menuNavParam.top.length; i++){
      if(requestedName === menuNavParam.top[i].permission){
        return menuNavParam.top[i];
      }
    }
    return null;
  } 

  findPage = (navParam, requestedName) => {
    for(var i = 0; i < navParam.top.length; i++){
      if(navParam.top[i] == null) {
        return null;
      }
      var childrens = navParam.top[i].children;
      if(childrens != null){
        for(var j=0; j < childrens.length; j++){
          if(requestedName === navParam.top[i].children[j].permission){
             return navParam.top[i].children[j];
           }
         }
      }
    }
    return null;
  }

  // filter according to the permission. 
  filterNav = () => {
    let navList = {};
    navList.bottom = nav.bottom;
    navList.top =nav.top;

    let user = AuthService.getCurrentUser();
    if(user != null) {
      let permissions = user.permissions;
      if(permissions != null) {
        for (var i = 0; i < permissions.length; i++) {
          let permission = permissions[i];
          if(!permission.menu.includes("PAGE")) {
            let pagePermissionName  = permission.name;
            let menuPermissionName = permission.menu;
            let menuItem = null;
            if(this.findMenu(navList, menuPermissionName) == null) {
              menuItem = this.findMenu(menuNav, menuPermissionName);
              navList.top.push(menuItem);
          }
          if(this.findPage(navList, pagePermissionName) == null) {
            let pageItem = this.findPage(nav, pagePermissionName);
            menuItem = this.findMenu(navList, menuPermissionName);
            if(menuItem.children === null || menuItem.children === undefined){
              menuItem.children = new Array();
            }
            menuItem.children.push(pageItem);  
          }
          }
      
       

          }
        }
      }
      return navList;
  };
  

  closeChat = () => {
    this.setState({ showChat1: false });
  };

  handleRedirect= ()=>{
    if(AuthService.getCurrentUser() != null){
     return <Redirect from="/" to="/home" />;
    }else{
      return <Redirect from="/" to="/login" />;
    }
  }

  render() {
    const { sidebarCollapsed } = this.state;
    const sidebarCollapsedClass = sidebarCollapsed ? "side-menu-collapsed" : "";
    const filteredNav = this.filterNav();
    const filteredRoutes = this.filterRoutes();
    return (
      <ContextProviders>
        <div className={`app ${sidebarCollapsedClass}`}>
          <PageAlert />
          <div className="app-body">
            <SidebarNav
              nav={filteredNav}
              logo={Logo}
              logoText="ATSEC"
              isSidebarCollapsed={sidebarCollapsed}
              toggleSidebar={this.toggleSideCollapse}
              {...this.props}
            />
            <Page>
              <Header
                toggleSidebar={this.toggleSideCollapse}
                isSidebarCollapsed={sidebarCollapsed}
                routes={filteredRoutes}
                {...this.props}
              >
                <HeaderNav />
              </Header>
              <PageContent>
                <Switch>
                  {filteredRoutes.map((page, key) => (
                    <Route
                      path={page.path}
                      component={page.component}
                      key={key}
                    />
                  ))}
                  {this.handleRedirect}
                </Switch>
              </PageContent>
            </Page>
          </div>
          <Footer>
            <span>Copyright © 2021 ATG ATSec. All rights reserved.</span>
            <span>
              <a href="#!">Terms</a> | <a href="#!">Privacy Policy</a>
            </span>
            <button onClick={this.logout.bind(this)}>LOGOUT</button>
          </Footer>
        </div>
      </ContextProviders>
    );
  }
}


function HeaderNav() {
  return (
    <React.Fragment>
      <NavItem>
        <form className="form-inline">
          <input
            className="form-control mr-sm-1"
            type="search"
            placeholder="Arama Yap..."
            aria-label="Search"
          />
          <Button type="submit" className="d-none d-sm-block">
            <i className="fa fa-search" />
          </Button>
        </form>
      </NavItem>
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav>
          <Avatar size="small" color="blue" initials="AT" />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem>Profil</DropdownItem>
          <DropdownItem divider />
          <DropdownItem >
         Çıkış
          </DropdownItem>
   
        </DropdownMenu>
      </UncontrolledDropdown>
    </React.Fragment>
  );
}