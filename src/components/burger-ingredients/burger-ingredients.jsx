import React, { useMemo } from "react";
import styles from "./burger-ingredients.module.css";
import Title from "../title/title";
import IngredientTabs from "../ingredient-tabs/ingredient-tabs";
import IngredientsSection from "../ingredients-section/ingredients-section";
import { ingredientPropType } from "../../utils/prop-types";

const BurgerIngredients = ({ data }) => {
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

  return (
    <section className={`${styles.burger_ingredients}`}>
      <Title>Соберите бургер</Title>
      <IngredientTabs active={"bun"} />
      <div className={`${styles.burger_ingredients_wrapper} mt-10`}>
        <IngredientsSection
          title={"Булки"}
          type={"bun"}
          data={bunIngredientsArray}
        />
        <IngredientsSection
          title={"Соусы"}
          type={"sauce"}
          data={sauceIngredientsArray}
        />
        <IngredientsSection
          title={"Начинки"}
          type={"main"}
          data={mainIngredientsArray}
        />
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = ingredientPropType;

export default BurgerIngredients;
