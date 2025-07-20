import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bar from "./pages/Routes";
import Login from "./pages/auth/AuthLogin";
import Register from "./pages/auth/AuthRegister";
import ForgotPassword from "./pages/auth/AuthForgotPassword";
import PrivateRoute from "./pages/private/PrivateRoute";

import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./redux/authStore";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {/* Toaster di luar Routes */}
        <Toaster position="top-center" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/*" element={<Bar />} />

          {/* <Route
            path="/*"
            element={
              <PrivateRoute>
                <Bar />
              </PrivateRoute>
            }
          /> */}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
