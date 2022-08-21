import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import Modal from "../hocs/modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  Constructor,
  Login,
  OrdersFeed,
  Profile,
  Register,
  ForgotPassword,
  ResetPassword,
} from "../../pages";
import { Error404 } from "../../pages/error-page";
import ProtectedRoute from "../protected-route";
import { fetchUser } from "../../services/reducers/auth-slice";
import { getCookie } from "../../utils/utils";

function App() {
  const dispatch = useDispatch();
  const background = location.state?.background;

  useEffect(() => {
    if (getCookie("accessToken")) {
      dispatch(fetchUser());
    }
  }, [dispatch]);

  const onClose = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <main className={styles.app}>
      <Router>
        <AppHeader />
        <Switch>
          <Route path="/" exact>
            <Constructor />
          </Route>
          <Route path="/orders-feed" exact>
            <OrdersFeed />
          </Route>
          <ProtectedRoute path="/profile" exact>
            <Profile />
          </ProtectedRoute>
          <ProtectedRoute path="/login" onlyGuest={true} exact>
            <Login />
          </ProtectedRoute>
          <ProtectedRoute path="/register" onlyGuest={true} exact>
            <Register />
          </ProtectedRoute>
          <ProtectedRoute path="/forgot-password" onlyGuest={true} exact>
            <ForgotPassword />
          </ProtectedRoute>
          <ProtectedRoute path="/reset-password" onlyGuest={true} exact>
            <ResetPassword />
          </ProtectedRoute>
          <Route path="*">
            <Error404 />
          </Route>
        </Switch>
        {background && (
          <Route path="/ingredients/:id" exact>
            <Modal onClose={onClose}>
              <IngredientDetails />
            </Modal>
          </Route>
        )}
      </Router>
    </main>
  );
}

export default App;
