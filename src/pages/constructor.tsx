import Spinner from "../components/spinner/spinner";
import Content from "../components/content/content";
import Modal from "../components/hocs/modal/modal";
import { IngredientDetails } from "../components/ingredient-details/ingredient-details";
import OrderConfirm from "../components/order-confirm/order-confirm";
import React from "react";
import { hideModal } from "../services/reducers/modal-slice";
import { resetIngredient } from "../services/reducers/ingredient-slice";
import { resetOrder } from "../services/reducers/order-slice";
import { useAppDispatch, useAppSelector } from "../services/hook";

function Constructor() {
  const dispatch = useAppDispatch();
  const { visible, type } = useAppSelector((state) => state.modal);
  const { pending } = useAppSelector((state) => state.order);
  const { ingredient } = useAppSelector((state) => state.ingredient);
  const { isLoading } = useAppSelector((state) => state.ingredients);

  const handleCloseModal = () => {
    dispatch(hideModal());
    dispatch(resetIngredient());
    dispatch(resetOrder());
  };

  return (
    <>
      {isLoading ? <Spinner /> : <Content />}
      {visible && (
        <Modal handleClose={handleCloseModal}>
          {type === "ingredient" ? (
            ingredient && <IngredientDetails modal={true} />
          ) : pending ? (
            <Spinner />
          ) : (
            <OrderConfirm />
          )}
        </Modal>
      )}
    </>
  );
}

export default Constructor;
