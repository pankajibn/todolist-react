import React, { useEffect, useState } from "react";
import "./todolist.css";
import CheckIcon from "../icons/CheckIcon";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";
import { storeDataLocal } from "../../utils/storage";
const TodoList = ({ tasks, setTasks, filter, setTask }) => {
  const [filteredTasks, setFilteredTasks] = useState();

  const handleClickAction = (id, action) => {
    switch (action) {
      case "markAsDone": {
        const filterdTasks = tasks.map((item) =>
          item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
        );
        setTasks(filterdTasks);
        storeDataLocal("localTasks", filterdTasks);

        break;
      }
      case "delete": {
        if (confirm(`Are you sure want to delete this task?`)) {
          const filterdTasks = tasks.filter((item) => item.id !== id);
          setTasks(filterdTasks);
          storeDataLocal("localTasks", filterdTasks);
        }
      }
      default:
        break;
    }
  };

  useEffect(() => {
    if (tasks?.length === 0) return;
    let results;
    console.log("filter", filter);
    switch (filter) {
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
  }, [filter, tasks]);

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
                <span onClick={() => handleClickAction(task?.id, "markAsDone")}>
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
                  onClick={() => handleClickAction(task?.id, "delete")}
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
