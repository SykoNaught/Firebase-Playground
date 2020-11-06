import React, { useState, useEffect } from "react";
import "./Assets/Styles/index.css";
import {Switch, Route} from 'react-router-dom'
import SignUp from './Components/Login/Signup'
import Login from './Components/Login/Login'
import Dashboard from './Components/Dashboard/Dashboard'
import Contacts from './Components/Contacts/Contacts'

import { AuthProvider } from "./Auth"
import PrivateRoute from "./PrivateRoute"


export default function App() {
  
  const [collapseSidebar, setCollapseSidebar] = useState(false)

  const toggleCollapseHandler = () => {
      if (collapseSidebar){
        setCollapseSidebar(false)
      }else{
        setCollapseSidebar(true)
      }
  };
  useEffect(() => {
    window.addEventListener("resize", () => {
        const ismobile = window.innerWidth < 991;
        if (ismobile !== collapseSidebar) setCollapseSidebar(ismobile);
    }, false);
    window.addEventListener("load", () => {
        const ismobile = window.innerWidth < 991;
        if (ismobile !== collapseSidebar) setCollapseSidebar(ismobile);
    }, false);
  }, [collapseSidebar]);
  return (
    <div className={collapseSidebar ? 'collapse': null} >
      <AuthProvider>
        <Switch>
          <PrivateRoute path="/" exact component={() => <Dashboard collapseToggle={toggleCollapseHandler} />} />
          <PrivateRoute path="/contacts" exact component={() => <Contacts collapseToggle={toggleCollapseHandler} />} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
        </Switch>
    </AuthProvider>
    </div>
    
  );
  
}
