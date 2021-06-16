import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getUser } from "../utils/localStorage";

const PrivateRoute = ({ component: Component, ...rest }) => {
  let auth = getUser();
  return (
    <Route
      {...rest}
      render={(props) =>
        auth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
