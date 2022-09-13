import React, { FC, ReactNode } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { useAppSelector } from "../services/hook";

interface IProtectedRouteProps {
  onlyGuest: boolean;
  children: ReactNode;
  path: string;
  exact?: boolean;
}

interface ILocationState {
  from: { pathname: string };
}

const ProtectedRoute: FC<IProtectedRouteProps> = ({
  onlyGuest,
  children,
  path,
  exact,
}) => {
  const { isAuthChecked } = useAppSelector((state) => state.auth);
  const location = useLocation<ILocationState>();
  const { from } = location?.state || { from: { pathname: "/" } };

  if (onlyGuest && isAuthChecked) {
    return (
      <Route path={path} exact={exact}>
        <Redirect to={from} />
      </Route>
    );
  }

  if (!onlyGuest && !isAuthChecked) {
    return (
      <Route path={path} exact={exact}>
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      </Route>
    );
  }

  return (
    <Route path={path} exact={exact}>
      {children}
    </Route>
  );
};

export default ProtectedRoute;
