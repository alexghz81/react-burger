import React, { useEffect, useMemo, useRef } from "react";
import styles from "./burger-ingredients.module.css";
import Title from "../title/title";
import IngredientTabs from "../ingredient-tabs/ingredient-tabs";
import IngredientsSection from "../ingredients-section/ingredients-section";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import { setActiveTab } from "../../services/reducers/tab-slice";

const BurgerIngredients = ({ handleModal }) => {
  const { allIngredients, hasError, errorMessage } = useSelector(
    (state) => state.ingredients
  );
  const { ingredients: constructorIngredients, bun } = useSelector(
    (state) => state.burgerConstructor
  );
  const container = useRef();
  const dispatch = useDispatch();
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
    const element = document.getElementById(tab);
    element && element.scrollIntoView({ behavior: "smooth" });
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

  return hasError ? (
    <div
      className={`${styles.error_message} text_type_main-default text_color_inactive`}
    >
      {errorMessage}
    </div>
  ) : (
    <section className={`${styles.burger_ingredients}`}>
      <Title>???????????????? ????????????</Title>
      <IngredientTabs scroll={handleScroll} />
      <div
        className={`${styles.burger_ingredients_wrapper} mt-10`}
        ref={container}
      >
        <div className="buns" ref={buns} id="buns">
          <IngredientsSection
            title={"??????????"}
            type={"bun"}
            data={bunIngredientsArray}
            handleModal={handleModal}
            numberOfIngredient={numberOfIngredient}
          />
        </div>
        <div className="sauces" ref={sauces} id="sauces">
          <IngredientsSection
            title={"??????????"}
            type={"sauce"}
            data={sauceIngredientsArray}
            handleModal={handleModal}
            numberOfIngredient={numberOfIngredient}
          />
        </div>
        <div className="mains" ref={mains} id="mains">
          <IngredientsSection
            title={"??????????????"}
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
