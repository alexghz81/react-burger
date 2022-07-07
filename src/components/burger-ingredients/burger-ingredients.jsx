import React, { useMemo, useRef, useContext } from "react";
import styles from "./burger-ingredients.module.css";
import Title from "../title/title";
import IngredientTabs from "../ingredient-tabs/ingredient-tabs";
import IngredientsSection from "../ingredients-section/ingredients-section";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";
import { BurgerIngredientsContext } from "../../services/burger-ingredients-context";
import { useSelector } from "react-redux";

const BurgerIngredients = ({ handleModal }) => {
  const { allIngredients } = useSelector((state) => state.ingredients);
  const { ingredients: constructorIngredients, bun } = useSelector(
    (state) => state.burgerConstructor
  );
  console.log(constructorIngredients);
  const buns = useRef(null);
  const sauces = useRef(null);
  const mains = useRef(null);

  const mainIngredientsArray = useMemo(
    () => allIngredients.filter((el) => el.type === "main"),
    [allIngredients]
  );
  const bunIngredientsArray = useMemo(
    () => allIngredients.filter((el) => el.type === "bun"),
    [allIngredients]
  );
  const sauceIngredientsArray = useMemo(
    () => allIngredients.filter((el) => el.type === "sauce"),
    [allIngredients]
  );

  const handleScroll = (tab) => {
    switch (tab) {
      case "bun": {
        buns.current.scrollIntoView();
        break;
      }
      case "sauce": {
        sauces.current.scrollIntoView();
        break;
      }
      case "main": {
        mains.current.scrollIntoView();
        break;
      }
    }
  };

  const numberOfIngredient = (id, type) => {
    let result = Object.values(constructorIngredients).filter(
      (el) => el._id === id
    ).length;
    if (type === "bun") {
      result = bun._id === id ? 2 : 0;
    }
    return result;
  };

  return (
    <section className={`${styles.burger_ingredients}`}>
      <Title>Соберите бургер</Title>
      <IngredientTabs active={"bun"} scroll={handleScroll} />
      <div className={`${styles.burger_ingredients_wrapper} mt-10`}>
        <div className="buns" ref={buns}>
          <IngredientsSection
            title={"Булки"}
            type={"bun"}
            data={bunIngredientsArray}
            handleModal={handleModal}
            numberOfIngredient={numberOfIngredient}
          />
        </div>
        <div className="sauces" ref={sauces}>
          <IngredientsSection
            title={"Соусы"}
            type={"sauce"}
            data={sauceIngredientsArray}
            handleModal={handleModal}
            numberOfIngredient={numberOfIngredient}
          />
        </div>
        <div className="mains" ref={mains}>
          <IngredientsSection
            title={"Начинки"}
            type={"main"}
            data={mainIngredientsArray}
            handleModal={handleModal}
            numberOfIngredient={numberOfIngredient}
          />
        </div>
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  handleModal: PropTypes.func.isRequired,
}.isRequired;

export default BurgerIngredients;
