import React from "react";
import "./index.css";
import SignUp from './components/signup'
import Login from './components/login'
import Dashboard from './components/Dashboard'
import Users from './components/users'
import {Switch, Route} from 'react-router-dom'
import { AuthProvider } from "./Auth"
import PrivateRoute from "./PrivateRoute"


export default function App() {
  return (
    <AuthProvider>
        <Switch>
          <PrivateRoute path="/" exact component={Dashboard} />
          <PrivateRoute path="/users" exact component={Users} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
        </Switch>
    </AuthProvider>
  );
  
}
