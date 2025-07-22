import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bar from "./pages/Routes";
import Login from "./pages/auth/AuthLogin";
import Register from "./pages/auth/AuthRegister";
import ForgotPassword from "./pages/auth/AuthForgotPassword";
import PrivateRoute from "./pages/private/PrivateRoute";
import PublicRoute from "./pages/private/PublicRoute";

import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <BrowserRouter>
      {/* Toaster di luar Routes */}
      <Toaster position="top-center" />
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <Bar />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
