import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import Content from "../content/content";
import Modal from "../hocs/modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import { fetchIngredients } from "../../services/reducers/ingredients-slice.jsx";
import { hideModal, showModal } from "../../services/reducers/modal-slice";
import { fetchOrder, resetOrder } from "../../services/reducers/order-slice";
import Spinner from "../spinner/spinner";
import { resetConstructor } from "../../services/reducers/constructor-slice";
import {
  getIngredient,
  resetIngredient,
} from "../../services/reducers/ingredient-slice";
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

function App() {
  const { ingredients, bun } = useSelector((state) => state.burgerConstructor);

  return (
    <main className={styles.app}>
      <Router>
        <AppHeader />
        <Switch>
          <Route path="/" exact>
            <Constructor />
          </Route>
          <Route path="/orders-feed">
            <OrdersFeed />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/forgot-password">
            <ForgotPassword />
          </Route>
          <Route path="/reset-password">
            <ResetPassword />
          </Route>
        </Switch>
      </Router>
    </main>
  );
}

export default App;
