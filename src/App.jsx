import { useEffect, useState } from "react";
import "./App.css";
import TodoForm from "./components/todoform/TodoForm";
import Tabs from "./components/tabs/Tabs";
import TodoList from "./components/todolist/TodoList";
import { getRecordsfromLocal, storeDataLocal } from "./utils/storage";

function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedTab, setSelectedTab] = useState("All");
  const [task, setTask] = useState();
  const [message, setMessage] = useState();

  const hanledeAddTask = (taskTitle, id = "") => {
    const taskId =
      tasks && tasks.length > 0
        ? Math.max(...tasks?.map((item) => item.id)) + 1
        : 1;

    let availableTasks;
    let alertMessage = ``;
    if (id != "") {
      availableTasks = tasks.map((item) =>
        item.id === id ? { ...item, title: taskTitle } : item
      );
      alertMessage = `Task has been updated successfully!`;
    } else {
      const newTask = { id: taskId, title: taskTitle, isCompleted: false };
      availableTasks = [...tasks, newTask];
      alertMessage = `Task has been added successfully!`;
    }
    setTasks(availableTasks);
    storeDataLocal("localTasks", availableTasks);
    setTask();
    setMessage(alertMessage);
    setTimeout(() => {
      setMessage();
    }, 5000);
  };

  useEffect(() => {
    const records = getRecordsfromLocal("localTasks");
    if (records) {
      setTasks(records);
    }
  }, []);

  return (
    <div className="container">
      <div className="app_title">Todo App</div>
      {message && <div className="alert success">{message}</div>}
      <TodoForm hanledeAddTask={hanledeAddTask} task={task} />
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <TodoList
        tasks={tasks}
        setTasks={setTasks}
        filter={selectedTab}
        setTask={setTask}
      />
    </div>
  );
}

export default App;
