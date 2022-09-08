import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/app";
import { Provider } from "react-redux";
import store from "./services/store";
import { BrowserRouter as Router } from "react-router-dom";
import { DevSupport } from "@react-buddy/ide-toolbox";
import { ComponentPreviews, useInitial } from "./dev";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <DevSupport
        ComponentPreviews={ComponentPreviews}
        useInitialHook={useInitial}
      >
        <App />
      </DevSupport>
    </Router>
  </Provider>,
  document.getElementById("root")
);
