import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import Content from "../content/content";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import { fetchIngredients } from "../../services/reducers/ingredients-slice.jsx";
import {
  fetchOrder,
  hideModal,
  showIngredientModal,
} from "../../services/reducers/modal-slice";

function App() {
  const { allIngredients, isLoading, hasError } = useSelector(
    (state) => state.ingredients
  );
  const { ingredients, bun } = useSelector((state) => state.burgerConstructor);
  const dispatch = useDispatch();
  const { visible, type, data } = useSelector((state) => state.modal);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const handleOpenModal = (id, type) => {
    if (type === "ingredient") {
      const title = "Детали ингредиента";
      const [ingredientData] = allIngredients.filter((el) => el._id === id);
      dispatch(
        showIngredientModal({ type: type, title: title, data: ingredientData })
      );
    } else {
      const orderIngredients = ingredients.map((el) => el._id);
      if (bun._id) {
        orderIngredients.push(bun._id);
        orderIngredients.push(bun._id);
      }
      dispatch(fetchOrder(orderIngredients));
    }
  };

  const handleCloseModal = () => {
    dispatch(hideModal());
  };

  return (
    allIngredients && (
      <main className={styles.app}>
        <AppHeader />
        <Content handleModal={handleOpenModal} />
        {visible && data && (
          <Modal handleClose={handleCloseModal}>
            {type === "ingredient" ? <IngredientDetails /> : <OrderDetails />}
          </Modal>
        )}
      </main>
    )
  );
}

export default App;
