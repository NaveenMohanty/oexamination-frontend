import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signup" exact component={SignUp} />
        <Route path="/signin" exact component={SignIn} />
        <PrivateRoute path="/" exact component={SignIn} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
