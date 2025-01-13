import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "./styles.css";
import InputFeild from "./InputFeild";
import TodoList from "./ToDoList";
import { Todo } from "../models";
import Counter from "./Counter";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../state/store";
import { loggedin } from "../state/counter/counterSlice";
import About from "./About"; // Example About component

const Home: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.counter.login_status);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login"); // Redirect to login if not logged in
    }
  }, [isLoggedIn, navigate]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };

  const handleLogout = () => {
    dispatch(loggedin(false)); // Update the Redux state
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="home">
      <nav>
        <ul className="menu">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <a href="#" onClick={handleLogout}>Log Out</a>
          </li>
        </ul>
      </nav>
      <Counter />
      <span className="heading">Taskify</span>
      <InputFeild todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList todos={todos} setTodos={setTodos} />

      {/* Make sure this Routes renders the correct component */}
      <Routes>
        <Route path="/about" element={<About />} />
        {/* You can add other routes here */}
      </Routes>
    </div>
  );
};

export default Home;
