import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "../../pages/home/Home.jsx";
import Login from "../../pages/login/Login.jsx";
import Signup from "../../pages/signup/Signup.jsx";
import Navbar from "../navbar/Navbar.jsx";
import { useAuthContext } from "../../hooks/useAuth.js";
import { AnimatePresence } from "framer-motion";

function App() {
  const { authIsReady, user } = useAuthContext();
  const location = useLocation();
  return (
    <div className="App">
      {authIsReady && (
        <>
          <Navbar />

          <AnimatePresence>
            <Routes key={location.pathname} location={location}>
              <Route
                index
                element={user ? <Home /> : <Navigate to="/login" replace />}
              />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" replace />}
              />
              <Route
                path="/signup"
                element={!user ? <Signup /> : <Navigate to="/" replace />}
              />
            </Routes>
          </AnimatePresence>
        </>
      )}
    </div>
  );
}

export default App;
