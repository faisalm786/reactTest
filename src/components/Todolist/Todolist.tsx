import React, { useEffect, useState } from "react";
import Listdata from "../Listdata/Listdata";
import { addTodo, getTodos } from "../../utils/todos_api";
import { FaInbox } from "react-icons/fa";

const Todolist = () => {
  const [task, setTask] = useState<any>("");
  const [todos, setTodos] = useState<any>([]);
  const [error, setError] = useState<any>([]);

  const handleSubmit = async () => {
    if (!task.length){
      setError(' Please enter valid input !!'); return
    }
    try {
      await addTodo(task);
      setTask(""); // Clear the input field after adding todo
      fetchTodos();
    } catch (error) {
      console.error("Error handling submit:", error);
    }
  };

  const fetchTodos = async () => {
    try {
      const response = await getTodos();
      const todosData = response?.todos;  
      if (todosData) setTodos(todosData);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <div className="list">
        <h1 className="text-list">Todolist</h1>
        <div className="list-main">
          <div className="list-data">
          <input
            type="text"
            className= {error.length ? "list-input error-valid" :"list-input"}
            value={task}
            onChange={(e) => {
              setTask(e.target.value)
              setError("")
              }
            }
          />
          {error.length ? <p className="error-data">{error}</p> : "" }
          </div>
          <button
            type="submit"
            className={task.length ? "bnt-add-clr" : "bnt-add"}
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
        {todos.length ? (
          todos.map((item: any, index: any) => (
            <div key={item.id}>
              <Listdata item={item} fetchTodos={fetchTodos} />
            </div>
          ))
        ) : (
          <div className="no-data">
            <button className="bnt-inbox"><FaInbox /></button>
            <h5 className="text-nofound">No list found</h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default Todolist;