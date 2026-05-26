import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login
from "../components/Login";

import Dashboard
from "../pages/Dashboard";

import ProtectedRoute
from "../components/ProtectedRoute";

export default function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}