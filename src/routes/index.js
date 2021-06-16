import React, { useEffect } from "react";
import { Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Host from "../pages/Host";
import history from "../utils/createHistory";
import Preloader from "../utils/Preloader";
import Exam from "../pages/Exam";

const Routes = () => {
  useEffect(() => {
    if (history.location.pathname === "/") history.push("/host");
  }, []);
  return (
    <Router history={history}>
      <Preloader />
      <Switch>
        <Route path="/signup" exact component={SignUp} />
        <Route path="/signin" exact component={SignIn} />
        <PrivateRoute path="/host" exact component={Host} />
        <PrivateRoute path="/exam" exact component={Exam} />
      </Switch>
    </Router>
  );
};

export default Routes;
