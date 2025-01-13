import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import InputFeild from "./InputFeild";
import TodoList from "./ToDoList";
import { Todo } from "../models";
import Counter from "./Counter";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../state/store";
import { loggedin } from "../state/counter/counterSlice";

const Home: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.counter.login_status); // Check if logged in
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login"); // Redirect to login page if not logged in
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
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
          <li>
            <a href="#" onClick={handleLogout}>
              Log Out
            </a>
          </li>
        </ul>
      </nav>
      <Counter />
      <span className="heading">Taskify</span>
      <InputFeild todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default Home;
