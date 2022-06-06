import React from "react";
import "./app.css";
import AppHeader from "../app-header/app-header";
import Content from "../content/content";
import data from "../../utils/data.json";

function App() {
  return (
    <main className="app">
      <AppHeader />
      <Content data={data} />
    </main>
  );
}

export default App;
