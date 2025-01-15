import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "../components/styles.css";
import InputFeild from "../components/InputFeild";
import TodoList from "../components/ToDoList";
import { Todo } from "../models";
import Counter from "../components/Counter";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../state/store";
import { loggedin } from "../state/counter/counterSlice";
const About = () => {
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

  

  return (
    <div className="home">
      
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
}

export default About
