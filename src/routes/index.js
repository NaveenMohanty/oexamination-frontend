import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Signin from "../pages/Signin";
const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Signin} />
        <PrivateRoute path="/user" exact component={Signin} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
