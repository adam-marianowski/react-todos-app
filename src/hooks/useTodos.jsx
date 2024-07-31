import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:4000/todos";

export const useTodos = () => {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    const res = await axios.get(API);
    // FIXME: tests are failing with sort.
    //const sortedData = res.data.sort((a, b) => a.complete - b.complete);
    setTodos(res.data);
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API}/${id}`);
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleTodo = async (todo) => {
    const update = { ...todo, complete: !todo.complete };
    const res = await axios.put(`${API}/${todo.id}`, update);
    setTodos((prev) => prev.map((t) => (t.id === todo.id ? res.data : t)));
  };

  const addTodo = async (todo) => {
    const res = await axios.post(API, todo);
    setTodos((prev) => [...prev, res.data]);
  };

  useEffect(() => {
    getTodos();
  }, []);

  if (process.env.NODE_ENV === "test") {
    return { todos, deleteTodo, addTodo, toggleTodo, getTodos };
  }
  return { todos, deleteTodo, addTodo, toggleTodo };
};

//export default useTodos;
