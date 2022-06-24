import React, { useContext, useEffect, useState } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import Content from "../content/content";
import getDataFromApi from "../../utils/get-data-from-api";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import BurgerIngredientsContext from "../../context/burger-ingredients-context";
import {
  BurgerConstructorContext,
  TotalPriceContext,
} from "../../context/burger-constructor-context";
import { BurgerDemoDataContext } from "../../context/burger-demo-data-context";

function App() {
  const [demoData, setDemoData] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [data, setData] = useState(null);
  const [burgerIngredientsData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({
    type: null,
    title: null,
    data: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDataFromApi();
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleOpenModal = (id, type) => {
    if (type === "ingredient") {
      const title = "Детали ингредиента";
      const [ingredientData] = data.filter((el) => el._id === id);
      setModalData({ type: type, title: title, data: ingredientData });
      setModalVisible(true);
    } else {
      setModalData({ type: "order", title: "", data: "" });
      setModalVisible(true);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    data && (
      <BurgerIngredientsContext.Provider value={data}>
        <BurgerConstructorContext.Provider value={burgerIngredientsData}>
          <TotalPriceContext.Provider value={{ totalPrice, setTotalPrice }}>
            <main className={styles.app}>
              <AppHeader />
              <BurgerDemoDataContext.Provider value={{ demoData, setDemoData }}>
                <Content handleModal={handleOpenModal} />
              </BurgerDemoDataContext.Provider>
              {modalVisible && (
                <Modal title={modalData.title} handleClose={handleCloseModal}>
                  {modalData.type === "ingredient" ? (
                    <IngredientDetails {...modalData.data} />
                  ) : (
                    <OrderDetails />
                  )}
                </Modal>
              )}
            </main>
          </TotalPriceContext.Provider>
        </BurgerConstructorContext.Provider>
      </BurgerIngredientsContext.Provider>
    )
  );
}

export default App;
