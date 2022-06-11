import React, { useEffect, useState } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import Content from "../content/content";
import getDataFromApi from "../../utils/get-data-from-api";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";

function App() {
  const [data, setData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({
    type: null,
    title: null,
    data: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await getDataFromApi();
      setData(res.data);
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
      <main className={styles.app}>
        <AppHeader />
        <Content data={data} handleModal={handleOpenModal} />
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
    )
  );
}

export default App;
