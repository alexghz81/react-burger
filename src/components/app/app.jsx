import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import Content from "../content/content";
import Modal from "../modal/modal";
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

function App() {
  const { allIngredients, isLoading } = useSelector(
    (state) => state.ingredients
  );
  const { ingredients, bun } = useSelector((state) => state.burgerConstructor);
  const dispatch = useDispatch();
  const { visible, type } = useSelector((state) => state.modal);
  const { pending } = useSelector((state) => state.order);
  const { ingredient } = useSelector((state) => state.ingredient);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const handleOpenModal = (id, type) => {
    if (type === "ingredient") {
      const title = "Детали ингредиента";
      const [ingredientData] = allIngredients.filter((el) => el._id === id);
      dispatch(getIngredient(ingredientData));
      dispatch(showModal({ type: type, title: title }));
    } else {
      const orderIngredients = ingredients.map((el) => el._id);
      if (bun._id) {
        orderIngredients.push(bun._id);
        orderIngredients.push(bun._id);
      }
      dispatch(fetchOrder(orderIngredients));
      dispatch(showModal({ type: "order", title: "" }));
      dispatch(resetConstructor());
    }
  };

  const handleCloseModal = () => {
    dispatch(hideModal());
    dispatch(resetIngredient());
    dispatch(resetOrder());
  };

  return (
    <main className={styles.app}>
      <AppHeader />
      {isLoading ? <Spinner /> : <Content handleModal={handleOpenModal} />}
      {visible && (
        <Modal handleClose={handleCloseModal}>
          {type === "ingredient" ? (
            ingredient && <IngredientDetails />
          ) : pending ? (
            <Spinner />
          ) : (
            <OrderDetails />
          )}
        </Modal>
      )}
    </main>
  );
}

export default App;
