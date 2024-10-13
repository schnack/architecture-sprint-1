import React, {Suspense} from 'react';
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props  }) => {
  return (
      <Route exact>
        {
          () => props.loggedIn ? <Suspense fallback={"loading..."}><Component {...props} /></Suspense> : <Redirect to="./signin" />
        }
      </Route>
  )}

export default ProtectedRoute;