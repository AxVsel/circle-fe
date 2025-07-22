import React, { useEffect } from "react";
import App from "./App";
import "./index.css";

import { createRoot } from "react-dom/client";
import { Provider, useDispatch } from "react-redux";
import { store } from "./redux/GlobalStore";
import { login } from "./redux/slice/authSlice";

// Komponen pembungkus yang punya akses ke dispatch
function RootApp() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");
    if (token && userString) {
      const user = JSON.parse(userString);
      dispatch(login({ user, token }));
    }
  }, []);

  return <App />;
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RootApp />
    </Provider>
  </React.StrictMode>
);
