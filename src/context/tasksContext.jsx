import { createContext, useContext, useReducer, useState } from "react";
import taskReducer from "../utils/tasksReducer";
import { getRecordsfromLocal } from "../utils/storage";

export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);

//const initialTasks = [];
const initialTasks = getRecordsfromLocal() || [];
export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);

  const [selectedTab, setSelectedTab] = useState("All");
  const [task, setTask] = useState(null);
  const [message, setMessage] = useState("");
  const contextObj = {
    tasks,
    selectedTab,
    setSelectedTab,
    task,
    setTask,
    message,
    setMessage,
  };
  return (
    <TasksContext.Provider value={contextObj}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

export function useTasks() {
  return useContext(TasksContext);
}

export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}
