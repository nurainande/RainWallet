// import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./stylesheets/text-elements.css";
import "./stylesheets/form-elements.css";
import "./stylesheets/custom-components.css";
import "./stylesheets/alignments.css";
import "./stylesheets/theme.css";
import "./stylesheets/layout.css";
import Home from "./pages/Home";
import Register from "./pages";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Transactions from "./pages/Transactions";
import Request from "./pages/Request/index.jsx";
import Users from "./pages/Users/index.jsx";
// import Login from "./pages/Login";




function App() {
  const backend = import.meta.env.VITE_BACKEND_URL;
  console.log(backend);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <Transactions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/requests"
          element={
            <ProtectedRoute>
              <Request />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
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
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;