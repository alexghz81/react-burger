import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const ProtectedRoute = ({ onlyGuest = false, children, ...rest }) => {
  const { isAuthChecked } = useSelector((state) => state.auth);
  const location = useLocation();

  if (onlyGuest && isAuthChecked) {
    const { from } = location?.state || { from: { pathname: "/" } };
    return (
      <Route {...rest}>
        <Redirect to={from} />
      </Route>
    );
  }

  if (!onlyGuest && !isAuthChecked) {
    return (
      <Route {...rest}>
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      </Route>
    );
  }

  return <Route {...rest}>{children}</Route>;
};

ProtectedRoute.propTypes = {
  onlyGuest: PropTypes.bool.isRequired,
};

export default ProtectedRoute;
