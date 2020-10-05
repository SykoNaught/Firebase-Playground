import React from "react";
import "./index.css";
import SignUp from './components/signup'
import Login from './components/login'
import UserList from './components/users'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { AuthProvider } from "./Auth"
import PrivateRoute from "./PrivateRoute"

export default function App() {
  return (
    <AuthProvider>
        <div>
          <Switch>
            <PrivateRoute path="/" exact component={UserList} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
          </Switch>
        </div>
    </AuthProvider>
  );
  
}
