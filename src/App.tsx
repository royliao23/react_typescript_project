import "./App.css";
import Home from "./components/Home";
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from './state/store'
import axios from 'axios';
import Login from './components/Login';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [content, setContent] = useState([ { 'Item':'item1','Unit_Value':4, 'Quantity':5, 'Total':20}, { 'Item':'item2','Unit_Value':9, 'Quantity':7, 'Total':63}]);
  const [title, setTitle] = useState('About Myself');
  const [awb, setAwb] = useState("You are here");
  const [color, setColor] = useState('green');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const username = localStorage.getItem('username');

    if (token) {
        setIsLoggedIn(true);
    }
    if (username) {
        setUsername(username);
    }
}, []);
  // Callback function to handle successful login

const loggedin_status = useSelector((state:RootState) => state.counter.login_status);
const handleLoginSuccess = (user:any) => {
  // setIsLoggedIn(false);
  // setUsername(user);

};
const [selectedContent, setSelectedContent] = useState("home");
const showme = () => { console.log("from about me")}



return (
  <div className="App">
      {loggedin_status ? (
       
          <Home />
          
      ) : (
          <Login onLoginSuccess={handleLoginSuccess} />
      )}
  </div>
);
}

export default App;
