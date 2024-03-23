// import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App.tsx";
import "./index.css";
import {store, persistor} from "./redux/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
    {/* </React.StrictMode> */}
  </Provider>
);
