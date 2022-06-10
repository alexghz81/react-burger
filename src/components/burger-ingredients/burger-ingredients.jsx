import React, { useMemo, useRef } from "react";
import styles from "./burger-ingredients.module.css";
import Title from "../title/title";
import IngredientTabs from "../ingredient-tabs/ingredient-tabs";
import IngredientsSection from "../ingredients-section/ingredients-section";
import { ingredientPropType } from "../../utils/prop-types";

const BurgerIngredients = ({ data, handleModal }) => {
  const buns = useRef(null);
  const sauces = useRef(null);
  const mains = useRef(null);

  const mainIngredientsArray = useMemo(
    () => data.filter((el) => el.type === "main"),
    [data]
  );
  const bunIngredientsArray = useMemo(
    () => data.filter((el) => el.type === "bun"),
    [data]
  );
  const sauceIngredientsArray = useMemo(
    () => data.filter((el) => el.type === "sauce"),
    [data]
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
          />
        </div>
        <div className="sauces" ref={sauces}>
          <IngredientsSection
            title={"Соусы"}
            type={"sauce"}
            data={sauceIngredientsArray}
            handleModal={handleModal}
          />
        </div>
        <div className="mains" ref={mains}>
          <IngredientsSection
            title={"Начинки"}
            type={"main"}
            data={mainIngredientsArray}
            handleModal={handleModal}
          />
        </div>
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = ingredientPropType;

export default BurgerIngredients;
