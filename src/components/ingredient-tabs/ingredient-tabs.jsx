import React, { useEffect, useState } from "react";
import styles from "../burger-ingredients/burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../../services/reducers/tab-slice";

const IngredientTabs = ({ scroll }) => {
  const dispatch = useDispatch();
  const { activeTab } = useSelector((state) => state.tab);

  useEffect(() => {
    scroll(activeTab);
  }, [activeTab]);

  return (
    <div className={styles.tabs}>
      <Tab
        value={"buns"}
        active={activeTab === "buns"}
        onClick={() => dispatch(setActiveTab("buns"))}
      >
        Булки
      </Tab>
      <Tab
        value={"sauces"}
        active={activeTab === "sauces"}
        onClick={() => dispatch(setActiveTab("sauces"))}
      >
        Соусы
      </Tab>
      <Tab
        value={"mains"}
        active={activeTab === "mains"}
        onClick={() => dispatch(setActiveTab("mains"))}
      >
        Начинки
      </Tab>
    </div>
  );
};

IngredientTabs.propTypes = {
  scroll: PropTypes.func.isRequired,
}.isRequired;

export default IngredientTabs;
