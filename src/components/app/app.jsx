import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import Modal from "../hocs/modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
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
import { fetchIngredients } from "../../services/reducers/ingredients-slice";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const background = location.state?.background;
  const { allIngredients } = useSelector((state) => state.ingredients);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  useEffect(() => {
    if (getCookie("accessToken")) {
      dispatch(fetchUser());
    }
  }, [dispatch]);

  const onClose = useCallback(() => {
    history.goBack();
  });

  return (
    allIngredients && (
      <main className={styles.app}>
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
          <Route path="/ingredients/:id" exact>
            <IngredientDetails />
          </Route>
          <Route path="*">
            <Error404 />
          </Route>
        </Switch>
        {background && (
          <Route
            path="/ingredients/:id"
            children={
              <Modal handleClose={onClose}>
                <IngredientDetails />
              </Modal>
            }
          />
        )}
      </main>
    )
  );
}

export default App;
