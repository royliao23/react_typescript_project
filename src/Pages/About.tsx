import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import InputFeild from "../components/InputFeild";
import TodoList from "../components/ToDoList";
import { Todo } from "../models";
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
      <h1>Taskify</h1>
      <InputFeild todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList todos={todos} setTodos={setTodos} />

      
    </div>
  );
}

export default About
