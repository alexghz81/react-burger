import React, { useEffect, useState } from "react";
import "./app.css";
import AppHeader from "../app-header/app-header";
import Content from "../content/content";
import getDataFromApi from "../../utils/get-data-from-api";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getDataFromApi();
      setData(res.data);
    };

    fetchData().catch((err) => console.log("Ошибка :" + err));
  }, []);

  return (
    data && (
      <main className="app">
        <AppHeader />
        <Content data={data} />
      </main>
    )
  );
}

export default App;
