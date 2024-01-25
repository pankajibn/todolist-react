import { useEffect, useState } from "react";
import "./App.css";
import TodoForm from "./components/todoform/TodoForm";
import Tabs from "./components/tabs/Tabs";
import TodoList from "./components/todolist/TodoList";
import { getRecordsfromLocal, storeDataLocal } from "./utils/storage";
import { TasksProvider } from "./context/tasksContext";
import Alert from "./components/alert/Alert";

function App() {
  return (
    <TasksProvider>
      <div className="container">
        <div className="app_title">Todo App</div>
        <Alert />
        <TodoForm />
        <Tabs />
        <TodoList />
      </div>
    </TasksProvider>
  );
}

export default App;
