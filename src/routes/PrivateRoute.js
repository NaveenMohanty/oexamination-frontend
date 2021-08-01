import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getUser } from "../utils/localStorage";

export const PrivateRoute = ({ component: Component, ...rest }) => {
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

export const PublicRoute = ({ component: Component, ...rest }) => {
  let auth = getUser();
  return (
    <Route
      {...rest}
      render={(props) =>
        auth ? (
          <Redirect
            to={{
              pathname: "/host",
              state: { from: props.location },
            }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
