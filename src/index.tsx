import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ReduxProvider from "./components/providers/ReduxProviders";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import { store } from "./redux/store";
import DesignerContextProvider from "./components/context/DesignerContext";

let persistor = persistStore(store);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ReduxProvider>
      <PersistGate persistor={persistor}>
        <DesignerContextProvider>
          <App />
        </DesignerContextProvider>
      </PersistGate>
    </ReduxProvider>
  </React.StrictMode>
);
