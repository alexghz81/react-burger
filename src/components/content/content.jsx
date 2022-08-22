import React from "react";
import styles from "./content.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Content = ({ handleModal }) => {
  const { allIngredients } = useSelector((state) => state.ingredients);

  return (
    allIngredients && (
      <section className={styles.content}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor handleModal={handleModal} />
        </DndProvider>
      </section>
    )
  );
};

Content.propTypes = {
  handleModal: PropTypes.func.isRequired,
}.isRequired;

export default Content;
