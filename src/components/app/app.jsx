import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import Modal from "../hocs/modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import {
  Constructor,
  Feed,
  ForgotPassword,
  Login,
  Logout,
  OrderInfo,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword,
} from "../../pages";
import { Error404 } from "../../pages/error-page";
import ProtectedRoute from "../protected-route";
import { fetchUser } from "../../services/reducers/auth-slice";
import { getCookie } from "../../utils/utils";
import { fetchIngredients } from "../../services/reducers/ingredients-slice";
import { useAppDispatch, useAppSelector } from "../../services/hook";

function App() {
  const dispatch = useAppDispatch();
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
  }, [history]);

  return (
    allIngredients && (
      <main className={styles.app}>
        <AppHeader />
        <Switch location={background || location}>
          <Route path="/" exact>
            <Constructor />
          </Route>
          <ProtectedRoute path="/profile" exact onlyGuest={false}>
            <Profile />
          </ProtectedRoute>
          <ProtectedRoute path="/login" onlyGuest={true} exact>
            <Login />
          </ProtectedRoute>
          <Route path="/logout">
            <Logout />
          </Route>
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
          <Route path="/feed" exact>
            <Feed />
          </Route>
          <Route path="/feed/:id" exact>
            <OrderInfo />
          </Route>
          <ProtectedRoute path="/profile/orders" exact onlyGuest={false}>
            <ProfileOrders />
          </ProtectedRoute>
          <ProtectedRoute path="/profile/orders/:id" exact onlyGuest={false}>
            <OrderInfo />
          </ProtectedRoute>
          <Route path="*">
            <Error404 />
          </Route>
        </Switch>
        {background &&
          ((background.pathname === "/" && (
            <Route
              path="/ingredients/:id"
              children={
                <Modal handleClose={onClose}>
                  <IngredientDetails />
                </Modal>
              }
            />
          )) ||
            (background.pathname.includes("/feed") && (
              <Route
                path="/feed/:id"
                children={
                  <Modal handleClose={onClose}>
                    <OrderInfo modal={true} />
                  </Modal>
                }
              />
            )) ||
            (background.pathname.includes("/orders") && (
              <Route
                path="/profile/orders/:id"
                children={
                  <Modal handleClose={onClose}>
                    <OrderInfo modal={true} />
                  </Modal>
                }
              />
            )))}
      </main>
    )
  );
}

export default App;
