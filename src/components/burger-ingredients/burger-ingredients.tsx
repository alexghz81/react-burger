import React, { useEffect, useMemo, useRef } from "react";
import styles from "./burger-ingredients.module.css";
import Title from "../title/title";
import IngredientTabs from "../ingredient-tabs/ingredient-tabs";
import IngredientsSection from "../ingredients-section/ingredients-section";
import { useInView } from "react-intersection-observer";
import { setActiveTab } from "../../services/reducers/tab-slice";
import { useAppDispatch, useAppSelector } from "../../services/hook";
import { IIngredient } from "../../services/types/data";

const BurgerIngredients: React.FC = () => {
  const { allIngredients, hasError, errorMessage } = useAppSelector(
    (state) => state.ingredients
  );
  const { ingredients: constructorIngredients, bun } = useAppSelector(
    (state) => state.burgerConstructor
  );
  const container = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const [buns, inViewBuns] = useInView({
    threshold: 0.4,
  });
  const [sauces, inViewSauces] = useInView({
    threshold: 0.4,
  });
  const [mains, inViewMains] = useInView({
    threshold: 0.4,
  });

  useEffect(() => {
    if (inViewBuns) {
      dispatch(setActiveTab("buns"));
    } else if (inViewSauces) {
      dispatch(setActiveTab("sauces"));
    } else if (inViewMains) {
      dispatch(setActiveTab("mains"));
    }
  }, [inViewBuns, inViewSauces, inViewMains]);

  const mainIngredientsArray = useMemo(
    () => allIngredients.data.filter((el: IIngredient) => el.type === "main"),
    [allIngredients]
  );
  const bunIngredientsArray = useMemo(
    () => allIngredients.data.filter((el: IIngredient) => el.type === "bun"),
    [allIngredients]
  );
  const sauceIngredientsArray = useMemo(
    () => allIngredients.data.filter((el: IIngredient) => el.type === "sauce"),
    [allIngredients]
  );

  const handleScroll = (tab: string) => {
    const element = document.getElementById(tab);
    element && element.scrollIntoView({ behavior: "smooth" });
  };

  const numberOfIngredient = (id: string, type: string) => {
    let result = Object.values(constructorIngredients).filter(
      (el: IIngredient) => el._id === id
    ).length;
    if (bun && type === "bun") {
      result = bun._id === id ? 2 : 0;
    }
    return result;
  };

  return hasError ? (
    <div
      className={`${styles.error_message} text_type_main-default text_color_inactive`}
    >
      {errorMessage}
    </div>
  ) : (
    <section className={`${styles.burger_ingredients}`}>
      <Title>Соберите бургер</Title>
      <IngredientTabs scroll={handleScroll} />
      <div
        className={`${styles.burger_ingredients_wrapper} mt-10`}
        ref={container}
      >
        <div className="buns" ref={buns} id="buns">
          <IngredientsSection
            title={"Булки"}
            type={"bun"}
            data={bunIngredientsArray}
            numberOfIngredient={numberOfIngredient}
          />
        </div>
        <div className="sauces" ref={sauces} id="sauces">
          <IngredientsSection
            title={"Соусы"}
            type={"sauce"}
            data={sauceIngredientsArray}
            numberOfIngredient={numberOfIngredient}
          />
        </div>
        <div className="mains" ref={mains} id="mains">
          <IngredientsSection
            title={"Начинки"}
            type={"main"}
            data={mainIngredientsArray}
            numberOfIngredient={numberOfIngredient}
          />
        </div>
      </div>
    </section>
  );
};

export default BurgerIngredients;
