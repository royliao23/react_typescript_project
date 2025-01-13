import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Nav from "./components/Nav";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle successful login
  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // Update login state
  };

  return (
    <Router>
      <MainApp isLoggedIn={isLoggedIn} onLoginSuccess={handleLoginSuccess} />
    </Router>
  );
};

interface MainAppProps {
  isLoggedIn: boolean;
  onLoginSuccess: () => void;
}

const MainApp: React.FC<MainAppProps> = ({ isLoggedIn, onLoginSuccess }) => {
  const { pathname } = useLocation(); // Move useLocation to this component

  return (
    <>
      {/* Conditionally render Nav if the current path is not "/login" */}
      {pathname !== "/login" && <Nav />}
      <Routes>
        <Route path="/login" element={<Login onLoginSuccess={onLoginSuccess} />} />
        {isLoggedIn && <Route path="/home" element={<Home />} />}
        {isLoggedIn && <Route path="/about" element={<About />} />}
        {isLoggedIn && <Route path="/contact" element={<Contact />} />}
        {/* Fallback route */}
        <Route path="*" element={<Login onLoginSuccess={onLoginSuccess} />} />
      </Routes>
    </>
  );
};

export default App;
