import React, { useContext, useEffect, useMemo, useState } from "react";
import "./todolist.css";
import CheckIcon from "../icons/CheckIcon";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";
import { storeDataLocal } from "../../utils/storage";
import { useTasks, useTasksDispatch } from "../../context/tasksContext";
const TodoList = () => {
  const [filteredTasks, setFilteredTasks] = useState();
  const { tasks, selectedTab, setTask, setMessage } = useTasks();
  const dispatch = useTasksDispatch();

  const handleClickAction = (item, action) => {
    switch (action) {
      case "markAsDone": {
        dispatch({
          ...item,
          isCompleted: !item.isCompleted,
          type: "changed",
        });
        break;
      }
      case "delete": {
        if (confirm(`Are you sure want to delete this task?`)) {
          dispatch({ id: item.id, type: "deleted" });
          setMessage(`Task has been deleted successfully!`);
        }
      }
      default:
        break;
    }
  };

  useMemo(() => {
    let results;
    switch (selectedTab) {
      case "Active": {
        results = tasks.filter((item) => !item?.isCompleted);
        break;
      }
      case "Completed": {
        results = tasks.filter((item) => item?.isCompleted);
        break;
      }
      default:
        results = tasks;
        break;
    }
    setFilteredTasks(results);
  }, [selectedTab, tasks]);

  return (
    <div className="list_container">
      <ul className="list_items">
        {(!filteredTasks || filteredTasks?.length === 0) && (
          <li className="list_item">No task available.</li>
        )}
        {filteredTasks &&
          filteredTasks?.length > 0 &&
          filteredTasks?.map((task) => (
            <li className="list_item" key={`item_${task?.id}`}>
              <div className="list_title">
                <span onClick={() => handleClickAction(task, "markAsDone")}>
                  <CheckIcon checked={task?.isCompleted} />
                </span>
                {task?.title}
              </div>
              <div className="item_actions">
                <span title="Edit" onClick={() => setTask(task)}>
                  <EditIcon />
                </span>
                <span
                  title="Delete"
                  onClick={() => handleClickAction(task, "delete")}
                >
                  <DeleteIcon />
                </span>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TodoList;
