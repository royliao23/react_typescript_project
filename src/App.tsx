import React, { useState } from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import "./styles.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Authors from "./Pages/Author";
import Articles from "./Pages/Articles";
import Login from "./Pages/Login";
import Nav from "./components/Nav";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle successful login
  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // Update login state
  };

  return (
    <HashRouter>
      <MainApp isLoggedIn={isLoggedIn} onLoginSuccess={handleLoginSuccess} />
    </HashRouter>
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
        {isLoggedIn && <Route path="/articles" element={<Articles />} />}
        {isLoggedIn && <Route path="/authors" element={<Authors />} />}
        {/* Fallback route */}
        <Route path="*" element={<Login onLoginSuccess={onLoginSuccess} />} />
      </Routes>
    </>
  );
};

export default App;
