import React, { useContext, useEffect } from "react";
import styles from "./content.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";
import { BurgerDemoDataContext } from "../../context/burger-demo-data-context";
import BurgerIngredientsContext from "../../context/burger-ingredients-context";

const Content = ({ handleModal }) => {
  const { demoData, setDemoData } = useContext(BurgerDemoDataContext);
  const data = useContext(BurgerIngredientsContext);
  const bunArray = data.filter((el) => el.type === "bun");
  const randomBun = bunArray[Math.floor(Math.random() * bunArray.length)];
  const ingredients = data.filter((el) => el.type !== "bun");
  const randomNumberOfIngredients = Math.floor(
    Math.random() * ingredients.length
  );
  let randomIngredientsArray = [];
  for (let i = 0; i < randomNumberOfIngredients; i++) {
    randomIngredientsArray.push(
      ingredients[Math.floor(Math.random() * ingredients.length)]
    );
  }

  randomIngredientsArray.push(randomBun);

  useEffect(() => {
    setDemoData(randomIngredientsArray);
  }, []);

  return (
    demoData && (
      <section className={styles.content}>
        <BurgerIngredients handleModal={handleModal} />
        <BurgerConstructor handleModal={handleModal} />
      </section>
    )
  );
};

Content.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType).isRequired,
  handleModal: PropTypes.func.isRequired,
}.isRequired;

export default Content;
