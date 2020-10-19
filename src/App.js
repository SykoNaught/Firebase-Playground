import React from "react";
import "./Assets/Styles/index.css";
import {Switch, Route} from 'react-router-dom'
import SignUp from './Components/Login/Signup'
import Login from './Components/Login/Login'
import Dashboard from './Components/Dashboard/Dashboard'
import Contacts from './Components/Contacts/Contacts'

import { AuthProvider } from "./Auth"
import PrivateRoute from "./PrivateRoute"


export default function App() {
  return (
    <AuthProvider>
        <Switch>
          <PrivateRoute path="/" exact component={Dashboard} />
          <PrivateRoute path="/contacts" exact component={Contacts} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
        </Switch>
    </AuthProvider>
  );
  
}
