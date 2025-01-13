import "./App.css";
import Home from "./components/Home";
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from './state/store'
import { loggedin } from './state/counter/counterSlice';
import axios from 'axios';
import Login from './components/Login';
// import MainComp from './components/MainComp/MainComp';
// import AboutComp from './components/AboutComp/AboutComp';
// import ContentComp from './components/ContentComp/ContentComp';
// import ContactJavaComp from './components/ContactJavaComp/ContactJavaComp';
// import CategoryJobComp from './components/CategoryJobComp/CategoryJobComp';


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
const handleLoginSuccess = (user:any) => {
    setIsLoggedIn(false);
    setUsername(user);
};




const [selectedContent, setSelectedContent] = useState("home");
const showme = () => { console.log("from about me")}
// const renderContent = () => {
//     console.log(selectedContent)
//     switch (selectedContent) {
//         case "about":
//             return < AboutComp person={username} logme={ showme} content={content} title={title} awb={awb} color={color} />;
//         case "Category & Job":
//             return < CategoryJobComp />;
//         case "clients":
//             return < ContentComp />;
//         case "contact":
//             return < ContactJavaComp />;
//         case "support":
//             return <p>This is the Support page content.</p>;
//         default:
//             return <p>Welcome to the homepage!</p>;
//     }
// };


return (
  <div className="App">
      {isLoggedIn ? (
          // <>
          // <MainComp username={username} onSelectMenuItem={setSelectedContent} onLogout={handleLogout} />
          // <div className="content-area">
          //   {renderContent()}
          // </div>
          // </>
          <Home />
          
      ) : (
          <Login onLoginSuccess={handleLoginSuccess} />
      )}
  </div>
);
}

export default App;
