import React, { useEffect } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "./PrivateRoute";
import SignUp from "../page/SignUp";
import SignIn from "../page/SignIn";
import Host from "../page/Host";
import history from "../utils/createHistory";
import Preloader from "../utils/Preloader";
import Exam from "../page/Exam";
import EditExam from "../page/EditExam";
import ExamJoin from "../page/ExamJoin";
import ViewResultHost from "../page/ViewResultHost";
import CandidateResult from "../page/CandidateResult";
import HostExamJoin from "../page/HostExamJoin";
import { getUser } from "../utils/localStorage";
import PageNotFound from "../page/PageNotFound";
import Feedback from "../page/Feedback";

const Routes = () => {
  useEffect(() => {
    if (history.location.pathname === "/") history.push("/host");
  }, []);
  return (
    <Router history={history}>
      <Preloader />
      <Switch>
        <PublicRoute path="/signup" exact component={SignUp} />
        <PublicRoute path="/signin" exact component={SignIn} />
        <PrivateRoute path="/joinexam" exact component={ExamJoin} />
        <PrivateRoute path="/host/joinexam" exact component={HostExamJoin} />
        <PrivateRoute path="/host" exact component={Host} />
        <PrivateRoute path="/exam" exact component={Exam} />
        <PrivateRoute path="/exam/edit" exact component={EditExam} />
        <PrivateRoute path="/exam/result" exact component={ViewResultHost} />
        <PrivateRoute
          path="/candidate/result"
          exact
          component={CandidateResult}
        />
        <Route path="/feedback" exact component={Feedback} />
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
