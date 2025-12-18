import { useState, useEffect } from "react";
import {BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./App.css";

import Home from "./pages/Home";
import Register from "./Register";
import Login from "./Login";
import Password from "./Password";
import Cart from "./Cart";
import Profile from './Profile'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <div className="app-wrapper d-flex justify-content-center align-items-start">
        <div className="page-container p-4">
          <Routes>
            <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />

            <Route
              path="/register"
              element={!isLoggedIn ? <Register /> : <Navigate to="/" />}
            />

            <Route
              path="/login"
              element={
                !isLoggedIn ? (
                  <Login setIsLoggedIn={setIsLoggedIn} />
                ) : (
                  <Navigate to="/" />
                  
                )
              }
            />

            <Route path="/password" element={<Password />} />
            <Route path='/profile' element={<Profile />} />
            {/* 🔒 VÉDETT KOSÁR ROUTE */}
            <Route
              path="/cart"
              element={
                isLoggedIn ? <Cart /> : <Navigate to="/login" />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-success custom-navbar shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-white" to="/">
          Hajas Máté
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">
                🏠 Kezdőlap
              </Link>
            </li>

            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/register">
                    📝 Regisztráció
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/login">
                    🔑 Bejelentkezés
                  </Link>
                </li>
              </>
            ) : (
              <>
                {/* ✅ KOSÁR CSAK BEJELENTKEZVE */}
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/cart">
                    🛒 Kosár
                  </Link>
                </li>


                <li className="nav-item">
                  <button
                    type="button"
                    className="btn btn-outline-light ms-2"
                    onClick={handleLogOut}
                  >
                    🚪 Kijelentkezés
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
