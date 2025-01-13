import React, { useState } from "react";
import "./styles.css";
import InputFeild from "./InputFeild";
import TodoList from "./ToDoList";
import { Todo } from "../models";
import Counter from "./Counter";
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../state/store'
import { loggedin } from '../state/counter/counterSlice';
const Home: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };

  const handleLogout = () => {
      localStorage.removeItem('authToken');
      localStorage.removeItem('username');
  };

  return (
    <div className="home">
      <ul>
                <li><a href="#" >Maecenas dignissim fermentum luctus</a></li>
                <li><a href="#" onClick={() => { handleLogout()}}>Log Out</a></li>
      </ul>
      <Counter />
      <span className="heading">Taskify</span>
      <InputFeild todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default Home;