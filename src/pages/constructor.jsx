import Spinner from "../components/spinner/spinner";
import Content from "../components/content/content";
import Modal from "../components/hocs/modal/modal";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import OrderDetails from "../components/order-details/order-details";
import React, { useEffect } from "react";
import { hideModal, showModal } from "../services/reducers/modal-slice";
import {
  getIngredient,
  resetIngredient,
} from "../services/reducers/ingredient-slice";
import { fetchOrder, resetOrder } from "../services/reducers/order-slice";
import { useDispatch, useSelector } from "react-redux";
import { fetchIngredients } from "../services/reducers/ingredients-slice";
import { resetConstructor } from "../services/reducers/constructor-slice";

function Constructor() {
  const dispatch = useDispatch();
  const { visible, type } = useSelector((state) => state.modal);
  const { pending } = useSelector((state) => state.order);
  const { ingredient } = useSelector((state) => state.ingredient);
  const { allIngredients, isLoading } = useSelector(
    (state) => state.ingredients
  );
  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const handleOpenModal = (id, type) => {
    const title = "Детали ингредиента";
    const [ingredientData] = allIngredients.filter((el) => el._id === id);
    dispatch(getIngredient(ingredientData));
    dispatch(showModal({ type: type, title: title }));
    // } else {
    //  const orderIngredients = ingredients.map((el) => el._id);
    // if (bun._id) {
    //   orderIngredients.push(bun._id);
    //  orderIngredients.push(bun._id);
    // }
    //dispatch(fetchOrder(orderIngredients));
    //dispatch(showModal({type: "order", title: ""}));
    //dispatch(resetConstructor());
  };

  const handleCloseModal = () => {
    dispatch(hideModal());
    dispatch(resetIngredient());
    dispatch(resetOrder());
  };

  return (
    <>
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
    </>
  );
}

export default Constructor;