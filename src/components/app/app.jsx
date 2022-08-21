import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import Modal from "../hocs/modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  useLocation,
} from "react-router-dom";
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
  const location = useLocation();
  const history = useHistory();
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
        <Switch location={background || location}>
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
          <Route path="/ingredients/:id" children={<IngredientDetails />} />
          <Route path="*">
            <Error404 />
          </Route>
        </Switch>
        {background && (
          <Route
            path="/ingredients/:id"
            children={
              <Modal onClose={onClose}>
                <IngredientDetails />
              </Modal>
            }
          />
        )}
      </Router>
    </main>
  );
}

export default App;
